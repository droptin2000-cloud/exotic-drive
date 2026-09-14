"use client";
import React from 'react';
import { THEMES } from '@/constants/themes';
import { Car, Clock, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboard() {
  const theme = THEMES.heritage;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Bienvenue, Propriétaire</h1>
          <p className={`opacity-60 ${theme.text}`}>Voici l'état actuel de votre garage.</p>
        </div>
        <Link 
          href="/dashboard/owner/vehicles/add" 
          className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText}`}
        >
          + Ajouter un véhicule
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Car className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Véhicules</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>0</p>
          <p className="text-xs opacity-60 mt-1">Aucun véhicule enregistré</p>
        </div>
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Clock className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Réservations</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>0</p>
          <p className="text-xs opacity-60 mt-1">Aucune demande en attente</p>
        </div>
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Star className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Note Moyenne</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>-</p>
          <p className="text-xs opacity-60 mt-1">En attente de vos premiers trajets</p>
        </div>
      </div>

      {/* Warning: Verification */}
      <div className={`p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-4`}>
        <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0" />
        <div>
          <h3 className="font-bold text-yellow-500 mb-1">Vérification du compte requise</h3>
          <p className="text-sm opacity-70 text-yellow-200/80">
            Pour que vos véhicules soient visibles par les clients, vous devez fournir vos documents d'identité et d'assurance.
          </p>
          <Link 
            href="/dashboard/owner/verification" 
            className="inline-block mt-4 text-sm font-bold text-yellow-500 hover:underline"
          >
            Compléter ma vérification →
          </Link>
        </div>
      </div>
    </div>
  );
}
