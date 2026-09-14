"use client";
import React from 'react';
import { THEMES } from '@/constants/themes';
import { ShieldCheck, Car, TrendingUp, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BecomeOwnerPage() {
  const theme = THEMES.heritage;

  return (
    <div className={`pt-24 pb-20 px-6 min-h-screen ${theme.bg}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.text} font-serif`}>
            Valorisez votre <span className={theme.accent}>passion</span>
          </h1>
          <p className={`text-lg md:text-xl opacity-60 max-w-3xl mx-auto ${theme.text}`}>
            Votre voiture d'exception ne devrait pas seulement dormir dans un garage. 
            Transformez-la en une source de revenus tout en partageant l'émotion qu'elle procure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-4`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.accentBg} ${theme.buttonText} mb-4`}>
                <Car className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-bold ${theme.text} font-serif`}>Contrôle Total</h3>
              <p className={`opacity-60 ${theme.text}`}>
                C'est vous qui décidez quand votre véhicule est disponible. Fixez vos propres tarifs et acceptez uniquement les demandes qui vous conviennent.
              </p>
            </div>
            <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-4`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.accentBg} ${theme.buttonText} mb-4`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-bold ${theme.text} font-serif`}>Sécurité Maximale</h3>
              <p className={`opacity-60 ${theme.text}`}>
                Nous vérifions rigoureusement chaque client. Vos véhicules sont protégés par notre système de caution et d'assurance premium.
              </p>
            </div>
            <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-4`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.accentBg} ${theme.buttonText} mb-4`}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-bold ${theme.text} font-serif`}>Revenus Passifs</h3>
              <p className={`opacity-60 ${theme.text}`}>
                Optimisez la rentabilité de votre collection. De la location courte durée au service de chauffeur, générez des revenus constants.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1562141961-b5d677ec761d?auto=format&fit=crop&q=80&w=800" 
              className="rounded-3xl shadow-2xl border-4 border-white/10" 
              alt="Luxury Garage"
            />
            <div className={`absolute -bottom-8 -left-8 p-6 rounded-2xl ${theme.cardBg} ${theme.border} border shadow-xl max-w-xs`}>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className={`w-5 h-5 ${theme.accent}`} />
                <span className={`font-bold ${theme.text}`}>Revenus estimés</span>
              </div>
              <p className={`text-2xl font-bold ${theme.accent}`}>+ 1 200€ / mois</p>
              <p className="text-xs opacity-40 mt-1">Basé sur une location moyenne de 2 week-ends</p>
            </div>
          </div>
        </div>

        <div className={`text-center p-16 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <h2 className={`text-3xl font-bold mb-8 ${theme.text} font-serif`}>Prêt à rejoindre le cercle ?</h2>
          <Link 
            href="/signup?role=owner" 
            className={`px-12 py-5 rounded-full font-bold uppercase tracking-widest transition-all transform hover:scale-105 inline-flex items-center gap-3 ${theme.buttonBg} ${theme.buttonText}`}
          >
            Inscrire mon véhicule <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
