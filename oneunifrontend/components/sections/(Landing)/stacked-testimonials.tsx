
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { TESTIMONIALS } from "@/lib/content/landing-content"

interface TestimonialCardProps {
  testimonial: any
}

const PaperTestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <div className="relative group cursor-pointer select-none">
    {/* Stacked Paper Effect (Solid Background layers) */}
    <div className="absolute inset-0 bg-white rounded-[2rem] translate-x-2 translate-y-2 shadow-md border border-slate-200" />
    <div className="absolute inset-0 bg-white rounded-[2rem] translate-x-1 translate-y-1 shadow-sm border border-slate-200" />
    
    {/* Main Paper Card */}
    <div className="bg-[#fffdfa] p-10 rounded-[2rem] shadow-[0_15px_60px_rgba(0,0,0,0.12)] border border-slate-200 relative w-full overflow-hidden">
      {/* Paper Grain/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')]" />

      
      <div className="absolute top-10 left-8 text-6xl text-amber-200 font-serif leading-none opacity-40">“</div>
      
      <p className="text-xl text-slate-700 leading-relaxed italic relative z-10 mb-8 pt-4">
        {testimonial.content}
      </p>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden shrink-0 shadow-inner border-2 border-white">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">{testimonial.name}</p>
          <p className="text-sm text-slate-500">{testimonial.role}</p>
        </div>
      </div>

      {/* Decorative fold-like corner hint */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-slate-100/50 to-transparent rounded-br-[2rem]" />
    </div>
  </div>
)

export default function StackedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (!isPaused) {
      timer = setInterval(() => {
        handleNext()
      }, 4000) // Increased to 4s for better readability
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isPaused, currentIndex])

  return (
    <div 
      className="relative h-[480px] w-full flex items-center justify-center p-4 z-20 group" 
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleNext}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={TESTIMONIALS[currentIndex].id}
          className="absolute w-full max-w-lg lg:max-w-none"
          whileHover={{ scale: 1.01 }} // Subtle feedback that it is paused and focused
          initial={{ 
            opacity: 1, 
            scale: 0.8, 
            x: -600,
            y: 80,
            z: -500,
            rotateY: -70,
            rotateX: 15
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            x: 0, 
            z: 0,
            rotateX: 0,
            rotateY: 0,
            zIndex: 10,
          }}
          exit={{ 
            opacity: 1, 
            scale: 1.05, 
            x: 700,
            y: -100,
            z: 200,
            rotateZ: 20,
            rotateY: 45,
            zIndex: 5,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 20,
            mass: 1
          }}
        >
          <PaperTestimonialCard testimonial={TESTIMONIALS[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
