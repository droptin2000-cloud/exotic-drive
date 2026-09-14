"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Loader2, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function OwnerBookingsPage() {
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
          .select('*, profiles(full_name), vehicles(brand, model)')
          .eq('owner_id', user.id)
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

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('bookings')
        .select('*, profiles(full_name), vehicles(brand, model)')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });
      setBookings(data || []);
      
      alert(`Réservation ${newStatus === 'ACCEPTED' ? 'acceptée' : 'refusée'}.`);
    } catch (err: any) {
      alert("Erreur : " + err.message);
    }
  };

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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Mes Demandes</h1>
          <p className={`opacity-60 ${theme.text}`}>Gérez les réservations de vos véhicules.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
          <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
            📅
          </div>
          <div className={`text-center ${theme.text}`}>
            <h3 className="text-xl font-bold font-serif">Aucune réservation</h3>
            <p className="opacity-60">Vous n'avez reçu aucune demande pour le moment.</p>
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
                  <div className="flex items-center gap-3">
                    <h3 className={`text-xl font-bold ${theme.text} font-serif`}>
                      {booking.vehicles?.brand} {booking.vehicles?.model}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${booking.status === 'ACCEPTED' ? 'text-green-400 bg-green-400/10 border-green-400/30' : booking.status === 'DECLINED' ? 'text-red-400 bg-red-400/10 border-red-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {booking.profiles?.full_name}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.start_date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.start_time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block mr-6">
                  <p className={`text-lg font-bold ${theme.accent}`}>{booking.total_price} €</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Revenu estimé</p>
                </div>
                
                {booking.status === 'PENDING' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'DECLINED')}
                      className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all" 
                      title="Refuser"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'ACCEPTED')}
                      className="p-3 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all" 
                      title="Accepter"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
