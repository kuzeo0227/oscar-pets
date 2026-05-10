/**
 * TRUST BAR — fully static strip, no animation.
 * 4 evenly-spaced trust signals via space-between across the full width.
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
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "clamp(24px, 7vw, 128px)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
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
