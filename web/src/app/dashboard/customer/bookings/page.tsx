"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CustomerBookingsPage() {
  const theme = THEMES.heritage;
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('bookings')
          .select('*, vehicles(brand, model)')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Mes Réservations</h1>
          <p className={`opacity-60 ${theme.text}`}>Suivez l'état de vos demandes de trajets.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
          <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
            📅
          </div>
          <div className={`text-center ${theme.text}`}>
            <h3 className="text-xl font-bold font-serif">Aucune réservation</h3>
            <p className="opacity-60">Vous n'avez pas encore effectué de demande.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <div key={booking.id} className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white/5`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${theme.bg} flex items-center justify-center text-2xl ${theme.border} border`}>
                  🚗
                </div>
                <div className="space-y-1">
                  <h3 className={`text-xl font-bold ${theme.text} font-serif`}>
                    {booking.vehicles?.brand} {booking.vehicles?.model}
                  </h3>
                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.start_date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.start_time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block mr-6">
                  <p className={`text-lg font-bold ${theme.accent}`}>{booking.total_price} €</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Prix Total</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${booking.status === 'ACCEPTED' ? 'text-green-400 bg-green-400/10 border-green-400/30' : booking.status === 'DECLINED' ? 'text-red-400 bg-red-400/10 border-red-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
                  {booking.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
