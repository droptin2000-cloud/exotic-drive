"use client";
import React, { useState } from 'react';
import { THEMES } from '@/constants/themes';
import { Car, Image as ImageIcon, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddVehiclePage() {
  const theme = THEMES.heritage;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    category: 'SPORT',
    description: '',
    price: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...filesArray]);
      
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      // 2. Insert vehicle
      const { data: vehicle, error: vError } = await supabase
        .from('vehicles')
        .insert([
          {
            owner_id: user.id,
            brand: formData.brand,
            model: formData.model,
            year: parseInt(formData.year),
            category: formData.category,
            description: formData.description,
            price_per_hour: parseFloat(formData.price),
            status: 'PENDING_REVIEW'
          }
        ])
        .select()
        .single();

      if (vError) throw vError;

      // 3. Upload photos (Simplified for MVP)
      for (const photo of photos) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `vehicles/${vehicle.id}/${fileName}`;

        await supabase.storage.from('vehicles').upload(filePath, photo);
        
        await supabase.from('vehicle_photos').insert([
          { vehicle_id: vehicle.id, url: filePath, is_main: photos.indexOf(photo) === 0 }
        ]);
      }

      alert("Véhicule soumis avec succès ! Il sera visible dès validation par l'administrateur.");
      router.push('/dashboard/owner');
    } catch (err: any) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Ajouter un Véhicule</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
            <div className="flex items-center gap-3 mb-4">
              <Car className={`w-6 h-6 ${theme.accent}`} />
              <h2 className={`text-xl font-bold ${theme.text} font-serif`}>Informations Générales</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Marque</label>
                <input 
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`} 
                  placeholder="ex: Porsche"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Modèle</label>
                <input 
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`} 
                  placeholder="ex: 911 Carrera S"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Année</label>
                <input 
                  required
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`} 
                />
              </div>
              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Catégorie</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`}
                >
                  <option value="SPORT">Sport</option>
                  <option value="CLASSIC">Classique</option>
                  <option value="LUXURY">Luxe</option>
                  <option value="SUPERCAR">Supercar</option>
                  <option value="ICONIC">Iconique</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`} 
                placeholder="Décrivez l'expérience unique de conduit de ce véhicule..."
              />
            </div>
          </div>

          {/* Pricing */}
          <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className={`w-6 h-6 ${theme.accent}`} />
              <h2 className={`text-xl font-bold ${theme.text} font-serif`}>Tarification</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-grow space-y-2">
                <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Prix par heure (€)</label>
                <input 
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className={`w-full p-4 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`} 
                />
              </div>
              <div className="pt-6">
                <p className={`text-sm opacity-60 ${theme.text}`}>TVA incluse</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Photos Upload */}
          <div className={`p-8 rounded-3xl ${theme.cardBg} ${theme.border} border space-y-6`}>
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className={`w-6 h-6 ${theme.accent}`} />
              <h2 className={`text-xl font-bold ${theme.text} font-serif`}>Photos</h2>
            </div>
            
            <div 
              className={`border-2 border-dashed ${theme.border} border rounded-3xl p-12 text-center transition-all hover:bg-white/5 cursor-pointer relative overflow-hidden group`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <Upload className={`w-12 h-12 mx-auto mb-4 opacity-40 group-hover:opacity-100 transition-opacity ${theme.text}`} />
              <p className={`text-sm ${theme.text} opacity-60`}>Cliquez ou glissez vos photos ici</p>
              <p className="text-[10px] opacity-40 mt-2 uppercase tracking-widest">JPG, PNG max 5Mo</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {previewUrls.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={url} className="w-full h-full object-cover" alt="Preview" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const index = i;
                      setPhotos(prev => prev.filter((_, idx) => idx !== index));
                      setPreviewUrls(prev => prev.filter((_, idx) => idx !== index));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-5 rounded-full font-bold uppercase tracking-widest transition-all transform hover:scale-105 flex items-center justify-center gap-3 ${theme.buttonBg} ${theme.buttonText} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Soumettre le véhicule'}
          </button>
        </div>
      </form>
    </div>
  );
}
