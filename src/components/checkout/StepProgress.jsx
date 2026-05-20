import { Check } from 'lucide-react'

const steps = ['Address', 'Payment', 'Confirm']

export function StepProgress({ active = 1 }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-3 shadow-soft">
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step, index) => {
          const done = index < active
          const current = index === active
          return (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${
                  done ? 'bg-moss text-white' : current ? 'bg-turmeric text-white' : 'bg-cream text-stone-500'
                }`}
              >
                {done ? <Check size={16} /> : index + 1}
              </span>
              <span className="hidden text-sm font-extrabold text-ink sm:block">{step}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
