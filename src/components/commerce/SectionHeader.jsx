export function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ? <p className="text-[10px] font-bold uppercase tracking-wide text-clay">{eyebrow}</p> : null}
        <h2 className={`font-extrabold text-ink ${eyebrow ? 'mt-0.5 text-lg' : 'text-lg sm:text-xl'}`}>{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
