"use client";
import React from 'react';
import Link from 'next/link';
import { Star, ChevronRight } from 'lucide-react';
import { THEMES } from '@/constants/themes';

interface VehicleCardProps {
  vehicle: {
    id: string;
    brand: string;
    model: string;
    year: number;
    category: string;
    price: string;
    image: string;
    rating: number;
  };
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const theme = THEMES.heritage;

  return (
    <Link 
      href={`/vehicles/${vehicle.id}`}
      className={`group block transition-all duration-300 ${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={vehicle.image} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt={`${vehicle.brand} ${vehicle.model}`} 
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${theme.accentBg} ${theme.buttonText}`}>
          {vehicle.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-bold ${theme.text} font-serif`}>{vehicle.brand} {vehicle.model}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className={`w-4 h-4 fill-current ${theme.accent}`} />
            <span className={theme.text}>{vehicle.rating}</span>
          </div>
        </div>
        <p className={`text-sm opacity-60 mb-6 ${theme.text}`}>Année {vehicle.year} • État Concours</p>
        <div className="flex justify-between items-center">
          <span className={`text-lg font-bold ${theme.accent}`}>{vehicle.price}</span>
          <div className={`p-2 rounded-full ${theme.accentBg} ${theme.buttonText} transition-transform group-hover:rotate-12`}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
