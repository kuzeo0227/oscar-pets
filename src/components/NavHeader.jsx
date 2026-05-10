import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Products", to: "/product" },
  { label: "Lab",      to: "/science" },
  { label: "About",    to: "/about"   },
];

const NAV_H = 96; // px — tall enough for a confident logo and a clean hover-fill

export default function NavHeader() {
  const [hovered, setHovered] = useState(null);
  const { count, setDrawer }  = useCart();
  const location              = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "var(--color-rule)" }}>
      <div
        className="container-edge mx-auto flex items-stretch justify-between"
        style={{ height: NAV_H }}
      >
        {/* Logo */}
        <Link to="/" aria-label="Oscar — home" className="flex items-center">
          <img
            src="/assets/oscar-wordmark.png"
            alt="Oscar"
            className="h-9 w-auto select-none md:h-10"
            draggable={false}
          />
        </Link>

        {/* Center nav — fills full height, hover fills 100% */}
        <nav
          className="hidden h-full items-stretch md:flex"
          onMouseLeave={() => setHovered(null)}
          aria-label="Primary"
        >
          {links.map((l, i) => {
            const isHovered = hovered === i;
            const isActive  = location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.label}
                to={l.to}
                onMouseEnter={() => setHovered(i)}
                className="relative flex h-full items-center px-10 lg:px-14 font-display text-[12.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
                style={{
                  color:           isHovered ? "#fff" : "#0a0a0a",
                  backgroundColor: isHovered ? "#0a0a0a" : "transparent",
                  borderBottom:    isActive && !isHovered ? "2px solid #0a0a0a" : "2px solid transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster: eyebrow + cart */}
        <div className="hidden h-full items-center gap-8 text-right md:flex">
          <p className="eyebrow leading-[1.5]" style={{ color: "#0a0a0a" }}>
            THE PETS
            <br />
            SUPPLEMENT
            <br />
            LABORATORY
          </p>
          <button
            onClick={() => setDrawer(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center"
            style={{ color: "#0a0a0a" }}
            aria-label="Open cart"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
                style={{ background: "#0a0a0a", fontFamily: "var(--font-mono)" }}
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDrawer(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center"
            style={{ color: "#0a0a0a" }}
            aria-label="Open cart"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
                style={{ background: "#0a0a0a", fontFamily: "var(--font-mono)" }}
              >
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center self-center"
            style={{ color: "#0a0a0a" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-left"
        style={{ background: "var(--color-rule)" }}
      />
    </header>
  );
}
