"use client";
import React from 'react';
import Link from 'next/link';
import { THEMES } from '@/constants/themes';
import { Share2, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  const theme = THEMES.heritage;

  return (
    <footer className={`pt-20 pb-10 px-6 ${theme.bg} border-t ${theme.border} border`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <div className={`text-2xl font-bold tracking-tighter ${theme.accent} font-serif`}>
              EXOTIC<span className={theme.text}>DRIVE</span>
            </div>
            <p className={`max-w-sm opacity-60 ${theme.text} font-sans leading-relaxed`}>
              La référence de la mobilité d'exception sur la Côte d'Azur. 
              Nous connectons les passionnés d'automobiles rares avec ceux qui recherchent l'expérience ultime.
            </p>
            <div className="flex gap-6">
              <Share2 className={`w-5 h-5 cursor-pointer hover:text-heritage-gold transition-colors ${theme.text}`} />
              <Twitter className={`w-5 h-5 cursor-pointer hover:text-heritage-gold transition-colors ${theme.text}`} />
              <Facebook className={`w-5 h-5 cursor-pointer hover:text-heritage-gold transition-colors ${theme.text}`} />
              <Mail className={`w-5 h-5 cursor-pointer hover:text-heritage-gold transition-colors ${theme.text}`} />
            </div>
          </div>
          <div className="space-y-6">
            <h4 className={`text-sm uppercase tracking-widest font-bold ${theme.text} font-serif`}>Navigation</h4>
            <ul className={`space-y-3 text-sm opacity-60 ${theme.text}`}>
              <li><Link href="/vehicles" className="hover:text-heritage-gold transition-colors">Catalogue</Link></li>
              <li><Link href="/become-owner" className="hover:text-heritage-gold transition-colors">Propriétaires</Link></li>
              <li><Link href="/about" className="hover:text-heritage-gold transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-heritage-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className={`text-sm uppercase tracking-widest font-bold ${theme.text} font-serif`}>Légal</h4>
            <ul className={`space-y-3 text-sm opacity-60 ${theme.text}`}>
              <li><Link href="/terms" className="hover:text-heritage-gold transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="/privacy" className="hover:text-heritage-gold transition-colors">Confidentialité</Link></li>
              <li><Link href="/insurance" className="hover:text-heritage-gold transition-colors">Assurances</Link></li>
              <li><Link href="/cookies" className="hover:text-heritage-gold transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className={`pt-8 border-t ${theme.border} border flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40 ${theme.text}`}>
          <p>© 2026 ExoticDrive. Tous droits réservés.</p>
          <p>Conçu pour l'exception.</p>
        </div>
      </div>
    </footer>
  );
}
