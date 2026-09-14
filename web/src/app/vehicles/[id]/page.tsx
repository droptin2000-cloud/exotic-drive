"use client";
import React, { useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Calendar, MapPin, Clock, ArrowLeft, Star, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const theme = THEMES.heritage;
  const router = useRouter();
  const [bookingStep, setBookingStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pickup: '',
    destination: '',
  });

  const vehicle = {
    id: params.id,
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    category: 'Sport',
    price: '250€ / h',
    priceNum: 250,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    description: 'L\'icône absolue du sport automobile. La 911 Carrera S allie performance brute et élégance intemporelle. Idéale pour un trajet mémorable sur la corniche.',
    specs: ['Moteur 3.0L Flat-6', '381 ch', '0-100 km/h en 3.5s', 'Intérieur cuir noir'],
    rating: 4.9,
    owner_id: 'some-owner-id'
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Veuillez vous connecter pour réserver.");

      const basePrice = vehicle.priceNum;
      const platformFee = basePrice * 0.2;
      const totalPrice = basePrice + platformFee;

      const { data: booking, error: bError } = await supabase.from('bookings').insert([
        {
          customer_id: user.id,
          vehicle_id: vehicle.id,
          owner_id: vehicle.owner_id,
          booking_type: 'RENTAL',
          start_date: formData.date,
          end_date: formData.date,
          start_time: formData.time,
          pickup_location: formData.pickup,
          destination: formData.destination,
          base_price: basePrice,
          platform_fee: platformFee,
          total_price: totalPrice,
          status: 'PENDING'
        }
      ]).select().single();

      if (bError) throw bError;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId: booking.id, 
          amount: totalPrice 
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la création de la session de paiement.");

      const { url } = await response.json();
      window.location.href = url;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (bookingStep === 0) {
    return (
      <div className={`pt-20 min-h-screen ${theme.bg}`}>
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/vehicles" className={`flex items-center gap-2 mb-8 text-sm opacity-60 hover:opacity-100 transition-opacity ${theme.text}`}>
            <ArrowLeft className="w-4 h-4" /> Retour au catalogue
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className={`rounded-3xl overflow-hidden ${theme.border} border`}>
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-auto object-cover" />
              </div>
              <div className={`grid grid-cols-3 gap-4 ${theme.cardBg} p-6 rounded-3xl ${theme.border} border`}>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Année</p>
                  <p className={`font-bold ${theme.text}`}>{vehicle.year}</p>
                </div>
                <div className="text-center border-x border-white/10">
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Catégorie</p>
                  <p className={`font-bold ${theme.text}`}>{vehicle.category}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Note</p>
                  <p className={`font-bold ${theme.text} flex items-center justify-center gap-1`}>
                    <Star className={`w-3 h-3 fill-current ${theme.accent}`} /> {vehicle.rating}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h1 className={`text-5xl font-bold mb-4 ${theme.text} font-serif`}>{vehicle.brand} {vehicle.model}</h1>
                <p className={`text-2xl font-bold ${theme.accent}`}>{vehicle.price}</p>
              </div>
              <div className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-4`}>
                <h3 className={`text-lg font-bold ${theme.text} font-serif`}>L'expérience</h3>
                <p className={`opacity-70 leading-relaxed ${theme.text}`}>{vehicle.description}</p>
                <ul className={`grid grid-cols-2 gap-3 py-4 border-t ${theme.border} border`}>
                  {vehicle.specs.map((spec, i) => (
                    <li key={i} className={`text-sm flex items-center gap-2 ${theme.text}`}>
                      <ShieldCheck className={`w-4 h-4 ${theme.accent}`} /> {spec}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setBookingStep(1)}
                  className={`w-full py-5 rounded-full font-bold uppercase tracking-widest transition-all transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText} text-lg`}
                >
                  Réserver ce véhicule
                </button>
                <p className={`text-center text-xs opacity-40 ${theme.text}`}>
                  Paiement sécurisé via Stripe. Demande soumise au propriétaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-24 pb-20 px-6 min-h-screen ${theme.bg}`}>
      <div className="max-w-xl mx-auto">
        <button onClick={() => setBookingStep(0)} className={`flex items-center gap-2 mb-8 text-sm opacity-60 hover:opacity-100 transition-opacity ${theme.text}`}>
          <ArrowLeft className="w-4 h-4" /> Retour aux détails
        </button>
        <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border shadow-2xl`}>
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${bookingStep >= step ? theme.accentBg + ' ' + theme.buttonText : 'bg-gray-800 text-gray-500'}`}
              >
                {step}
              </div>
            ))}
          </div>

          {bookingStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className={`w-5 h-5 ${theme.accent}`} />
                <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Date & Heure</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Date</label>
                  <input 
                    type="date" 
                    className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none`}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Heure</label>
                  <input 
                    type="time" 
                    className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none`}
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <button 
                disabled={!formData.date || !formData.time}
                onClick={() => setBookingStep(2)}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${theme.buttonBg} ${theme.buttonText} disabled:opacity-50`}
              >
                Continuer
              </button>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className={`w-5 h-5 ${theme.accent}`} />
                <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Lieux du trajet</h3>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 ${theme.text}`} />
                  <input 
                    placeholder="Lieu de départ" 
                    className={`w-full p-4 pl-12 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none`}
                    value={formData.pickup}
                    onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 ${theme.text}`} />
                  <input 
                    placeholder="Destination" 
                    className={`w-full p-4 pl-12 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none`}
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setBookingStep(1)} className={`flex-1 py-4 rounded-xl font-bold opacity-60 ${theme.text} border ${theme.border} border`}>Retour</button>
                <button 
                  disabled={!formData.pickup || !formData.destination}
                  onClick={() => setBookingStep(3)} 
                  className={`flex-[2] py-4 rounded-xl font-bold uppercase tracking-widest ${theme.buttonBg} ${theme.buttonText} disabled:opacity-50`}
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className={`w-5 h-5 ${theme.accent}`} />
                <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Confirmation & Paiement</h3>
              </div>
              <div className={`p-4 rounded-2xl ${theme.cardBg} ${theme.border} border space-y-3`}>
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Véhicule</span>
                  <span className={theme.text}>{vehicle.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-50">Trajet</span>
                  <span className={theme.text}>{formData.pickup} $\rightarrow$ {formData.destination}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-3 mt-3">
                  <span className="font-bold">Total Estimé</span>
                  <span className={`font-bold text-lg ${theme.accent}`}{(vehicle.priceNum * 1.2).toFixed(2)} €</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 italic">
                Une caution sera également pré-autorisée sur votre carte bancaire lors de la confirmation du propriétaire.
              </div>
              <button 
                disabled={loading}
                onClick={handleConfirmBooking}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest ${theme.buttonBg} ${theme.buttonText} flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Payer et Envoyer la demande'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
