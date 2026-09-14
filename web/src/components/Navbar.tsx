"use client";
import React from 'react';
import Link from 'next/link';
import { User, Menu } from 'lucide-react';
import { THEMES } from '@/constants/themes';

export default function Navbar() {
  const theme = THEMES.heritage;

  return (
    <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-colors duration-300 ${theme.bg} ${theme.border} border-b backdrop-blur-md bg-opacity-90`}>
      <Link href="/" className={`text-2xl font-bold tracking-tighter ${theme.accent} font-serif`}>
        EXOTIC<span className={theme.text}>DRIVE</span>
      </Link>
      
      <div className="hidden md:flex gap-8 items-center">
        <Link href="/vehicles" className={`text-xs uppercase tracking-widest font-medium ${theme.text} hover:opacity-70 transition-opacity`}>Véhicules</Link>
        <Link href="/become-owner" className={`text-xs uppercase tracking-widest font-medium ${theme.text} hover:opacity-70 transition-opacity`}>Devenir Propriétaire</Link>
        <Link href="/login" className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${theme.buttonBg} ${theme.buttonText} hover:scale-105`}>
          Connexion
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <Menu className={`w-6 h-6 ${theme.text} cursor-pointer`} />
      </div>
    </nav>
  );
}
