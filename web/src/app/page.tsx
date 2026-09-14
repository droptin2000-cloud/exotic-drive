"use client";
import React from 'react';
import Hero from '@/components/Hero';
import { ShieldCheck, Star, Clock } from 'lucide-react';
import { THEMES } from '@/constants/themes';

export default function LandingPage() {
  const theme = THEMES.heritage;

  return (
    <main className={`min-h-screen ${theme.bg} animate-fade-in`}>
      <Hero />
      
      {/* Value Props */}
      <section className={`py-24 px-6 ${theme.bg}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className={`p-4 rounded-full mb-6 ${theme.cardBg} ${theme.border} border`}>
              <ShieldCheck className={`w-8 h-8 ${theme.accent}`} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${theme.text} font-serif`}>Sûreté Absolue</h3>
            <p className={`opacity-60 ${theme.text} font-sans max-w-xs`}>Vérification rigoureuse des propriétaires et assurance premium incluse.</p>
          </div>
          <div className="flex flex-col items-center space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className={`p-4 rounded-full mb-6 ${theme.cardBg} ${theme.border} border`}>
              <Star className={`w-8 h-8 ${theme.accent}`} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${theme.text} font-serif`}>Collection Rare</h3>
            <p className={`opacity-60 ${theme.text} font-sans max-w-xs`}>Accès privilégié à des modèles iconiques et sportives d'exception.</p>
          </div>
          <div className="flex flex-col items-center space-y-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className={`p-4 rounded-full mb-6 ${theme.cardBg} ${theme.border} border`}>
              <Clock className={`w-8 h-8 ${theme.accent}`} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${theme.text} font-serif`}>Simplicité</h3>
            <p className={`opacity-60 ${theme.text} font-sans max-w-xs`}>Réservation rapide, paiement sécurisé, expérience sans couture.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 px-6 text-center ${theme.bg}`}>
        <div className={`max-w-3xl mx-auto p-12 rounded-3xl ${theme.cardBg} ${theme.border} border animate-fade-in-slow`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme.text} font-serif`}>
            Possédez un véhicule d'exception ?
          </h2>
          <p className={`text-lg mb-10 opacity-60 ${theme.text}`}>
            Rejoignez notre cercle restreint de propriétaires et transformez votre passion en revenus.
          </p>
          <a 
            href="/become-owner" 
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all transform hover:scale-105 inline-block ${theme.buttonBg} ${theme.buttonText}`}
          >
            Proposer ma voiture
          </a>
        </div>
      </section>
    </main>
  );
}
