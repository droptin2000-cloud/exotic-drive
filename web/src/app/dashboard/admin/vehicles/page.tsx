"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Eye, Edit3, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminVehiclesPage() {
  const theme = THEMES.heritage;
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*, vehicle_photos(url, is_main)')
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

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      
      // Refresh list
      const { data } = await supabase
        .from('vehicles')
        .select('*, vehicle_photos(url, is_main)')
        .order('created_at', { ascending: false });
      setVehicles(data || []);
      
      alert(`Véhicule ${newStatus === 'APPROVED' ? 'approuvé' : 'refusé'}.`);
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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Gestion des Véhicules</h1>
          <p className={`opacity-60 ${theme.text}`}>Examinez et validez les véhicules soumis par les propriétaires.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {vehicles.length === 0 ? (
          <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
            <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
              🚗
            </div>
            <div className={`text-center ${theme.text}`}>
              <h3 className="text-xl font-bold font-serif">Aucun véhicule à examiner</h3>
              <p className="opacity-60">Tous les véhicules ont été traités.</p>
            </div>
          </div>
        ) : (
          vehicles.map(vehicle => {
            const mainPhoto = vehicle.vehicle_photos?.find((p: any) => p.is_main)?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=200';
            
            return (
              <div key={vehicle.id} className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center gap-8 transition-all hover:bg-white/5`}>
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  <img src={mainPhoto} className="w-full h-full object-cover" alt={vehicle.model} />
                </div>
                
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h3 className={`text-2xl font-bold ${theme.text} font-serif`}>{vehicle.brand} {vehicle.model}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${vehicle.status === 'APPROVED' ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <p className={`opacity-60 text-sm ${theme.text}`}>
                    Propriétaire ID: {vehicle.owner_id.slice(0, 8)}... • {vehicle.category} • {vehicle.price_per_hour}€ / h
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {vehicle.status === 'PENDING_REVIEW' && (
                    <>
                      <button 
                        onClick={() => updateStatus(vehicle.id, 'APPROVED')}
                        className="p-3 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all" 
                        title="Approuver"
                      >
                        <CheckCircle className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => updateStatus(vehicle.id, 'REJECTED')}
                        className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all" 
                        title="Refuser"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  <button className={`p-3 rounded-xl ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10 transition-all`} title="Détails">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
