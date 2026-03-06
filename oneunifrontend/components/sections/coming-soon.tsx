"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Rocket, 
  Code, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  Wrench,
  Zap,
  ArrowRight
} from "lucide-react";

// 1. Import your Layout Components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface FeatureInProgressProps {
  title?: string;
  description?: string;
  estimatedCompletion?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "Our engineers are currently crafting a world-class experience. We're almost there!",
  estimatedCompletion = "Q2 2026"
}: FeatureInProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const milestones = [
    { icon: CheckCircle2, label: "Architecture & Design", status: "complete", time: "Jan 2026" },
    { icon: Code, label: "Core Infrastructure", status: "complete", time: "Feb 2026" },
    { icon: Wrench, label: "Beta Testing & QA", status: "active", time: "In Progress" },
    { icon: Zap, label: "Global Rollout", status: "pending", time: "Coming Soon" },
  ];

  return (
    // 2. Wrap everything in a fragment or a main tag
    <>
      <Header />
      
      <main className="relative bg-slate-50 flex items-center justify-center overflow-hidden font-sans">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#4f46e5 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Side: Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                Build Phase v2.4
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black text-[#2A2F91] leading-none mb-6">
                {title.split(" ").map((word, i) => (
                  <span key={i} className={i === 1 ? "text-yellow-600 block" : "block"}>{word}</span>
                ))}
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-slate-500 max-w-md mb-10 leading-relaxed">
                {description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#2A2F91] text-white font-bold rounded-2xl hover:bg-white hover:text-[#2A2F91] hover:cursor-pointer transition-all flex items-center gap-2 group">
                  Notify Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                  View Roadmap
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side: Visual Dashboard */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              {/* Main Feature Card */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-200/50 border border-slate-100 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-[#2A2F91] rounded-2xl flex items-center justify-center">
                    <Rocket className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-bold text-slate-400 uppercase tracking-tighter">ETA</span>
                    <span className="text-2xl font-black text-slate-900">{estimatedCompletion}</span>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="mb-12">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-black text-slate-900 text-lg">System Readiness</h3>
                    <span className="text-4xl font-black text-[#F6A21E]">{progress}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[#F6A21E] to-[#e28800] rounded-full"
                    />
                  </div>
                </div>

                {/* Vertical Roadmap */}
                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        m.status === 'complete' ? 'bg-green-100 text-green-600' : 
                        m.status === 'active' ? 'bg-indigo-100 text-indigo-600 ring-4 ring-indigo-50' : 
                        'bg-slate-50 text-slate-300'
                      }`}>
                        <m.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className={`font-bold ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{m.label}</p>
                          <span className="text-xs font-medium text-slate-400">{m.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Accent Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" 
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" 
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}