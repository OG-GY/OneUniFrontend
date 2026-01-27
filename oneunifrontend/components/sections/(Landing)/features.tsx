"use client"

import { LayoutGrid, Clock, Users, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Unified Portal",
    description: "Manage your application documents, status, and communication for all your universities in one single, secure dashboard. No more lost platforms.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Clock,
    title: "Automated Applications",
    description: "Never miss a deadline with automated applications, alerts and real-time status updates on your admission progress.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: Users,
    title: "Student Life Connection",
    description: "Connect with future classmates, professional mentors, and explore housing options before you even arrive on campus.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Access on-demand counseling and academic advice through integrated meetings and chat support.",
    color: "bg-purple-100 text-purple-600"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
              WHY CHOOSE ONEUNI?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-6">
              Experience a seamless <br className="hidden md:block" />
              admissions <br className="hidden md:block" />
              process.
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md">
              We've redesigned the university experience from the ground up to be student-centric, digital-first, and incredibly simple.
            </p>
            <a href="#" className="text-primary font-semibold hover:text-primary/80 transition flex items-center gap-2 group">
              Learn about our platform 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Right: Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300 border border-slate-100"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}