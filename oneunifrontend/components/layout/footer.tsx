"use client"

import { Mail, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import OneUniL from "@/public/Logo/OneUniL.png";
import Image from "next/image";

const SOCIALS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden font-sans">
      {/* Lighter Faded Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-orange-50/80 z-0"></div>
      
      {/* Frosted Glass Overlay/Texture */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl z-0"></div>
      
      {/* Decorative Orbs - Adjusted for Light Theme */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-orange-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={OneUniL} 
                alt="Logo" 
                className="w-auto h-8 object-contain" 
                width={120} 
                height={48} 
              />
              <span className="font-bold text-xl text-slate-800">OneUni</span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of leaders through accessible, world-class education technology.
            </p>
            <div className="flex gap-4">
               {SOCIALS.map((social) => (
                 <a 
                   key={social.label} 
                   href={social.href} 
                   className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-700 transition-all backdrop-blur-md border border-white/40 shadow-sm"
                 >
                   <social.icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold mb-6 text-slate-800">Admissions</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-primary transition-colors">How to Apply</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tuition & Fees</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Scholarships</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Dates & Deadlines</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold mb-6 text-slate-800">Academics</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-primary transition-colors">Undergraduate</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Graduate</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Online Learning</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Summer School</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-bold mb-6 text-slate-800">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><span className="block text-slate-800 font-medium mb-1">Support Center</span></li>
              <li><span className="block text-slate-800 font-medium mb-1">Campus Map</span></li>
              <li><a href="tel:+1(555)123-4567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a></li>
              <li><a href="mailto:hello@oneuni.edu" className="hover:text-primary transition-colors">hello@oneuni.edu</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} OneUni Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
             <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-primary transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
