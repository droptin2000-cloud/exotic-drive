"use client";
import React from 'react';
import Link from 'next/link';
import { THEMES } from '@/constants/themes';
import { LayoutDashboard, Calendar, History, LogOut, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const theme = THEMES.heritage;
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tableau de Bord', href: '/dashboard/customer', icon: LayoutDashboard },
    { name: 'Mes Réservations', href: '/dashboard/customer/bookings', icon: Calendar },
    { name: 'Historique', href: '/dashboard/customer/history', icon: History },
  ];

  return (
    <div className={`min-h-screen flex ${theme.bg} ${theme.text}`}>
      <aside className={`w-64 border-r ${theme.border} border flex flex-col transition-all duration-300 ${theme.cardBg}`}>
        <div className="p-6 mb-8">
          <div className={`text-xl font-bold tracking-tighter ${theme.accent} font-serif`}>
            EXOTIC<span className={theme.text}>DRIVE</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Espace Client</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? theme.accentBg + ' ' + theme.buttonText : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <Link href="/login" className={`flex items-center gap-3 p-3 rounded-xl text-sm opacity-60 hover:opacity-100 hover:bg-red-500/10 transition-all text-red-400`}>
            <LogOut className="w-5 h-5" />
            Déconnexion
          </Link>
        </div>
      </aside>

      <main className="flex-grow overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
