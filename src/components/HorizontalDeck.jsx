import { useRef, useState, useEffect } from 'react'

/**
 * HorizontalDeck — generic draggable horizontal scroll track with bounded
 * right edge + synced custom scrollbar. Used by:
 *   - Homepage ingredient deck
 *   - /product Comprehensive Functional Benefits deck
 *   - /product Research-backed Ingredients deck
 *
 * Behavior:
 *   • Both ends respect the parent's container width (no edge bleed)
 *   • cursor: grab default, grabbing while dragging
 *   • Images inside cards must have draggable={false} + pointer-events: none
 *   • 2px scrollbar below the track, click to jump, thumb follows scroll
 *
 * Usage:
 *   <HorizontalDeck>
 *     {items.map(...)}
 *   </HorizontalDeck>
 */
export default function HorizontalDeck({ children, gap = 16 }) {
  const trackRef     = useRef(null)
  const scrollbarRef = useRef(null)
  const [thumb, setThumb] = useState({ left: 0, width: 20 })
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeftStart: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  })
  const didDrag = useRef(false)
  const rafId = useRef(null)

  /* ---- Drag-to-scroll with momentum (kinetic inertia) ---- */
  function cancelMomentum() {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }

  function onMouseDown(e) {
    const el = trackRef.current
    if (!el) return
    cancelMomentum()
    didDrag.current = false
    dragState.current = {
      active: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeftStart: el.scrollLeft,
      lastX: e.pageX,
      lastTime: Date.now(),
      velocity: 0,
      mouseDownX: e.pageX,
    }
    el.style.cursor = 'grabbing'
    el.style.scrollBehavior = 'auto'
  }

  function onMouseMove(e) {
    const el = trackRef.current
    const s = dragState.current
    if (!el || !s.active) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - s.startX) * 1.2
    el.scrollLeft = s.scrollLeftStart - walk

    if (Math.abs(e.pageX - s.mouseDownX) > 4) {
      didDrag.current = true
    }

    // Track velocity for momentum on release
    const now = Date.now()
    const dt = now - s.lastTime
    if (dt > 0) {
      s.velocity = ((e.pageX - s.lastX) / dt) * 16
    }
    s.lastX = e.pageX
    s.lastTime = now
  }

  function onClickCapture(e) {
    if (didDrag.current) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  function onMouseUp() {
    const el = trackRef.current
    const s = dragState.current
    if (!el || !s.active) return
    s.active = false
    el.style.cursor = 'grab'

    // Kinetic momentum: friction 0.92 produces smooth deceleration.
    const step = () => {
      if (Math.abs(s.velocity) < 0.5) {
        rafId.current = null
        el.style.scrollBehavior = 'smooth'
        return
      }
      el.scrollLeft -= s.velocity
      s.velocity *= 0.92
      rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
  }

  /* ---- Sync custom scrollbar to scroll position ---- */
  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const scrollable = el.scrollWidth - el.clientWidth
    if (scrollable <= 0) {
      setThumb({ left: 0, width: 100 })
      return
    }
    const pct       = el.scrollLeft / scrollable
    const visiblePct = (el.clientWidth / el.scrollWidth) * 100
    const thumbW    = Math.max(visiblePct, 10)
    const leftPct   = pct * (100 - thumbW)
    setThumb({ left: leftPct, width: thumbW })
  }

  useEffect(() => {
    onScroll()
    const ro = new ResizeObserver(onScroll)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => {
      ro.disconnect()
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  /* ---- Click on scrollbar track to jump ---- */
  function onBarClick(e) {
    const bar = scrollbarRef.current
    const track = trackRef.current
    if (!bar || !track) return
    const rect = bar.getBoundingClientRect()
    const clickPct = (e.clientX - rect.left) / rect.width
    const max = track.scrollWidth - track.clientWidth
    track.scrollTo({ left: clickPct * max, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClickCapture={onClickCapture}
        className="flex flex-row overflow-x-auto"
        style={{
          gap,
          cursor: 'grab',
          userSelect: 'none',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          paddingInline: 0,
        }}
      >
        <style>{`.no-native-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>

      {/* Custom 2px scrollbar */}
      <div
        ref={scrollbarRef}
        onClick={onBarClick}
        style={{
          marginTop: 24,
          height: 2,
          background: 'var(--color-rule)',
          width: '100%',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            height: 2,
            background: '#0a0a0a',
            width: `${thumb.width}%`,
            position: 'absolute',
            left: `${thumb.left}%`,
            transition: 'left 0.1s linear',
          }}
        />
      </div>
    </div>
  )
}
