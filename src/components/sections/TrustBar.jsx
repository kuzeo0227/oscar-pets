/**
 * TRUST BAR — fully static strip, no animation, no scrolling.
 * 4 evenly-spaced trust signals on a single black row beneath the Hero.
 */
export default function TrustBar() {
  const items = [
    "VET-FORMULATED",
    "HALAL-COMPLIANT FORMULA",
    "3RD-PARTY TESTED",
    "30-DAY MONEY-BACK",
  ];

  return (
    <div
      style={{
        background: "#0a0a0a",
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(24px, 5vw, 72px)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        flexWrap: "nowrap",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Space Mono', ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#ffffff",
            whiteSpace: "nowrap",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
