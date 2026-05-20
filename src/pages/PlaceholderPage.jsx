import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Skeleton } from '../components/ui/Skeleton'

export function PlaceholderPage({ title, eyebrow = 'Foundation route', description }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">{eyebrow}</p>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink lg:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          {description ?? 'Production-ready placeholder surface for the next ecommerce workflow.'}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5" hover={false}>
          <Skeleton className="h-36" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
        <Card className="p-5" hover={false}>
          <Skeleton className="h-36" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
        <Card className="p-5" hover={false}>
          <Skeleton className="h-36" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
