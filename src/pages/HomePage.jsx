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
      <Hero />
      <TrustBar />
      <ProductFeature />
      <Problem />
      <IngredientsShowcase />
      <SciencePreview />
      <OurMission />
      <Footer />
    </main>
  )
}
