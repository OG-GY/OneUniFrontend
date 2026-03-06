"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import Image from "next/image"
import OneUniL from "@/public/Logo/OneUniL.png"
import Button from "../ui/button"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { id: 'universities', label: 'Universities', href: '/explore' },
  { id: 'admissions', label: 'Admissions', href: '/explore' },
  { id: 'campus-life', label: 'Campus Life', href: '/explore' },
  { id: 'research', label: 'Research', href: '/research' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) return null

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-transparent font-sans",
        isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
             <Image 
               src={OneUniL} 
               alt="Logo" 
               className="w-auto h-8 md:h-10 object-contain" 
               width={120} 
               height={48}
               priority
             />
          </motion.div>
          <span className="font-bold text-lg md:text-xl text-foreground flex items-center gap-0.5 leading-tight">
             <span className="text-primary">OneUni</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors font-medium group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button and Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition"
          >
            Log in
          </Link>
          <Link href="/registration">
            <Button
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-6 shadow-md shadow-secondary/20 hover:-translate-y-0.5 transition-all"
            >
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Toggle theme">
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
          </button>
          <button className="cursor-pointer p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md px-4 py-4 space-y-4 border-t border-border overflow-hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  setIsOpen(false)
                }}
                className="block w-full text-left text-muted-foreground hover:text-foreground py-2 font-medium"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-border" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-muted-foreground hover:text-foreground py-2 font-medium"
            >
              Log in
            </Link>
            <Link href="/registration" onClick={() => setIsOpen(false)} className="block pt-2">
              <Button
                variant="primary" 
                className="w-full justify-center shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
