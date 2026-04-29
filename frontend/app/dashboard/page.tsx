"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Wallet, TrendingUp, Search, Bell, Sparkles, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userName = user?.name || 'रामलाल जी';
  const userLocation = user?.location?.city ? `${user.location.city}, ${user.location.state}` : 'हमीरपुर, उत्तर प्रदेश';

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex justify-between items-center">
          <Link href="/profile" className="flex-1 flex justify-between items-center group">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2 text-slate-500">
                <MapPin size={12} className="text-brand-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">{userLocation}</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center group-hover:text-brand-700 transition-colors">
                नमस्ते, {userName} <span className="ml-2 animate-float">🌾</span>
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 border-2 border-white shadow-md overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}&backgroundColor=bbf7d0`} 
                  alt="Avatar" 
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>
          <button className="ml-3 w-10 h-10 glass shadow-sm rounded-2xl flex items-center justify-center text-slate-600 relative active:scale-90 transition-transform">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Wallet & AI */}
          <div className="lg:col-span-8 space-y-8">
            {/* Wallet & Stats */}
        <section className="relative group">
          <div className="absolute inset-0 bg-brand-800 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="btn-premium rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-900/20">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center space-x-2 text-brand-100/80 mb-1">
                    <Wallet size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">कुल कमाई</span>
                  </div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-5xl font-black tracking-tighter">₹45,800</span>
                    <div className="bg-brand-400/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black flex items-center border border-white/10">
                      <TrendingUp size={10} className="mr-1" /> +12%
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Calendar size={20} />
                </div>
              </div>

              <Link 
                href="/add-product" 
                className="bg-white text-brand-900 w-full py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
              >
                <Plus size={20} strokeWidth={3} />
                <span>नई फसल जोड़ें</span>
              </Link>
            </div>
          </div>
        </section>

            {/* AI Quick Access */}
            <section className="space-y-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">स्मार्ट टूल्स</h2>
              <Link 
                href="/disease-detect"
                className="block bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 rounded-[24px] p-1 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <div className="bg-slate-900/20 backdrop-blur-sm rounded-[22px] p-5 flex items-center justify-between text-white relative overflow-hidden group">
                  <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Sparkles size={120} />
                  </div>
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Sparkles size={28} className="animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl leading-tight tracking-tight">AI फसल डॉक्टर</h3>
                      <p className="text-indigo-100/70 text-xs font-bold uppercase tracking-wider">बीमारी का पता लगाएं</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            </section>
          </div>

          {/* Right Column: Listings */}
          <div className="lg:col-span-4 space-y-8">
            {/* My Listings Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">मेरी फसलें</h2>
                <Link href="/marketplace" className="text-brand-700 text-[10px] font-black flex items-center uppercase tracking-widest hover:underline">
                  सब देखें <ChevronRight size={12} className="ml-0.5" />
                </Link>
              </div>

              <div className="grid gap-4">
                {[
                  { id: 1, name: 'ताजा गेहूं (Sonalika)', price: '₹25', unit: 'kg', stock: '500 kg', status: 'Active', color: 'bg-amber-100 text-amber-700' },
                  { id: 2, name: 'जैविक टमाटर', price: '₹40', unit: 'kg', stock: '200 kg', status: 'Review', color: 'bg-red-100 text-red-700' },
                ].map((item) => (
                  <div key={item.id} className="glass bg-white p-5 rounded-[24px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group border border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {item.id === 1 ? '🌾' : '🍅'}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-black text-slate-800 tracking-tight">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-brand-800 font-black">{item.price}<span className="text-[10px] font-bold text-slate-400 ml-0.5">/{item.unit}</span></span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">{item.stock}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border border-current opacity-80`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
