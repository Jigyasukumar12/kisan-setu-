"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, MapPin, Mail, Shield, LogOut, ChevronLeft, Edit2, Settings, History, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50 active:scale-90 transition-transform">
            <ChevronLeft size={20} strokeWidth={3} />
          </Link>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">मेरी प्रोफाइल</h1>
          <button className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Card */}
        <section className="relative group">
          <div className="absolute inset-0 bg-brand-800 rounded-[40px] blur-2xl opacity-10"></div>
          <div className="glass bg-white rounded-[40px] p-8 border border-white/50 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-[32px] bg-brand-100 border-4 border-white shadow-2xl overflow-hidden p-1">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=bbf7d0`} 
                    alt="Avatar" 
                    className="rounded-[24px] w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg active:scale-90 transition-transform">
                  <Edit2 size={16} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-brand-100 text-brand-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-brand-200">
                    {user.role === 'farmer' ? 'किसान' : 'खरीददार'}
                  </span>
                  <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-200">
                    प्रीमियम सदस्य
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-slate-400 pt-2">
                  <MapPin size={14} className="text-brand-600" />
                  <span className="text-xs font-bold">{user.location?.city || 'हमीरपुर'}, {user.location?.state || 'उत्तर प्रदेश'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">संपर्क विवरण</h3>
             <div className="space-y-3">
               <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm"><Phone size={18} /></div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">मोबाइल नंबर</p>
                    <p className="text-sm font-black text-slate-800">{user.phone}</p>
                 </div>
               </div>
               <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm"><Mail size={18} /></div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">ईमेल</p>
                    <p className="text-sm font-black text-slate-800">{user.email}</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="glass bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">खाता सुरक्षा</h3>
             <div className="space-y-3">
               <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm"><Shield size={18} /></div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Kyc स्थिति</p>
                    <p className="text-sm font-black text-green-600">सत्यापित (Verified)</p>
                 </div>
               </div>
               <button className="w-full p-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg">
                 पासवर्ड बदलें
               </button>
             </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="glass bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {[
              { icon: History, label: 'पुराने लेन-देन', color: 'text-blue-500' },
              { icon: HelpCircle, label: 'सहायता केंद्र', color: 'text-purple-500' },
            ].map((item, idx) => (
              <button key={idx} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon size={22} />
                  </div>
                  <span className="font-black text-slate-700">{item.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                   <ChevronLeft size={16} className="rotate-180" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full p-6 glass bg-red-50 text-red-600 rounded-[32px] border border-red-100 font-black text-lg flex items-center justify-center space-x-3 shadow-sm hover:bg-red-100 transition-all active:scale-95"
        >
          <LogOut size={22} />
          <span>लॉगआउट करें</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
