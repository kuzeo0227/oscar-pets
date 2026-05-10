const cols = [
  {
    title: "Product",
    links: ["Probiotic Chews", "Subscribe & save", "Bundles"],
  },
  {
    title: "Lab",
    links: ["Ingredients", "How it works", "Studies"],
  },
  {
    title: "About",
    links: ["Our journey", "Mission", "Press"],
  },
  {
    title: "Help",
    links: ["FAQ", "Shipping & returns", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "var(--color-ink)", color: "#fff" }}
    >
      <div className="container-edge mx-auto py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          {/* Wordmark + tagline */}
          <div className="lg:col-span-5">
            <p
              className="font-display tracking-[-0.04em] leading-[0.85] text-white"
              style={{ fontSize: "clamp(64px, 9vw, 144px)", fontWeight: 800 }}
            >
              oscar
              <span className="align-super text-[0.35em] font-mono">™</span>
            </p>
            <p
              className="mt-6 max-w-md font-display text-[14.5px] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              The pets supplement laboratory. Built for one product, formulated for one
              outcome — a quietly better gut.
            </p>

            {/* socials */}
            <ul className="mt-8 flex gap-3">
              {[
                { label: "Instagram", path: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-1a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" },
                { label: "TikTok", path: "M14 4v8a4 4 0 11-4-4v3a1 1 0 100 2 1 1 0 001-1V2h3a4 4 0 004 4v3a7 7 0 01-4-1z" },
                { label: "YouTube", path: "M22 8a4 4 0 00-3-3.8C17.5 4 12 4 12 4s-5.5 0-7 .2A4 4 0 002 8a40 40 0 000 8 4 4 0 003 3.8c1.5.2 7 .2 7 .2s5.5 0 7-.2A4 4 0 0022 16a40 40 0 000-8zm-12 7V9l5 3-5 3z" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center transition-colors duration-200 hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p
                  className="eyebrow"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="font-display text-[14px] text-white transition-opacity duration-200 hover:opacity-70"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* lower strip */}
        <div
          className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-7 sm:flex-row sm:items-center"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>
            © {new Date().getFullYear()} Oscar Pets · Formulated in Malaysia
          </p>
          <ul className="flex gap-6 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
            <li><a href="#" className="hover:text-white">Halal compliance</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
