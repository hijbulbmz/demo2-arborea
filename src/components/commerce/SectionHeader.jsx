export function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">{eyebrow}</p> : null}
        <h2 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
