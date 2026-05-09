import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavHeader from './components/NavHeader'
import CartDrawer from './components/CartDrawer'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import SciencePage from './pages/SciencePage'

export default function App() {
  const location = useLocation()
  return (
    <>
      <NavHeader />
      <CartDrawer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                           element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/shop"                       element={<PageTransition><ShopPage /></PageTransition>} />
          <Route path="/product/:slug"              element={<PageTransition><ProductDetailPage /></PageTransition>} />
          <Route path="/about"                      element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/science"                    element={<PageTransition><SciencePage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
