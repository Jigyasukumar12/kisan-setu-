"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Phone, ArrowRight, Loader2, ShieldCheck, User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setError('कृपया सही मोबाइल नंबर डालें');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const json = await res.json();
      
      if (json.success) {
        // After registration, redirect to login or auto-login
        router.push('/');
      } else {
        setError(json.message || 'पंजीकरण विफल रहा');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('सर्वर से कनेक्ट करने में असमर्थ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-200 rounded-full blur-[120px] opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 btn-premium rounded-[24px] shadow-xl flex items-center justify-center text-white mb-4 animate-float">
            <Leaf size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">नया खाता बनाएँ</h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2 text-center">Join the KisanSetu Community</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleRegister} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">पूरा नाम</label>
            <div className="relative group">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="उदा. रामलाल जी"
                className="w-full glass border-white/50 rounded-2xl p-5 pl-12 text-sm font-black text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-inner"
              />
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">मोबाइल नंबर</label>
            <div className="relative group">
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                placeholder="अपना नंबर दर्ज करें"
                className="w-full glass border-white/50 rounded-2xl p-5 pl-12 text-sm font-black text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-inner"
              />
              <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">पासवर्ड</label>
            <div className="relative group">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="कम से कम 6 अक्षर"
                className="w-full glass border-white/50 rounded-2xl p-5 pl-12 text-sm font-black text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-inner"
              />
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">आप कौन हैं?</label>
            <div className="flex space-x-3">
              {['farmer', 'buyer'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`flex-1 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    formData.role === r 
                    ? 'bg-slate-900 text-white shadow-xl scale-105' 
                    : 'glass bg-white text-slate-400 border border-white/50'
                  }`}
                >
                  {r === 'farmer' ? 'किसान' : 'खरीददार'}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full text-white p-5 rounded-2xl font-black text-lg shadow-2xl shadow-brand-900/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>रजिस्टर करें</span>
                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            पहले से खाता है? <Link href="/" className="text-brand-700 underline underline-offset-4 decoration-2">लॉगिन करें</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
