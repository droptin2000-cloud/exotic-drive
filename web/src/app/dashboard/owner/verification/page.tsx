"use client";
import React, { useState, useEffect } from 'react';
import { THEMES } from '@/constants/themes';
import { ShieldCheck, Upload, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function OwnerVerificationPage() {
  const theme = THEMES.heritage;
  const [loading, setLoading] = useState(false);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVerifications() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('verifications')
          .select('*')
          .eq('owner_id', user.id);

        if (error) throw error;
        setVerifications(data || []);
      } catch (err) {
        console.error("Error fetching verifications:", err);
      }
    }
    fetchVerifications();
  }, []);

  const handleFileUpload = async (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(docType);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `verifications/${user.id}/${docType}_${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Insert record into verifications table
      const { error: dbError } = await supabase
        .from('verifications')
        .insert([
          { 
            owner_id: user.id, 
            doc_type: docType, 
            url: filePath, 
            status: 'PENDING' 
          }
        ]);

      if (dbError) throw dbError;
      
      // Refresh list
      const { data } = await supabase
        .from('verifications')
        .select('*')
        .eq('owner_id', user.id);
      setVerifications(data || []);

      alert(`${docType} envoyé avec succès !`);
    } catch (err: any) {
      alert("Erreur lors de l'upload : " + err.message);
    } finally {
      setUploading(null);
    }
  };

  const docTypes = [
    { id: 'ID', label: 'Pièce d\'identité', desc: 'Passeport ou Carte d\'identité valide' },
    { id: 'REGISTRATION', label: 'Carte Grise', desc: 'Justificatif de propriété du véhicule' },
    { id: 'INSURANCE', label: 'Assurance', desc: 'Attestation d\'assurance usage commercial/location' },
    { id: 'LICENSE', label: 'Permis de conduire', desc: 'Permis valide correspondant au véhicule' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Vérification du Compte</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className={`w-6 h-6 ${theme.accent}`} />
              <h2 className={`text-xl font-bold ${theme.text} font-serif`}>Documents Requis</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {docTypes.map((doc) => {
                const existingDoc = verifications.find(v => v.doc_type === doc.id);
                return (
                  <div key={doc.id} className={`p-6 rounded-2xl ${theme.bg} ${theme.border} border space-y-4 transition-all ${existingDoc ? 'opacity-80' : 'hover:bg-white/5'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-bold ${theme.text}`}>{doc.label}</h3>
                        <p className="text-xs opacity-50 mt-1">{doc.desc}</p>
                      </div>
                      {existingDoc && getStatusIcon(existingDoc.status)}
                    </div>
                    
                    {!existingDoc ? (
                      <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed ${theme.border} border cursor-pointer transition-all hover:bg-white/5 ${theme.text} text-xs font-bold uppercase tracking-widest`}>
                        {uploading === doc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading === doc.id ? 'Envoi...' : 'Uploader'}
                        <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(doc.id, e)} />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-xs opacity-60">Document reçu</span>
                        <button 
                          onClick={async () => {
                            // Simple delete for demo
                            const { error } = await supabase.from('verifications').delete().eq('id', existingDoc.id);
                            if (error) alert(error.message);
                            else {
                              setVerifications(verifications.filter(v => v.id !== existingDoc.id));
                            }
                          }}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Remplacer
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
            <h3 className={`text-xl font-bold ${theme.text} font-serif`}>Statut Global</h3>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">En attente</p>
                <p className="text-xs opacity-50">Votre dossier est en cours d'examen.</p>
              </div>
            </div>
            <p className={`text-xs opacity-40 leading-relaxed ${theme.text}`}>
              L'équipe ExoticDrive vérifie manuellement chaque document pour garantir la sécurité de la marketplace. Délai moyen : 24-48h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
