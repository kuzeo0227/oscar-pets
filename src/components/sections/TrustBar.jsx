/**
 * TRUST BAR — pure CSS marquee, no JS, no Framer Motion.
 * Sits as a 44px-tall black strip immediately under the Hero.
 */
export default function TrustBar() {
  const text = "VET-FORMULATED · HALAL-COMPLIANT FORMULA · 3RD-PARTY TESTED · 30-DAY MONEY-BACK · ";
  const repeated = text.repeat(6);

  return (
    <section
      style={{
        background: "#0a0a0a",
        height: 44,
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <style>{`
        @keyframes oscar-trustbar-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .oscar-trustbar-track {
          display: flex;
          width: max-content;
          height: 100%;
          align-items: center;
          animation: oscar-trustbar-marquee 28s linear infinite;
          white-space: nowrap;
          font-family: 'Space Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #ffffff;
        }
      `}</style>
      <div className="oscar-trustbar-track">
        <span>{repeated}</span>
        <span aria-hidden="true">{repeated}</span>
      </div>
    </section>
  );
}
