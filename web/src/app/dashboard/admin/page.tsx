"use client";
import React from 'react';
import { THEMES } from '@/constants/themes';
import { Car, Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const theme = THEMES.heritage;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Panel Administration</h1>
          <p className={`opacity-60 ${theme.text}`}>Vue globale de la marketplace.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Users className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Utilisateurs</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>124</p>
          <p className="text-xs opacity-60 mt-1">+12% ce mois</p>
        </div>
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Car className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Véhicules</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>42</p>
          <p className="text-xs opacity-60 mt-1">15 en attente</p>
        </div>
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <Clock className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Réservations</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>89</p>
          <p className="text-xs opacity-60 mt-1">12 aujourd'hui</p>
        </div>
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${theme.bg}`}>
              <TrendingUp className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">GMV</span>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>12.4k€</p>
          <p className="text-xs opacity-60 mt-1">Mois en cours</p>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={`w-6 h-6 text-yellow-500`} />
            <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Actions Requises</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Vérifier 12 nouvelles pièces d\'identité', icon: 'ID' },
              { label: 'Approuver 5 nouveaux véhicules', icon: 'CAR' },
              { label: 'Traiter 2 signalements utilisateurs', icon: 'WARN' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${theme.bg} ${theme.border} border transition-all hover:bg-white/5 cursor-pointer group`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${theme.accentBg} ${theme.buttonText}`}>{item.icon[0]}</div>
                  <span className={`text-sm ${theme.text}`}>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
          <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Activité Récente</h3>
          <div className="space-y-4">
            {[
              { user: 'Marc L.', action: 'A ajouté une Porsche 911', time: 'Il y a 10 min' },
              { user: 'Sophie D.', action: 'A réservé une Ferrari F40', time: 'Il y a 1h' },
              { user: 'Admin', action: 'A approuvé le profil de Jean D.', time: 'Il y a 3h' },
            ].map((activity, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${theme.bg} ${theme.border} border transition-all hover:bg-white/5`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold text-xs font-bold">
                    {activity.user[0]}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.text}`}>{activity.user}</p>
                    <p className="text-xs opacity-50">{activity.action}</p>
                  </div>
                </div>
                <span className="text-[10px] opacity-40">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
