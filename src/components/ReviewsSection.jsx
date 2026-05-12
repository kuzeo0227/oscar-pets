import { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

const STAR_GREEN = '#00B67A'
const NAVY       = '#0D1B2A'
const SECTION_BG = '#F8F9FA'

const REVIEWS = [
  { id: 1,  name: 'Sarah K.',    date: '2 days ago',  title: 'My senior dog acts like a puppy again',
    body: "honestly didnt expect much but wow. our 11 year old golden has been on this for about 6 weeks and the difference is wild — shes jumping on the couch again, doing zoomies in the yard, eating better. her stool used to be inconsistent and thats also sorted itself out. only thing i'd say is the chews are a bit larger than i expected but she has no trouble with them. would buy again 100%." },
  { id: 2,  name: 'Marcus T.',   date: '5 days ago',  title: 'Coat is noticeably softer',
    body: "Three weeks in and the coat change is real. My border collie's fur used to be a bit coarse and now it's soft to the touch. Shedding also down. No issues with the chews — he eats them like treats." },
  { id: 3,  name: 'Aisha B.',    date: '1 week ago',  title: 'Digestion sorted within a week',
    body: "we tried 3 other probiotics before this one and nothing worked for our frenchie's tummy issues. by day 5 of oscar her stools were normal for the first time in months. she loves the taste too. only knocking off a star bc shipping took a bit but the product itself is great." },
  { id: 4,  name: 'Daniel P.',   date: '1 week ago',  title: 'Worth it',
    body: "good stuff. dog likes em. coat shiny." },
  { id: 5,  name: 'Priya R.',    date: '2 weeks ago', title: 'Game changer for joint stiffness',
    body: "My 9-year-old lab was struggling to get up after naps and would limp on cold mornings. I was bracing myself for a vet visit and possibly arthritis meds. A friend recommended oscar and i figured why not. Honestly within 3 weeks the stiffness was visibly less. He's not 100% but he's chasing the ball again and walking up the stairs without complaining. I'm now ordering the bigger jar and recommending it to every dog parent i know. The only minor con is the price point but if it saves us a vet bill it's nothing." },
  { id: 6,  name: 'Liam W.',     date: '2 weeks ago', title: 'Energy levels up',
    body: "Noticed a clear difference in energy after about 10 days. my dog used to be sluggish in the afternoons and now she's basically a different animal. happy with the purchase." },

  { id: 7,  name: 'Mei L.',      date: '3 days ago',  title: 'Picky eater approved',
    body: "this is the only supplement my shih tzu doesn't spit out. she actively asks for it now lol. coat improvement also visible after about a month, would say its glossier and shedding is way down. great product." },
  { id: 8,  name: 'Jordan F.',   date: '6 days ago',  title: 'Solid results',
    body: "Bought this on a recommendation. honestly skeptical at first because the marketing felt a bit hyped but after 4 weeks i can confirm — better digestion, better breath, more playful. happy customer." },
  { id: 9,  name: 'Hana O.',     date: '1 week ago',  title: 'Helped with allergies',
    body: "Our beagle has chronic itchy skin and after about 5 weeks on oscar the scratching has dropped significantly. vet thinks the gut support is helping the immune side of things. cant prove causation but the timing lines up. happy either way." },
  { id: 10, name: 'Sam V.',      date: '10 days ago', title: 'Great for sensitive stomach',
    body: "switched to oscar after our vet suggested adding a probiotic. our rescue has had IBS-like symptoms since we got her. takes about 2 weeks to kick in but the consistency of her stool is way better and she's not having flare-ups anymore. would def recommend if your dog has tummy issues." },
  { id: 11, name: 'Tomas H.',    date: '2 weeks ago', title: 'Easy to give, dog loves them',
    body: "no fuss, no need to hide it in food. dog treats it like a treat. coat is softer after a few weeks. all good." },

  { id: 12, name: 'Beatrice C.', date: '4 days ago',  title: 'Highly recommend for older dogs',
    body: "our 13 year old has been a different dog since starting oscar. more energy, better mood, joint pain seems easier. the vet was impressed at her last check. cant recommend enough — wish we'd started years ago tbh." },
  { id: 13, name: 'Ravi N.',     date: '1 week ago',  title: 'Quality product',
    body: "ingredients look legit, no random fillers. dog enjoys it, no GI upset on starting. been using it for about a month and we'll be reordering." },
  { id: 14, name: 'Emily Z.',    date: '2 weeks ago', title: 'Worth every penny',
    body: "I've spent way too much money on supplements that did nothing. Oscar is the first one I'd buy again without hesitation. The change in my dog's coat alone was worth it — she used to look kind of dull and now her fur is shiny and soft. Energy is also up. She's an 8 year old cocker spaniel and acts more like 4. The only thing I'd say is that 1 chew a day is the right dose for her — I tried 2 and it was too much for her stomach. Started small and built up. Would absolutely recommend." },
  { id: 15, name: 'Felix M.',    date: '3 weeks ago', title: 'Coat + energy combo',
    body: "honest review — does what it says on the tin. coat is shinier, energy is up, no funny business with the stomach. dog is happy. me too." },
  { id: 16, name: 'Noor A.',     date: '3 weeks ago', title: 'My vet noticed too',
    body: "took her in for a routine check after about 6 weeks on oscar and the vet commented on how good her coat looked. i hadnt mentioned the supplement. that was enough validation for me." },
]

function Stars({ size = 16, color = STAR_GREEN }) {
  return (
    <div className="flex items-center" style={{ gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <rect width="24" height="24" fill={color} rx="2" />
          <path d="M12 5.5l1.94 4.18 4.56.42-3.43 3.07 1.02 4.48L12 15.27l-4.09 2.38 1.02-4.48L5.5 10.1l4.56-.42L12 5.5z" fill="#ffffff" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, onOpen }) {
  return (
    <article
      className="rounded-2xl border border-gray-100 bg-white"
      style={{
        boxShadow: '0 2px 8px rgba(13, 27, 42, 0.06)',
        padding: 24,
      }}
    >
      <Stars size={16} />
      <p className="mt-3 text-xs" style={{ color: '#6b7280' }}>
        {review.name} · {review.date}
      </p>
      <h3 className="mt-3 font-semibold" style={{ color: NAVY, fontSize: 15, lineHeight: 1.35 }}>
        {review.title}
      </h3>
      <div className="relative mt-3" style={{ height: 96, overflow: 'hidden' }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#374151' }}>{review.body}</p>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 56,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 80%)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <button
        onClick={() => onOpen(review)}
        className="mt-3 text-sm font-medium hover:underline"
        style={{ color: NAVY, background: 'transparent', border: 0, padding: 0, cursor: 'pointer' }}
      >
        Read more →
      </button>
    </article>
  )
}

function ScrollingColumn({ reviews, duration, onOpen }) {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      y: ['0%', '-50%'],
      transition: { duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' },
    })
  }, [controls, duration])

  function pause()  { controls.stop() }
  function resume() {
    controls.start({
      y: ['0%', '-50%'],
      transition: { duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' },
    })
  }

  return (
    <div className="overflow-hidden" onMouseEnter={pause} onMouseLeave={resume}>
      <motion.div animate={controls} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[...reviews, ...reviews].map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} onOpen={onOpen} />
        ))}
      </motion.div>
    </div>
  )
}

