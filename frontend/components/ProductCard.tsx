import React from 'react';
import { MapPin, MessageCircle, Heart, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  location?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, unit, quantity, image, location = "हमीरपुर" }) => {
  return (
    <div className="glass bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-xl text-[10px] font-black text-brand-800 uppercase tracking-widest border border-white/50">
          ताजा स्टॉक
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors border border-white/50">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <div className="glass px-2 py-1 rounded-lg flex items-center space-x-1 border border-white/50">
             <Star size={10} className="fill-brand-500 text-brand-500" />
             <span className="text-[10px] font-black text-slate-800">4.8</span>
           </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-1 mb-4">
          <h3 className="font-black text-slate-900 text-xl tracking-tight truncate">{title}</h3>
          <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest space-x-2">
            <div className="flex items-center space-x-1">
              <MapPin size={12} className="text-brand-600" />
              <span>{location}</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-brand-700">{quantity} {unit} बाकी</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-0.5">कीमत</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{price}</span>
              <span className="text-xs font-bold text-slate-400 ml-1">/{unit}</span>
            </div>
          </div>
          <Link 
            href="/chat" 
            className="btn-premium p-4 rounded-2xl text-white shadow-lg shadow-brand-900/20 active:scale-90 transition-all"
          >
            <MessageCircle size={22} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};
