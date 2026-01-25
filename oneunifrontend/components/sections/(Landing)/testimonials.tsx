"use client"

import { Globe, GraduationCap, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

const STATS = [
  { icon: Globe, value: "120+", label: "Countries represented on campus", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: GraduationCap, value: "95%", label: "Graduate employment rate within 6 months", color: "text-green-600", bg: "bg-green-100" },
  { icon: DollarSign, value: "$45M", label: "In scholarships awarded annually", color: "text-amber-600", bg: "bg-amber-100" },
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Join a global community of <br />
              ambitious learners.
            </h2>
            
            <div className="space-y-8 mt-12">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center shrink-0`}>
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

          {/* Right: Featured Testimonial Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 relative"
          >
            <div className="absolute top-10 left-8 text-6xl text-amber-200 font-serif leading-none">“</div>
            <p className="text-xl text-slate-700 leading-relaxed italic relative z-10 mb-8 pt-4">
              The OneUni platform made applying so incredibly simple. I could track every step, talk to counselors, and I knew exactly when my acceptance letter arrived. It took all the stress out of the process.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" 
                  alt="Sarah Jenkins" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900">Sarah Jenkins</p>
                <p className="text-sm text-slate-500">B.Sc. Computer Science, Class of '25</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