function ReviewModal({ review, onClose }) {
  useEffect(() => {
    if (!review) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [review, onClose])

  if (!review) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white rounded-2xl max-w-lg w-[90%]"
        style={{ padding: 32 }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute"
          style={{
            top: 14, right: 18, background: 'transparent', border: 0,
            fontSize: 22, lineHeight: 1, cursor: 'pointer', color: NAVY,
          }}
        >
          ✕
        </button>
        <Stars size={18} />
        <p className="mt-3 text-xs" style={{ color: '#6b7280' }}>
          {review.name} · {review.date}
        </p>
        <h3 className="mt-3 font-semibold" style={{ color: NAVY, fontSize: 18, lineHeight: 1.35 }}>
          {review.title}
        </h3>
        <p className="mt-4" style={{ fontSize: 14.5, lineHeight: 1.6, color: '#374151' }}>
          {review.body}
        </p>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  const [active, setActive] = useState(null)

  const cols = [
    REVIEWS.slice(0, 6),
    REVIEWS.slice(6, 11),
    REVIEWS.slice(11, 16),
  ]
  const speeds = [25, 18, 13]

  return (
    <section style={{ background: SECTION_BG }}>
      <div className="section-container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="flex flex-col items-center text-center" style={{ marginBottom: 48 }}>
          <h2 className="font-semibold" style={{ color: NAVY, fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: 1.15 }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center" style={{ gap: 12, marginTop: 16 }}>
            <Stars size={20} />
            <span className="font-semibold" style={{ color: NAVY, fontSize: 15 }}>Rated 4.8 / 5</span>
            <span style={{ color: '#6b7280', fontSize: 14 }}>· Based on 200+ reviews</span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 24, maxHeight: 700, overflow: 'hidden' }}
        >
          {cols.map((col, i) => (
            <ScrollingColumn key={i} reviews={col} duration={speeds[i]} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ReviewModal review={active} onClose={() => setActive(null)} />
    </section>
  )
}
