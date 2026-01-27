"use client"

import { useState, useRef, useEffect } from "react"
import { EmailModal } from "../../forms/email-modal"
import { ThankYouSection } from "./thank-you-section"
import Button from "@/components/ui/button"
import Image from "next/image"

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showMinion, setShowMinion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMinion(entry.isIntersecting)
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleSubmit = (email: string, input: string) => {
    console.log("[v0] Form submitted with email:", email)
    setIsModalOpen(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return <ThankYouSection onReset={handleReset} />
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans"
    >
      {/* Dark Blue Background Wrapper */}
      <div className="max-w-7xl mx-auto bg-[#1e2266] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
         
         {/* Animated Minion */}
         <div 
           className={`absolute right-4 md:right-8 w-32 h-32 md:w-40 md:h-40 transition-all duration-700 ease-in-out pointer-events-none z-20 ${
             showMinion ? '-top-12 md:-top-10' : '-top-full'
           }`}
         >
           <Image
             src="/Images/minion.png"
             alt="Minion"
             width={160}
             height={160}
             className="w-full h-full object-contain drop-shadow-2xl"
            //  style={{ transform: 'scaleY(-1)' }}
             priority
           />
         </div>

         <div className="relative z-10">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
             Ready to start your journey?
           </h2>
           <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
             Application for the Fall 2026 semester are closing soon. Secure your place today.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               onClick={() => setIsModalOpen(true)}
               className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-4 text-lg shadow-lg shadow-secondary/20 hover:-translate-y-1 transition-all"
             >
               Apply Now
             </Button>
             <Button
               variant="outline"
               className="border-blue-400/30 text-white hover:bg-white rounded-full px-8 py-4 text-lg font-medium backdrop-blur-sm"
             >
               Download Prospectus
             </Button>
           </div>
         </div>
      </div>

      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </section>
  )
}
