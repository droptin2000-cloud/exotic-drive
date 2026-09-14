"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Car, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CustomerDashboard() {
  const theme = THEMES.heritage;
  const [latestBooking, setLatestBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestBooking() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('bookings')
          .select('*, vehicles(brand, model)')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;
        setLatestBooking(data?.[0] || null);
      } catch (err) {
        console.error("Error fetching latest booking:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestBooking();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Mon Espace</h1>
          <p className={`opacity-60 ${theme.text}`}>Bienvenue dans votre expérience ExoticDrive.</p>
        </div>
        <Link 
          href="/vehicles" 
          className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText}`}
        >
          Réserver un véhicule
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-4 col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className={`w-6 h-6 ${theme.accent}`} />
              <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Prochaine Expérience</h3>
            </div>
            <Link href="/dashboard/customer/bookings" className={`text-xs uppercase tracking-widest font-bold ${theme.accent} hover:underline`}>
              Voir tout
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32 opacity-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-heritage-gold"></div>
            </div>
          ) : latestBooking ? (
            <div className={`p-6 rounded-2xl ${theme.bg} ${theme.border} border flex items-center justify-between gap-6`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${theme.cardBg} flex items-center justify-center text-2xl ${theme.border} border`}>
                  🚗
                </div>
                <div className="space-y-1">
                  <h4 className={`text-lg font-bold ${theme.text} font-serif`}>
                    {latestBooking.vehicles?.brand} {latestBooking.vehicles?.model}
                  </h4>
                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {latestBooking.start_date} à {latestBooking.start_time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${latestBooking.status === 'ACCEPTED' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                      {latestBooking.status}
                    </span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/dashboard/customer/bookings`} 
                className={`p-3 rounded-full ${theme.accentBg} ${theme.buttonText} hover:scale-110 transition-transform`}
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="text-center py-10 opacity-40">
              <p className={theme.text}>Vous n'avez pas encore de réservation active.</p>
            </div>
          )}
        </div>

        <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
          <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Aide & Support</h3>
          <div className="space-y-3">
            <button className={`w-full p-4 rounded-2xl ${theme.bg} ${theme.border} border text-left text-sm ${theme.text} hover:bg-white/5 transition-all`}>
              Comment fonctionne la caution ?
            </button>
            <button className={`w-full p-4 rounded-2xl ${theme.bg} ${theme.border} border text-left text-sm ${theme.text} hover:bg-white/5 transition-all`}>
              Modifier mes informations
            </button>
            <button className={`w-full p-4 rounded-2xl ${theme.bg} ${theme.border} border text-left text-sm ${theme.text} hover:bg-white/5 transition-all`}>
              Contacter le support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
