"use client";

import Image from "next/image";
import Link from "next/link";
import { HERO } from "@/lib/content/landing-content";
import OneUniN from "@/public/Logo/OneUniN.png";
import Button from "../../ui/button";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="relative bg-slate-50 pt-4 pb-20 overflow-hidden font-sans">
       {/* Graph Grid Background */}
       <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0" style={{ 
               backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
           }}></div>
           {/* Faded Mask */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50"></div>
       </div>

       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-blue-100 text-primary font-bold text-xs tracking-wide uppercase inline-block">
                Admissions Open 2026
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-slate-900 tracking-tight"
            >
              Define Your <br/>
              <span className="text-primary relative inline-block">
                Future
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6" />
                </svg>
              </span> at <br/>
              OneUni
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg"
            >
              The comprehensive platform for your entire university journey. Manage your application, financial aid, and student life in one unified portal.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4"
            >
              <Link href="/registration">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105"
                  iconRight={<span className="ml-1">→</span>}
                >
                  Start Application
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium border-slate-200 text-slate-600 hover:bg-white hover:text-primary hover:border-primary/20 bg-white shadow-sm"
              >
                Explore Programs
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Composition - Floating Cards */}
          <motion.div 
            className="relative h-[600px] hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
             {/* Main Card (Image Placeholder) */}
             <div className="absolute top-10 right-0 w-[480px] h-[520px] bg-[#D6D3C8] rounded-3xl overflow-hidden shadow-2xl rotate-3 border-4 border-white z-10">
                {/* Mock Image Content */}
                <div className="relative w-full h-full flex flex-col justify-between p-8">
                   {/* <div className="text-right">
                      <p className="font-handwriting text-4xl text-slate-800 opacity-80 rotate-[-5deg] inline-block mr-8 mt-8">Unforgettable</p>
                      <p className="font-serif text-5xl text-slate-900 mt-2">Natural</p>
                   </div> */}
                   
                   {/* OneUniN Image */}
                   <div className="absolute inset-0 top-20 pointer-events-none z-0">
                      <Image
                        src={OneUniN}
                        alt="OneUni visual"
                        fill
                        className="object-contain object-bottom opacity-90"
                        priority
                      />
                   </div>

                   <div className="absolute bottom-8 left-8 text-white z-20">
                      <p className="font-bold text-lg">Community of Innovators</p>
                      <p className="text-xs opacity-80">Join 50+ Universities Collection</p>
                   </div>

                   
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                </div>
             </div>

             {/* Floating Badge - Admission Open */}
             <motion.div 
                className="absolute top-20 -left-6 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg z-20 -rotate-6 font-bold text-sm tracking-wide"
                animate={{ rotate: [-6, -3, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             >
                ADMISSIONS OPEN 2026
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
