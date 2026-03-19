// ─── SectionCard — reusable dark premium card ─────────────────────────────────

export default function SectionCard({ title, children, glow, className = '' }) {
  return (
    <section
      className={[
        'rounded-[24px] border border-white/8 bg-[#111827]/80 backdrop-blur-md',
        'px-5 py-5 md:px-6 md:py-6 transition-shadow duration-[180ms] ease-out',
        glow,
        className,
      ].join(' ')}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
        {title}
      </p>
      <div className="text-sm leading-7 text-white/85 md:text-[15px]">
        {children}
      </div>
    </section>
  );
}
