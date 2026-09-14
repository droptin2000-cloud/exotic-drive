"use client";
import React from 'react';
import Link from 'next/link';
import { THEMES } from '@/constants/themes';

export default function Hero() {
  const theme = THEMES.heritage;

  return (
    <section className={`relative h-[90vh] flex items-center justify-center overflow-hidden ${theme.bg}`}>
      <div className="absolute inset-0 z-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover"
          alt="Hero Car"
        />
        <div className={`absolute inset-0 ${theme.bg} opacity-50`}></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className={`text-5xl md:text-8xl font-bold mb-8 leading-tight ${theme.text} font-serif`}>
          L'art de conduire <br/> <span className={theme.accent}>l'exception</span>
        </h1>
        <p className={`text-lg md:text-2xl mb-12 max-w-2xl mx-auto opacity-80 ${theme.text} font-sans`}>
          Réservez des véhicules iconiques pour vos moments les plus précieux. <br/> 
          Une expérience automobile unique sur la Côte d'Azur.
        </p>
        <Link 
          href="/vehicles"
          className={`px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all transform hover:scale-105 inline-block ${theme.buttonBg} ${theme.buttonText}`}
        >
          Réserver une voiture
        </Link>
      </div>
    </section>
  );
}
