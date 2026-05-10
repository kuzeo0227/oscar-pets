import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavHeader from './components/NavHeader'
import CartDrawer from './components/CartDrawer'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
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
          <Route path="/"            element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/product"     element={<PageTransition><ProductPage /></PageTransition>} />
          <Route path="/checkout"    element={<PageTransition><CheckoutPage /></PageTransition>} />
          <Route path="/about"       element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/science"     element={<PageTransition><SciencePage /></PageTransition>} />

          {/* Redirects (legacy routes → /product) */}
          <Route path="/shop"                 element={<Navigate to="/product" replace />} />
          <Route path="/product/:slug"        element={<Navigate to="/product" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
