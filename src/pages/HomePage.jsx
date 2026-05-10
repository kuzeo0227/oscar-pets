import Hero              from '../components/sections/Hero'
import TrustBar          from '../components/sections/TrustBar'
import ProductFeature    from '../components/sections/ProductFeature'
import Problem           from '../components/sections/Problem'
import IngredientsShowcase from '../components/sections/IngredientsShowcase'
import SciencePreview    from '../components/sections/SciencePreview'
import OurMission        from '../components/sections/OurMission'
import Footer            from '../components/sections/Footer'

export default function HomePage() {
  return (
    <main>
      {/* STICKY HERO — pinned at top:0, z-index:0, height:100vh */}
      <Hero />

      {/* COVER STACK — slides over hero on scroll */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <TrustBar />
        <ProductFeature />
        <Problem />
        <IngredientsShowcase />
        <SciencePreview />
        <OurMission />
        <Footer />
      </div>
    </main>
  )
}
