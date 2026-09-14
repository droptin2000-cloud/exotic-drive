"use client";
import React, { useState } from 'react';
import { THEMES } from '@/constants/themes';
import Link from 'next/link';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const theme = THEMES.heritage;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      
      alert("Connexion réussie !");
      router.push('/');
    } catch (err: any) {
      setError(err.message || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${theme.bg}`}>
      <div className={`w-full max-w-md p-8 rounded-3xl ${theme.cardBg} ${theme.border} border shadow-2xl`}>
        <div className="text-center mb-10">
          <h1 className={`text-3xl font-bold mb-2 ${theme.text} font-serif`}>Bon retour</h1>
          <p className={`opacity-60 ${theme.text}`}>Connectez-vous à votre compte ExoticDrive</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-xs text-center">
              {error}
            </div>
          )}

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

          <div className="flex justify-end">
            <a href="#" className={`text-xs opacity-60 hover:opacity-100 transition-opacity ${theme.text}`}>Mot de passe oublié ?</a>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.buttonBg} ${theme.buttonText} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se connecter'}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${theme.text}`}>
          <span className="opacity-60">Pas encore de compte ? </span>
          <Link href="/signup" className={`font-bold ${theme.accent} hover:underline`}>Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
