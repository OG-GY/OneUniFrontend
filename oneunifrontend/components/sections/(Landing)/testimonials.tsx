"use client"

import { Globe, GraduationCap, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import StackedTestimonials from "./stacked-testimonials"

const STATS = [
  { icon: Globe, value: "100+", label: "Universities represented on campus", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: GraduationCap, value: "95%", label: "Graduate employment rate within 6 months", color: "text-green-600", bg: "bg-green-100" },
  { icon: DollarSign, value: "100%", label: "Fee Scholarships in universities", color: "text-amber-600", bg: "bg-amber-100" },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Stats & Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Join a global community of <br />
              ambitious learners.
            </h2>
            <p className="text-lg text-slate-600 mb-12 max-w-md">
              Discover why thousands of students trust OneUni for their academic journey and career success.
            </p>
            
            <div className="space-y-8">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-slate-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Stacked Paper Testimonials */}
          <StackedTestimonials />

        </div>
      </div>
    </section>
  )
}
