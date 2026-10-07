export function parseContactCsv(text: string) {
  const rows: string[][] = []
  let row: string[] = [],
    field = '',
    quoted = false,
    closedQuote = false
  const finishField = () => {
    row.push(field.trim())
    field = ''
    closedQuote = false
  }
  const finishRow = () => {
    finishField()
    if (row.some(Boolean)) rows.push(row)
    row = []
    if (rows.length > 501)
      throw new Error('Import at most 500 contacts at a time.')
  }
  text = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"'
          index++
        } else {
          quoted = false
          closedQuote = true
        }
      } else field += char
    } else if (char === ',') finishField()
    else if (char === '\r' || char === '\n') {
      if (char === '\r' && text[index + 1] === '\n') index++
      finishRow()
    } else if (char === '"') {
      if (field.trim() || closedQuote) throw new Error('Invalid CSV quotation.')
      field = ''
      quoted = true
    } else {
      if (closedQuote && char.trim())
        throw new Error('Invalid text after a quoted CSV field.')
      field += char
    }
  }
  if (quoted) throw new Error('CSV has an unterminated quoted field.')
  finishRow()
  if (!rows.length) throw new Error('CSV must have name and email columns.')
  const headers = rows.shift()!.map((header) => header.toLowerCase())
  const find = (names: string[]) =>
    headers.findIndex((header) => names.includes(header))
  const nameIndex = find(['name', 'full name', 'fullname'])
  const emailIndex = find(['email', 'email address'])
  const phoneIndex = find(['phone', 'phone number', 'tel'])
  const messageIndex = find(['message', 'note', 'notes'])
  if (nameIndex < 0 || emailIndex < 0)
    throw new Error('CSV must have name and email columns.')
  return rows.map((values, index) => {
    if (
      values.length !== headers.length ||
      !values[nameIndex] ||
      !values[emailIndex]
    )
      throw new Error(
        `CSV record ${index + 2} must contain all columns, a name, and an email.`,
      )
    return {
      name: values[nameIndex],
      email: values[emailIndex],
      phone: phoneIndex >= 0 ? values[phoneIndex] : undefined,
      message: messageIndex >= 0 ? values[messageIndex] : undefined,
    }
  })
}
