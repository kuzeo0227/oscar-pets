import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ingredientById, heroRotationA, heroRotationB } from "../../data/ingredients";
import IngredientImage from "../ui/IngredientImage";

const ROTATION_INTERVAL_MS = 8000;
const ease = [0.22, 1, 0.36, 1];

const journey = [
  { num: "01", label: "our journey" },
  { num: "02", label: "the science" },
  { num: "03", label: "why oscar" },
];

function IngredientCell({ id, index }) {
  const ing = ingredientById[id];
  const display = ing.short || ing.name;
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.65, ease, delay: index * 0.07 }}
      className="flex flex-col items-center text-center gap-2"
    >
      <p
        className="font-display text-[11.5px] font-medium leading-[1.25] text-ink min-h-[2.6em] flex items-end justify-center px-1"
        style={{ letterSpacing: "0.01em" }}
      >
        {display}
      </p>
      <IngredientImage ingredient={ing} size={56} />
    </motion.div>
  );
}

export default function Hero() {
  const sets = [heroRotationA, heroRotationB];
  const [setIndex, setSetIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSetIndex((i) => (i + 1) % sets.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  const currentSet = sets[setIndex];

  return (
    // Flat-flow hero — sits naturally above TrustBar; no sticky/cover-stack.
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-paper-soft)", minHeight: "calc(100vh - 96px)" }}
    >
      <div className="container-edge mx-auto grid h-full grid-cols-1 items-stretch gap-y-10 lg:grid-cols-12 lg:gap-x-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* LEFT: copy column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="eyebrow text-ink">THE PETS SUPPLEMENT LABORATORY</p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
              className="mt-7 font-display tracking-[-0.025em] text-ink leading-[0.95]"
              style={{ fontSize: "clamp(48px, 6.6vw, 96px)", fontWeight: 800 }}
            >
              <span className="block whitespace-nowrap">Formulated with</span>
              <span className="block">science.</span>
            </motion.h1>

            {/* Bolder, larger asterisk */}
            <div
              className="mt-10 select-none text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(72px, 8vw, 112px)",
                fontWeight: 900,
                lineHeight: 0.7,
                letterSpacing: "-0.04em",
              }}
              aria-hidden
            >
              *
            </div>

            <ol className="mt-10 space-y-2.5">
              {journey.map((j, i) => (
                <motion.li
                  key={j.num}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease, delay: 0.25 + i * 0.06 }}
                  className="grid grid-cols-[3rem_1fr] items-baseline font-mono text-[14px] text-ink"
                >
                  <span className="num-mono">{j.num}</span>
                  <span className="font-mono lowercase tracking-[0.02em]">{j.label}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.a
            href="#journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            className="mt-8 inline-block self-start font-mono text-[12px] tracking-[0.22em] uppercase text-ink"
          >
            <span className="relative inline-block pb-1">
              Discover more
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left"
                style={{ background: "var(--color-ink)" }}
              />
            </span>
          </motion.a>
        </div>

        {/* RIGHT: ingredients aligned exactly to the jar's width, then jar */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {/* Both ingredients row + jar share this max-width — guarantees alignment */}
          <div className="flex w-full max-w-[420px] flex-col items-center">
            {/* Ingredients row — narrower than the jar so it never exceeds */}
            <div className="relative h-[120px] w-[88%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={setIndex}
                  className="absolute inset-0 grid grid-cols-4 items-end gap-3"
                >
                  {currentSet.map((id, i) => (
                    <IngredientCell key={`${setIndex}-${id}`} id={id} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Jar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="relative mt-2 w-full"
            >
              <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/assets/jar-front.jpg"
                  alt="Oscar Gut & Immune Probiotic Chews — 60 chews jar"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center 78%", transform: "scale(1.18)" }}
                  draggable={false}
                />
                {/* mask the FRONT VIEW caption baked into the source image */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[14%]"
                  style={{ background: "var(--color-paper-soft)" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
