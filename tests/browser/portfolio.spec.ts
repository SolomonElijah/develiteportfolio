import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('public pages are accessible and have unique canonical metadata', async ({
  page,
}) => {
  for (const path of ['/', '/about', '/projects', '/blog', '/contact']) {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://solomonelijah.online${path === '/' ? '/' : path}`,
    )
    expect(errors).toEqual([])
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([])
  }
})
test('projects are readable without JavaScript and detail routes resolve', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://localhost:3100/projects')
  expect(await page.locator('.project-card').count()).toBeGreaterThan(0)
  await page.locator('.project-card h3 a').first().click()
  await expect(page.getByRole('heading', { name: 'The problem' })).toBeVisible()
  await context.close()
})
test('mobile navigation, project filters, and dark theme work', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(
    page.getByRole('button', { name: 'Open navigation' }),
  ).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('button', { name: 'Mobile apps', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
  await page.getByRole('button', { name: 'APIs', exact: true }).click()
  await expect(page.locator('.empty-state')).toBeVisible()
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze())
      .violations,
  ).toEqual([])
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
})
test('contact success and failure feedback is accurate', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Your name').fill('Portfolio test')
  await page
    .getByLabel('Email address', { exact: true })
    .fill('test@example.com')
  await page
    .getByLabel('What would you like to discuss?')
    .selectOption('Job opportunity')
  await page
    .getByLabel('Your message')
    .fill('This is a browser test of the contact form feedback.')
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 503,
      json: { error: 'Your message could not be saved.' },
    }),
  )
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('could not be saved')
  await expect(page.getByLabel('Your name')).toHaveValue('Portfolio test')
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 201, json: { success: true } }),
  )
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('status')).toContainText(
    'your message has been saved',
  )
  await expect(page.getByLabel('Your name')).toHaveValue('')
})
test('admin and email endpoints reject unauthenticated requests', async ({
  request,
}) => {
  expect(
    (
      await request.post('/api/reply', {
        data: { to: 'test@example.com', subject: 'test', message: 'test' },
      })
    ).status(),
  ).toBe(401)
  expect((await request.post('/api/upload')).status()).toBe(401)
  const response = await request.get('/admin/dashboard', { maxRedirects: 0 })
  expect(response.status()).toBe(307)
  expect(response.headers()['location']).toContain('/admin/login')
  expect((await request.post('/api/contact', { data: {} })).status()).toBe(403)
  expect(
    (
      await request.post('/api/contact', {
        headers: { Origin: 'http://localhost:3100' },
        data: {
          name: 'Test',
          email: 'bad',
          subject: 'Test',
          message: 'A long enough test message.',
        },
      })
    ).status(),
  ).toBe(400)
})
test('SEO discovery and machine-readable data resolve', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('Disallow: /admin/')
  const sitemap = await request.get('/sitemap.xml')
  expect(await sitemap.text()).toContain('/projects/')
  expect(await (await request.get('/llms.txt')).text()).toContain(
    'Solomon Elijah',
  )
  expect(
    (await (await request.get('/profile.json')).json()).projects.length,
  ).toBeGreaterThan(0)
  expect((await request.get('/opengraph-image')).status()).toBe(200)
  expect((await request.get('/this-page-does-not-exist')).status()).toBe(404)
})
