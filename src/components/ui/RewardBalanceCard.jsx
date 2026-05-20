import { Wallet } from 'lucide-react'
import { Card } from './Card'

export function RewardBalanceCard({ balance, onSimulate }) {
  return (
    <Card hover={false} className="border-stone-100 bg-[#fbfaf7] dark:bg-stone-900/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-moss/10 text-moss dark:bg-moss/20">
            <Wallet size={18} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Reward Balance
            </p>
            <h3 className="mt-1 font-display text-2xl font-black text-ink dark:text-white">
              ₹{balance}
            </h3>
          </div>
        </div>
        {onSimulate && (
          <button
            onClick={onSimulate}
            className="flex items-center gap-1 rounded-full bg-white dark:bg-stone-800 px-3 py-1.5 text-[10px] font-extrabold text-moss border border-stone-100 dark:border-stone-700 hover:bg-cream dark:hover:bg-stone-750 transition active:scale-95 shadow-sm"
          >
            +₹50 demo
          </button>
        )}
      </div>
      
      <div className="mt-4 border-t border-stone-200/60 dark:border-stone-850 pt-3">
        <p className="text-xs font-semibold leading-relaxed text-stone-600 dark:text-stone-400">
          🇮🇳 Use your rewards on your next purchase at checkout. No minimum order value.
        </p>
      </div>
    </Card>
  )
}
