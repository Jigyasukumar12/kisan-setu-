"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Phone, ArrowRight, Loader2, ShieldCheck, Globe } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('कृपया सही मोबाइल नंबर डालें');
      return;
    }
    if (password.length < 4) {
      setError('कृपया पासवर्ड डालें (कम से कम 4 अक्षर)');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      
      const json = await res.json();
      
      if (json.success) {
        localStorage.setItem('user', JSON.stringify(json.data));
        router.push('/dashboard');
      } else {
        setError(json.message || 'लॉगिन विफल रहा');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('सर्वर से कनेक्ट करने में असमर्थ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Language Switcher */}
        <div className="absolute top-[-120px] right-0">
          <button className="glass px-4 py-2 rounded-2xl flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-600 border border-white/50">
            <Globe size={14} className="text-brand-600" />
            <span>English / हिंदी</span>
          </button>
        </div>

        {/* Logo Section */}
        <div className="mb-14 flex flex-col items-center">
          <div className="w-24 h-24 btn-premium rounded-[32px] shadow-2xl shadow-brand-900/30 flex items-center justify-center text-white mb-8 animate-float relative">
             <div className="absolute inset-2 border-2 border-white/20 rounded-[24px]"></div>
            <Leaf size={44} fill="currentColor" className="drop-shadow-lg" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">किसान सेतु</h1>
            <p className="text-brand-700 font-black uppercase tracking-[0.3em] text-[10px] italic opacity-80">Empowering Rural India</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="w-full space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">मोबाइल नंबर</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-600/5 rounded-2xl blur-xl group-focus-within:bg-brand-600/10 transition-colors"></div>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="अपना नंबर दर्ज करें"
                  className={`w-full glass border-white/50 rounded-2xl p-6 pl-14 text-2xl font-black text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-inner ${error ? 'border-red-500' : ''}`}
                />
                <Phone size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              </div>
            </div>
            <div className="flex justify-between items-end px-1 pt-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">पासवर्ड</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-600/5 rounded-2xl blur-xl group-focus-within:bg-brand-600/10 transition-colors"></div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="अपना पासवर्ड डालें"
                  className="w-full glass border-white/50 rounded-2xl p-6 pl-14 text-xl font-black text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-inner"
                />
                <ShieldCheck size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              </div>
            </div>
            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || phone.length < 10}
            className="btn-premium w-full text-white p-6 rounded-2xl font-black text-xl shadow-2xl shadow-brand-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>लॉगिन करें</span>
                <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2 text-slate-400">
            <ShieldCheck size={16} className="text-brand-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">100% सुरक्षित और सुरक्षित</span>
          </div>
          
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center leading-loose">
            खाता नहीं है? <Link href="/register" className="text-brand-700 underline underline-offset-4 decoration-2">नया खाता बनाएँ</Link> <br />
            लॉगिन करके आप हमारी <span className="text-brand-700 underline underline-offset-4 decoration-2">नियमों और शर्तों</span> को स्वीकार करते हैं
          </p>
        </div>
      </div>
    </div>
  );
}
