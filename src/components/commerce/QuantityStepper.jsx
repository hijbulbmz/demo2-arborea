import { Minus, Plus } from 'lucide-react'

export function QuantityStepper({ quantity, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-stone-200 bg-white p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        className="grid h-7 w-7 place-items-center rounded-full bg-cream text-ink"
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <span className="w-8 text-center text-sm font-extrabold">{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="grid h-7 w-7 place-items-center rounded-full bg-moss text-white"
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  )
}
