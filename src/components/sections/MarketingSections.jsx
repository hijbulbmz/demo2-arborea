import { featureFlags } from '../../constants/featureFlags'

/** Preserved for client demos — hidden via featureFlags.arboreaShowcase */
export function ArboreaShowcase() {
  if (!featureFlags.arboreaShowcase) return null

  return (
    <section className="rounded-brand bg-white p-6 ring-1 ring-stone-100">
      <p className="text-xs font-extrabold uppercase tracking-wide text-clay">Arborea Showcase</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-ink">Brand story & ritual gallery</h2>
      <p className="mt-2 text-sm text-stone-600">Curated lookbook and ingredient stories for campaigns.</p>
    </section>
  )
}

/** Preserved for client demos — hidden via featureFlags.interactionHighlights */
export function InteractionHighlights() {
  if (!featureFlags.interactionHighlights) return null

  return (
    <section className="rounded-brand bg-cream p-6 ring-1 ring-stone-100">
      <p className="text-xs font-extrabold uppercase tracking-wide text-clay">Interaction Highlights</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-ink">Recent engagement</h2>
      <p className="mt-2 text-sm text-stone-600">Wishlist taps, repeat buys, and routine reminders.</p>
    </section>
  )
}
