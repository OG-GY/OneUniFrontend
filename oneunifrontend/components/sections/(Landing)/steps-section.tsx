"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "Step 01",
    title: "Registration",
    description: "Create your profile and verify your identity in less than 2 minutes.",
    icon: "UserPlus",
    position: "bottom" // Card stays below the line
  },
  {
    number: "Step 02",
    title: "University Search",
    description: "Explore universities that match your interests and preferences.",
    icon: "Search", // Assuming you have an icon for search
    position: "top" // Card stays above the line
  },
  {
    number: "Step 03",
    title: "Application Submission",
    description: "Complete and submit your application to your chosen university.",
    icon: "Upload",
    position: "bottom"
  },
  {
    number: "Step 04",
    title: "Offer & Accept",
    description: "Receive your digital acceptance, visit and secure your spot with one click.",
    icon: "Award",
    position: "top"
  },
];

import { UserPlus, Upload, Video, Award , Search, } from "lucide-react"

const ICON_MAP = {
  UserPlus, Upload, Video, Award, Search, 
}

export default function StepsSection() {
  return (
    <section className="py-24 bg-[#1e2167] text-white relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Ambient Light Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-3xl md:text-5xl font-black mb-4"
          >
            Your Journey in 4 Steps
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            From your first click to your first day on campus, we've streamlined every milestone.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connector Line - Absolute Vertical Center */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[400px]">
            {STEPS.map((step, index) => {
              const Icon = ICON_MAP[step.icon as keyof typeof ICON_MAP]
              const isBottom = step.position === "bottom"
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative z-10 group h-full flex flex-col items-center"
                >
                  {/* Icon Circle - Absolute Center */}
                  <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20">
                     {/* Rotated Square Wrapper for mask effect */}
                    <div className="bg-[#1e2167] p-2 rounded-full"> 
                      <div className="w-16 h-16 rounded-full bg-primary border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center md:text-left z-10
                    ${isBottom ? 'md:mt-auto' : 'md:mb-auto'}
                  `}>
                    <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block">{step.number}</span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
