"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Camera, Sparkles, Check, Loader2, IndianRupee } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [image, setImage] = useState<string | null>(null);
  
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAiPrice = async () => {
    if (!cropName) return;
    setLoadingPrice(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/ai/price-suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropName, quantity, location: 'India' }),
      });
      const json = await res.json();
      if (json.success) {
        setAiMessage(json.data.suggestion || json.data.suggestedPrice);
        if (json.data.suggestedPrice) {
          setPrice(json.data.suggestedPrice.toString());
        }
      }
    } catch (error) {
      console.error('Price suggestion error:', error);
    }
    setLoadingPrice(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !price || !quantity) return;
    
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: cropName,
          category,
          price: Number(price),
          quantityAvailable: Number(quantity),
          description,
          images: image ? [image] : []
        }),
      });
      
      const json = await res.json();
      if (json.success) {
        router.push('/marketplace');
      }
    } catch (error) {
      console.error('Add product error:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="glass sticky top-0 z-40 px-6 pt-10 pb-6 border-b border-slate-200/50 flex items-center">
        <Link href="/dashboard" className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50 active:scale-90 transition-transform">
          <ChevronLeft size={20} strokeWidth={3} />
        </Link>
        <div className="ml-4">
           <h1 className="text-xl font-black text-slate-900 tracking-tight">नई फसल जोड़ें</h1>
           <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest">Marketplace Listing</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Photo Upload Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">फसल की फोटो</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video w-full rounded-[32px] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group relative ${
              image ? 'border-brand-500 bg-white shadow-xl' : 'border-slate-300 bg-slate-50 hover:bg-brand-50/30 hover:border-brand-400'
            }`}
          >
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center transition-transform group-hover:scale-110">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-brand-600 mb-3 border border-slate-100">
                  <Camera size={28} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">फोटो खींचें या अपलोड करें</p>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">फसल का नाम</label>
            <div className="glass bg-white/50 rounded-2xl border border-white/50 shadow-inner px-5">
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="उदा. गेहूं, चावल, टमाटर"
                className="w-full bg-transparent border-none py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">मात्रा (किलो)</label>
              <div className="glass bg-white/50 rounded-2xl border border-white/50 shadow-inner px-5">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent border-none py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">दाम (₹/किलो)</label>
              <div className="glass bg-white/50 rounded-2xl border border-white/50 shadow-inner px-5 flex items-center">
                <IndianRupee size={16} className="text-slate-300 mr-2" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent border-none py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* AI Helper */}
          <button
            type="button"
            onClick={getAiPrice}
            disabled={loadingPrice || !cropName}
            className="w-full flex items-center justify-center space-x-2 p-5 bg-indigo-50 text-indigo-600 rounded-[24px] border border-indigo-100 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-900/5 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale group"
          >
            {loadingPrice ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                <span>AI से सही दाम पूछें</span>
              </>
            )}
          </button>

          {aiMessage && (
            <div className="p-5 bg-brand-50 rounded-[24px] border border-brand-100 flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
              <div className="bg-brand-100 p-1.5 rounded-full text-brand-700 mt-0.5">
                <Check size={14} strokeWidth={4} />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest">AI सुझाव</p>
                 <p className="text-sm font-bold text-brand-900 leading-tight">{aiMessage}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">विवरण (वैकल्पिक)</label>
            <div className="glass bg-white/50 rounded-2xl border border-white/50 shadow-inner px-5">
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="फसल की गुणवत्ता के बारे में बताएं..."
                className="w-full bg-transparent border-none py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0 resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </form>

      {/* Floating Submit Button Area */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 z-40">
        <div className="glass shadow-2xl shadow-slate-200/50 rounded-[32px] p-2 border border-white/50 bg-white/70">
          <button
            onClick={handleSubmit}
            disabled={submitting || !cropName || !price || !quantity}
            className="btn-premium w-full py-5 rounded-[24px] text-white font-black text-lg shadow-xl shadow-brand-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center"
          >
            {submitting ? <Loader2 className="animate-spin mr-2" /> : 'फसल दर्ज करें'}
          </button>
        </div>
      </div>
    </div>
  );
}
