"use client";
import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Loader2, Filter } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('सभी');

  const categories = ['सभी', 'सब्जियां', 'अनाज', 'फल', 'अन्य'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/products`);
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Search Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 space-y-6">
          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">बाज़ार</h1>
          <button className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50">
            <Filter size={20} />
          </button>
        </div>
        
        <div className="flex space-x-3">
          <div className="flex-1 glass bg-white/50 rounded-2xl flex items-center px-5 space-x-3 border border-white/50 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all shadow-inner">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="फसल खोजें..." 
              className="bg-transparent border-none w-full py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
            />
          </div>
          <button className="btn-premium px-5 rounded-2xl text-white shadow-lg shadow-brand-900/20 active:scale-90 transition-transform">
            <SlidersHorizontal size={20} strokeWidth={2.5} />
          </button>
        </div>
          </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 pt-6 space-y-8">
        {/* Horizontal Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-xl scale-105' 
                : 'glass bg-white text-slate-400 border border-white/50 hover:bg-white hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <section>
          <div className="flex justify-between items-center mb-6 px-1">
             <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">आपके लिए सिफारिशें</h2>
             <span className="text-[10px] font-black text-brand-700 uppercase tracking-widest">{products.length} परिणाम</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-100 border-t-brand-700 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-8 h-8 bg-brand-50 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">बाज़ार लोड हो रहा है...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 glass rounded-[32px] border border-white/50 space-y-6">
              <div className="w-24 h-24 bg-slate-100 rounded-[32px] mx-auto flex items-center justify-center text-5xl grayscale opacity-50">🧺</div>
              <div className="space-y-1">
                <p className="font-black text-slate-800 text-xl tracking-tight">कोई फसल नहीं मिली</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">कृपया अपनी खोज बदलें</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p) => (
                <ProductCard 
                  key={p._id}
                  id={p._id}
                  title={p.title}
                  price={p.price}
                  unit={p.unit || 'kg'}
                  quantity={p.quantityAvailable}
                  image={p.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400'}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
