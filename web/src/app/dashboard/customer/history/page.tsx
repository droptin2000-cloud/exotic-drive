"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CustomerHistoryPage() {
  const theme = THEMES.heritage;
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('bookings')
          .select('*, vehicles(brand, model)')
          .eq('customer_id', user.id)
          .eq('status', 'COMPLETED')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[60vh] ${theme.text}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Mon Historique</h1>
          <p className={`opacity-60 ${theme.text}`}>Retrouvez tous vos trajets d'exception passés.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
          <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
            🚗
          </div>
          <div className={`text-center ${theme.text}`}>
            <h3 className="text-xl font-bold font-serif">Aucun trajet terminé</h3>
            <p className="opacity-60">Vos expériences passées apparaîtront ici.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map(booking => (
            <div key={booking.id} className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white/5`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${theme.bg} flex items-center justify-center text-2xl ${theme.border} border`}>
                  ✅
                </div>
                <div className="space-y-1">
                  <h3 className={`text-xl font-bold ${theme.text} font-serif`}>
                    {booking.vehicles?.brand} {booking.vehicles?.model}
                  </h3>
                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.start_date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {booking.pickup_location} $\rightarrow$ {booking.destination}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block mr-6">
                  <p className={`text-lg font-bold ${theme.accent}`}>{booking.total_price} €</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Montant payé</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-400/30 bg-green-400/10 text-green-400`}>
                  Terminé
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
