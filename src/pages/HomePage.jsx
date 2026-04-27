import Hero from '../components/sections/Hero'
import ProductFeature from '../components/sections/ProductFeature'
import OurMission from '../components/sections/OurMission'
import IngredientsShowcase from '../components/sections/IngredientsShowcase'
import SciencePreview from '../components/sections/SciencePreview'
import Footer from '../components/sections/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductFeature />
      <OurMission />
      <IngredientsShowcase />
      <SciencePreview />
      <Footer />
    </main>
  )
}
