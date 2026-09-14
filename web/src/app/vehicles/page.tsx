"use client";
import React from 'react';
import VehicleCard from '@/components/VehicleCard';
import { THEMES } from '@/constants/themes';

export default function VehiclesPage() {
  const theme = THEMES.heritage;

  return (
    <div className={`pt-24 pb-20 px-6 min-h-screen ${theme.bg} animate-fade-in`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h1 className={`text-4xl font-bold ${theme.text} font-serif`}>Notre Collection</h1>
            <p className={`opacity-60 mt-2 ${theme.text}`}>Découvrez des véhicules d'exception pour vos expériences.</p>
          </div>
          <div className={`flex gap-4 ${theme.text} animate-fade-in`} style={{ animationDelay: '200ms' }}>
            <button className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border ${theme.border} border ${theme.accentBg} ${theme.buttonText} font-bold`}>Toutes</button>
            <button className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border ${theme.border} border opacity-60 hover:opacity-100 transition-opacity`}>Sport</button>
            <button className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border ${theme.border} border opacity-60 hover:opacity-100 transition-opacity`}>Classiques</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_VEHICLES.map((car, i) => (
            <div key={car.id} className="animate-fade-in" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
              <VehicleCard vehicle={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCK_VEHICLES = [
  { id: '1', brand: 'Porsche', model: '911 Carrera S', year: 2023, category: 'Sport', price: '250€ / h', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
  { id: '2', brand: 'Mercedes-Benz', model: '300 SL Gullwing', year: 1954, category: 'Classic', price: '400€ / h', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800', rating: 5.0 },
  { id: '3', brand: 'Ferrari', model: 'F40', year: 1987, category: 'Iconic', price: '600€ / h', image: 'https://images.unsplash.com/photo-1592198084033-a99a5f2a6a6e?auto=format&fit=crop&q=80&w=800', rating: 5.0 },
  { id: '4', brand: 'Aston Martin', model: 'DB5', year: 1964, category: 'Classic', price: '450€ / h', image: 'https://images.unsplash.com/photo-1544636331-76516756a74f?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: '5', brand: 'Lamborghini', model: 'Aventador', year: 2020, category: 'Supercar', price: '500€ / h', image: 'https://images.unsplash.com/photo-1525609004556-c46f998ecx81?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: '6', brand: 'Jaguar', model: 'E-Type', year: 1961, category: 'Classic', price: '300€ / h', image: 'https://images.unsplash.com/photo-1552519507-da3b1425766d?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
];
