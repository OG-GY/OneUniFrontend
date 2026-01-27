import Header from "@/components/layout/header"
import Hero from "@/components/sections/(Landing)/hero"
import Features from "@/components/sections/(Landing)/features"
import StepsSection from "@/components/sections/(Landing)/steps-section"
import Testimonials from "@/components/sections/(Landing)/testimonials"
import CTA from "@/components/sections/(Landing)/cta"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white transition-colors font-sans">
      <Header />
      <Hero />
      <Features />
      <StepsSection />  
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
