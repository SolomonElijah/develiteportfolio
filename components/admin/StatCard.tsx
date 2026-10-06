import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string
      titleId?: string
    } & RefAttributes<SVGSVGElement>
  >
  color: 'blue' | 'purple' | 'green' | 'orange' | 'emerald' | 'red' | 'teal'
  subtitle?: string
}

const colorStyles = {
  blue: {
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glow: 'from-blue-600/10 to-transparent',
  },
  purple: {
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    glow: 'from-purple-600/10 to-transparent',
  },
  green: {
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glow: 'from-emerald-600/10 to-transparent',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glow: 'from-emerald-600/10 to-transparent',
  },
  orange: {
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    glow: 'from-amber-600/10 to-transparent',
  },
  red: {
    iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    glow: 'from-rose-600/10 to-transparent',
  },
  teal: {
    iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    glow: 'from-teal-600/10 to-transparent',
  },
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatCardProps) {
  const style = colorStyles[color] || colorStyles.blue

  return (
    <div className="relative group overflow-hidden bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 shadow-sm">
      <div
        className={cn(
          'absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl rounded-bl-full pointer-events-none opacity-50 transition-opacity group-hover:opacity-100',
          style.glow,
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white pt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            'p-3 rounded-xl border flex items-center justify-center shrink-0 shadow-inner',
            style.iconBg,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
