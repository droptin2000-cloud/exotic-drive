"use client";
import React, { useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ArrowLeft, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function BookingDetailsPage() {
  const theme = THEMES.heritage;
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Note: In a real app, we use params.id to fetch the specific booking
  React.useEffect(() => {
    async function fetchBooking() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('bookings')
          .select('*, vehicles(brand, model), profiles(full_name)')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, []);

  if (loading) return <div className={`flex items-center justify-center min-h-screen ${theme.text}`}>Chargement...</div>;

  return (
    <div className="space-y-10">
      <button onClick={() => router.back()} className={`flex items-center gap-2 text-sm opacity-60 ${theme.text} hover:opacity-100 transition-opacity`}>
        <ArrowLeft className="w-4 h-4" /> Retour
      </button>

      <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border shadow-xl space-y-8`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} font-serif`}>Détails de la Réservation</h1>
            <p className={`opacity-60 ${theme.text}`}>Demande de trajet exceptionnel</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${theme.border} border ${theme.text}`}>
            {booking?.status || 'PENDING'}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className={`text-lg font-bold ${theme.text} font-serif mb-4`}>Informations Trajet</h3>
            <div className={`space-y-4 ${theme.bg} p-6 rounded-2xl ${theme.border} border`}>
              <div className="flex items-center gap-4">
                <Calendar className={`w-5 h-5 ${theme.accent}`} />
                <div>
                  <p className="text-xs opacity-50 uppercase">Date</p>
                  <p className={`font-medium ${theme.text}`}>{booking?.start_date || '---'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className={`w-5 h-5 ${theme.accent}`} />
                <div>
                  <p className="text-xs opacity-50 uppercase">Heure</p>
                  <p className={`font-medium ${theme.text}`}>{booking?.start_time || '---'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className={`w-5 h-5 ${theme.accent}`} />
                <div>
                  <p className="text-xs opacity-50 uppercase">Itinéraire</p>
                  <p className={`font-medium ${theme.text}`}>{booking?.pickup_location} $\rightarrow$ {booking?.destination}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className={`text-lg font-bold ${theme.text} font-serif mb-4`}>Détails Client</h3>
            <div className={`p-6 rounded-2xl ${theme.bg} ${theme.border} border space-y-4`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${theme.accentBg} ${theme.buttonText} flex items-center justify-center font-bold`}>
                  {booking?.profiles?.full_name?.[0] || 'U'}
                </div>
                <div>
                  <p className={`font-bold ${theme.text}`}>{booking?.profiles?.full_name || 'Client Anonyme'}</p>
                  <p className="text-xs opacity-60">Client Certifié</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className={`text-sm flex justify-between ${theme.text}`}>
                  <span className="opacity-50">Véhicule demandé:</span>
                  <span className="font-medium">{booking?.vehicles?.brand} {booking?.vehicles?.model}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Rémunération nette</p>
            <p className={`text-3xl font-bold ${theme.accent}`}>{booking?.base_price || '0'} €</p>
          </div>
          <div className="flex gap-4">
            <button className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10`}>
              Refuser
            </button>
            <button className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${theme.buttonBg} ${theme.buttonText} hover:scale-105`}>
              Accepter le trajet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
