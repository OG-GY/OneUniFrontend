"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ensureSeedUsers } from "@/lib/api/auth"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    ensureSeedUsers()
    // Force light mode for now as requested
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }, [])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}
