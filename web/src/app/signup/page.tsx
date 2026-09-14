"use client";
import React, { useState } from 'react';
import { THEMES } from '@/constants/themes';
import Link from 'next/link';
import { Mail, Lock, User, Car, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const theme = THEMES.heritage;
  const [role, setRole] = useState<'customer' | 'owner'>('customer');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create user in Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (data.user) {
        // 2. Create profile in the public.profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              full_name: formData.fullName, 
              role: role 
            }
          ]);

        if (profileError) throw profileError;
        
        alert("Compte créé avec succès ! Veuillez vérifier votre email pour confirmer l'inscription.");
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${theme.bg}`}>
      <div className={`w-full max-w-md p-8 rounded-3xl ${theme.cardBg} ${theme.border} border shadow-2xl`}>
        <div className="text-center mb-10">
          <h1 className={`text-3xl font-bold mb-2 ${theme.text} font-serif`}>Rejoignez-nous</h1>
          <p className={`opacity-60 ${theme.text}`}>Créez votre compte pour accéder à l'exception</p>
        </div>

        <div className="flex p-1 rounded-xl bg-black/30 mb-8 border border-white/10">
          <button 
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === 'customer' ? theme.buttonBg + ' ' + theme.buttonText : 'opacity-50 text-gray-400'}`}
          >
            Client
          </button>
          <button 
            onClick={() => setRole('owner')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === 'owner' ? theme.buttonBg + ' ' + theme.buttonText : 'opacity-50 text-gray-400'}`}
          >
            Propriétaire
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-xs text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Nom complet</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 ${theme.text}`} />
              <input 
                required
                type="text" 
                placeholder="Jean Dupont" 
                className={`w-full p-4 pl-12 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Email</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 ${theme.text}`} />
              <input 
                required
                type="email" 
                placeholder="email@exemple.com" 
                className={`w-full p-4 pl-12 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-xs uppercase tracking-widest opacity-50 ${theme.text}`}>Mot de passe</label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 ${theme.text}`} />
              <input 
                required
                type="password" 
                placeholder="••••••••" 
                className={`w-full p-4 pl-12 rounded-xl border ${theme.border} border ${theme.bg} ${theme.text} focus:ring-2 focus:ring-heritage-gold outline-none transition-all`}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {role === 'owner' && (
            <div className="p-4 rounded-xl bg-heritage-gold/10 border border-heritage-gold/20 space-y-2 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-heritage-gold font-bold text-xs uppercase tracking-widest">
                <Car className="w-4 h-4" /> Information Propriétaire
              </div>
              <p className="text-xs opacity-60 text-heritage-text">
                Vous devrez fournir vos documents d'assurance et d'identité après l'inscription pour valider vos véhicules.
              </p>
            </div>
          )}

          <button 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.buttonBg} ${theme.buttonText} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Créer mon compte'}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${theme.text}`}>
          <span className="opacity-60">Déjà membre ? </span>
          <Link href="/login" className={`font-bold ${theme.accent} hover:underline`}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
