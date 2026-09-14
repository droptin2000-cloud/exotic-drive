"use client";
import React, { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes';
import { User, Shield, Mail, Phone, Edit3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminUsersPage() {
  const theme = THEMES.heritage;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

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
          <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Gestion des Utilisateurs</h1>
          <p className={`opacity-60 ${theme.text}`}>Administrez les accès et les rôles des membres.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {users.length === 0 ? (
          <div className={`p-20 rounded-3xl ${theme.cardBg} ${theme.border} border text-center space-y-6`}>
            <div className={`w-20 h-20 rounded-full ${theme.bg} flex items-center justify-center mx-auto border ${theme.border} border opacity-20`}>
              👤
            </div>
            <div className={`text-center ${theme.text}`}>
              <h3 className="text-xl font-bold font-serif">Aucun utilisateur trouvé</h3>
              <p className="opacity-60">L'liste des utilisateurs est vide.</p>
            </div>
          </div>
        ) : (
          <div className={`rounded-3xl ${theme.cardBg} ${theme.border} border overflow-hidden`}>
            <table className={`w-full text-left border-collapse`}>
              <thead>
                <tr className={`border-b ${theme.border} border opacity-50 text-[10px] uppercase tracking-widest`}>
                  <th className={`p-6 ${theme.text}`}>Utilisateur</th>
                  <th className={`p-6 ${theme.text}`}>Rôle</th>
                  <th className={`p-6 ${theme.text}`}>Contact</th>
                  <th className={`p-6 text-right ${theme.text}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className={`border-b ${theme.border} border transition-all hover:bg-white/5 ${theme.text}`}>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center border ${theme.border} border font-bold`}>
                          {user.full_name?.[0] || 'U'}
                        </div>
                        <span className="font-medium">{user.full_name}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${user.role === 'admin' ? 'text-purple-400 bg-purple-400/10 border-purple-400/30' : user.role === 'owner' ? 'text-blue-400 bg-blue-400/10 border-blue-400/30' : 'text-gray-400 bg-gray-400/10 border-gray-400/30'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1 text-xs opacity-60">
                        <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {user.email || 'Non renseigné'}</span>
                        <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {user.phone || 'Non renseigné'}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className={`p-2 rounded-lg ${theme.bg} ${theme.border} border ${theme.text} hover:bg-white/10 transition-all`}>
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
