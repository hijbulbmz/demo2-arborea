import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export function OfferBanner() {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-moss px-5 py-6 text-white shadow-soft sm:px-8 lg:flex lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose">Weekend ritual</p>
        <h2 className="mt-2 max-w-xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          Build a complete personal care routine and save 25%.
        </h2>
      </div>
      <Button variant="secondary" icon={ArrowRight} className="mt-6 bg-white lg:mt-0">
        Shop bundles
      </Button>
    </section>
  )
}
