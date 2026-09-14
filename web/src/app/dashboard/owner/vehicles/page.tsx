"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Car, Plus, Eye, Edit3, Trash2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function OwnerVehiclesPage() {
  const theme = THEMES.heritage;
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('vehicles')
          .select('*, vehicle_photos(url, is_main)')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setVehicles(data || []);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const getStatusBadge = (status: string) => {
    const styles: any = {
      APPROVED: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', label: 'Approuvé' },
      PENDING_REVIEW: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', label: 'En attente' },
      REJECTED: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', label: 'Refusé' },
      DRAFT: { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', label: 'Brouillon' },
      SUSPENDED: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', label: 'Suspendu' },
    };
    return styles[status] || styles.DRAFT;
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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Mes Véhicules</h1>
          <p className={`opacity-60 ${theme.text}`}>Gérez votre collection et suivez vos validations.</p>
        </div>
        <Link 
          href="/dashboard/owner/vehicles/add" 
          className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText}`}
        >
          + Ajouter un véhicule
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
          <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border`}>
            <Car className={`w-10 h-10 opacity-20 ${theme.text}`} />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Aucun véhicule enregistré</h3>
            <p className={`opacity-60 ${theme.text} max-w-xs mx-auto`}>Commencez par ajouter votre première voiture pour la rendre disponible à la location.</p>
          </div>
          <Link 
            href="/dashboard/owner/vehicles/add" 
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs ${theme.buttonBg} ${theme.buttonText}`}
          >
            Ajouter maintenant
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {vehicles.map(vehicle => {
            const status = getStatusBadge(vehicle.status);
            const mainPhoto = vehicle.vehicle_photos?.find((p: any) => p.is_main)?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=200';
            
            return (
              <div key={vehicle.id} className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center gap-8 transition-all hover:bg-white/5`}>
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <img src={mainPhoto} className="w-full h-full object-cover" alt={vehicle.model} />
                </div>
                
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h3 className={`text-2xl font-bold ${theme.text} font-serif`}>{vehicle.brand} {vehicle.model}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${status.border} ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className={`opacity-60 text-sm ${theme.text}`}>
                    Année {vehicle.year} • {vehicle.category} • {vehicle.price_per_hour}€ / h
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className={`p-3 rounded-xl ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10 transition-all`} title="Voir la fiche">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className={`p-3 rounded-xl ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10 transition-all`} title="Modifier">
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button className={`p-3 rounded-xl ${theme.bg} ${theme.border} border text-red-400 hover:bg-red-500/10 transition-all`} title="Supprimer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
