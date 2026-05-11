// Stylised dog silhouette with hotspot dots that map to symptom areas.
// Hover any dot to highlight the matching label outside the diagram.
import { useState } from "react";

const points = [
  { id: "anxiety", label: "Stress & Anxiety", x: 215, y: 78 },
  { id: "skin", label: "Skin & Coat", x: 188, y: 124 },
  { id: "immunity", label: "Allergy & Immunity", x: 248, y: 116 },
  { id: "digestion", label: "Gut & Digestion", x: 138, y: 172 },
  { id: "stool", label: "Stool & Anal Glands", x: 78, y: 158 },
  { id: "joint", label: "Hip & Joint", x: 96, y: 224 },
  { id: "energy", label: "Energy & Vitality", x: 196, y: 200 },
  { id: "bladder", label: "Bladder", x: 110, y: 196 },
];

// hand-tuned silhouette of a side-view standing dog
const dogPath =
  "M242 80 Q252 64 246 52 Q241 41 235 42 Q231 32 222 36 Q216 30 207 36 Q200 32 195 42 Q186 56 195 76 Q188 82 184 96 Q174 102 166 112 Q150 120 122 124 Q88 126 64 134 Q44 142 36 156 Q28 174 36 188 Q44 194 56 192 Q66 200 78 196 Q82 218 86 240 Q90 248 100 248 Q108 246 108 236 Q108 220 108 208 Q138 212 158 208 Q176 224 186 240 Q190 248 200 248 Q210 246 208 236 Q204 220 196 208 Q210 200 218 188 Q228 178 232 162 Q240 144 244 124 Q252 110 248 96 Q244 86 242 80 Z";

export default function DogAnatomy() {
  const [active, setActive] = useState(null);

  return (
    <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
      {/* Left labels */}
      <ul className="hidden flex-col gap-5 text-right lg:flex">
        {points.slice(0, 4).map((p) => (
          <Label key={p.id} point={p} active={active} setActive={setActive} side="left" />
        ))}
      </ul>

      {/* Diagram */}
      <div className="relative mx-auto w-full max-w-[460px]">
        <svg viewBox="0 0 320 280" className="h-auto w-full">
          <path
            d={dogPath}
            fill="#ffffff"
            stroke="var(--color-ink)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {points.map((p) => {
            const isActive = active === p.id;
            return (
              <g key={p.id} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)} style={{ cursor: "pointer" }}>
                <circle cx={p.x} cy={p.y} r={isActive ? 10 : 6} fill="var(--color-ink)" opacity={isActive ? 0.12 : 0} />
                <circle cx={p.x} cy={p.y} r={4} fill="var(--color-ink)" />
                <circle cx={p.x} cy={p.y} r={1.5} fill="#fff" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right labels */}
      <ul className="hidden flex-col gap-5 text-left lg:flex">
        {points.slice(4).map((p) => (
          <Label key={p.id} point={p} active={active} setActive={setActive} side="right" />
        ))}
      </ul>

      {/* Mobile labels (single column under the diagram) */}
      <ul className="grid grid-cols-2 gap-y-3 gap-x-6 lg:hidden">
        {points.map((p) => (
          <li key={p.id} className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink">
            · {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Label({ point, active, setActive }) {
  const isActive = active === point.id;
  return (
    <li
      onMouseEnter={() => setActive(point.id)}
      onMouseLeave={() => setActive(null)}
      className="cursor-pointer select-none transition-opacity duration-300"
      style={{ opacity: active && !isActive ? 0.35 : 1 }}
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink">
        {point.label}
      </p>
      <span
        className="mt-1 block h-px origin-left transition-transform duration-500"
        style={{
          background: "var(--color-ink)",
          width: 64,
          transform: isActive ? "scaleX(1)" : "scaleX(0.35)",
        }}
      />
    </li>
  );
}
