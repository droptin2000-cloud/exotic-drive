"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { ShieldCheck, CheckCircle, XCircle, Loader2, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminVerificationsPage() {
  const theme = THEMES.heritage;
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVerifications() {
      try {
        const { data, error } = await supabase
          .from('verifications')
          .select('*, profiles(full_name)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setVerifications(data || []);
      } catch (err) {
        console.error("Error fetching verifications:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVerifications();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('verifications')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      
      // Refresh list
      const { data } = await supabase
        .from('verifications')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false });
      setVerifications(data || []);
      
      alert(`Document ${newStatus === 'VERIFIED' ? 'validé' : 'refusé'}.`);
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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Vérification des Documents</h1>
          <p className={`opacity-60 ${theme.text}`}>Validez les pièces d'identité et assurances des propriétaires.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {verifications.length === 0 ? (
          <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
            <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
              🛡️
            </div>
            <div className={`text-center ${theme.text}`}>
              <h3 className="text-xl font-bold font-serif">Aucun document en attente</h3>
              <p className="opacity-60">Tous les documents ont été traités.</p>
            </div>
          </div>
        ) : (
          verifications.map(verif => (
            <div key={verif.id} className={`p-6 rounded-3xl ${theme.cardBg} ${theme.border} border flex flex-col md:flex-row items-center gap-8 transition-all hover:bg-white/5`}>
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-800 flex items-center justify-center text-3xl">
                📄
              </div>
              <div className="flex-grow space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h3 className={`text-xl font-bold ${theme.text} font-serif`}>{verif.profiles?.full_name || 'Utilisateur Inconnu'}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${verif.status === 'VERIFIED' ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
                    {verif.status}
                  </span>
                </div>
                <p className={`opacity-60 text-sm ${theme.text}`}>
                  Document : {verif.doc_type} • Envoyé le {new Date(verif.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={`${supabase.storage.from('verifications').getPublicUrl(verif.url).data.publicUrl}`} 
                  target="_blank"
                  className={`p-3 rounded-xl ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10 transition-all`}
                  title="Voir le document"
                >
                  <FileText className="w-5 h-5" />
                </a>
                {verif.status === 'PENDING' && (
                  <>
                    <button 
                      onClick={() => updateStatus(verif.id, 'VERIFIED')}
                      className="p-3 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all" 
                      title="Valider"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => updateStatus(verif.id, 'REJECTED')}
                      className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all" 
                      title="Refuser"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
