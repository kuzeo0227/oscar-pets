import { motion } from "framer-motion";
import DogAnatomy from "../ui/DogAnatomy";

const ease = [0.22, 1, 0.36, 1];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative"
      style={{ background: "#ffffff" }}
    >
      <div className="container-edge mx-auto py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-12 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-5">
            <p className="eyebrow" style={{ color: "var(--color-mute)" }}>
              02 — THE PROBLEM
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="mt-6 font-serif text-ink leading-[1.05]"
              style={{ fontSize: "clamp(36px, 4.4vw, 56px)", fontWeight: 700 }}
            >
              Most of what you blame
              <br />
              on the dog actually
              <br />
              <em className="italic">starts in the gut</em>.
            </motion.h2>
            <p
              className="mt-7 max-w-md font-display text-[15.5px] leading-[1.7]"
              style={{ color: "var(--color-mute)" }}
            >
              Anxiety, itch, soft stool, allergies, dull coat — the symptoms look unrelated.
              They aren&apos;t. Roughly 70% of immune signalling and most behavioural-relevant
              metabolites originate downstream of the microbiome. Fix the gut and the rest
              tends to follow.
            </p>
            <p
              className="mt-6 max-w-md font-display text-[14px] leading-[1.65]"
              style={{ color: "var(--color-mute)" }}
            >
              Oscar is built for that one upstream lever. Hover any point on the diagram
              to see which symptom it maps to.
            </p>
          </div>

          {/* RIGHT: anatomy diagram */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              <DogAnatomy />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-px w-full" style={{ background: "var(--color-rule)" }} />
    </section>
  );
}
