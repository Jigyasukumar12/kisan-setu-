"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Camera, ChevronLeft, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Loader2, Image as ImageIcon, Zap } from 'lucide-react';

export default function DiseaseDetectionPage() {
  const [image, setImage] = useState<string | null>(null);
  const [cropName, setCropName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setResult(null);
    }
  };

  const detectDisease = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // In a real app, you would upload the file to S3/Cloudinary first
      // For this demo, we'll send a mock URL as the backend expects imageUrl
      const payloadUrl = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400"; 
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/ai/disease-detection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: payloadUrl, cropName }),
      });
      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      }
    } catch (error) {
      console.error('Detection error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-600 border border-white/50 active:scale-90 transition-transform">
            <ChevronLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center">
             <h1 className="text-xl font-black text-slate-900 tracking-tight">AI फसल डॉक्टर</h1>
             <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest">Smart Diagnostics</p>
          </div>
          <div className="w-10 h-10 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 border border-brand-200">
             <Zap size={20} fill="currentColor" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-6 space-y-8 flex-1">
        {/* Info Card */}
        <div className="glass bg-white p-5 rounded-[24px] border border-white/50 shadow-sm flex items-start space-x-4">
          <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shrink-0">
             <Sparkles size={24} />
          </div>
          <div className="space-y-1">
             <h3 className="font-black text-slate-800 text-sm">कैसे काम करता है?</h3>
             <p className="text-slate-500 text-xs leading-relaxed font-bold">अपनी फसल के पत्ते की एक साफ फोटो लें। हमारा AI तुरंत बीमारी और उसका समाधान बताएगा।</p>
          </div>
        </div>

        {/* Form & Scanner */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">फसल का नाम (वैकल्पिक)</label>
            <div className="glass bg-white/50 rounded-2xl border border-white/50 shadow-inner px-5 flex items-center">
               <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="उदा. टमाटर, आलू"
                className="w-full bg-transparent border-none py-4 font-black text-slate-800 placeholder:text-slate-300 focus:ring-0"
              />
            </div>
          </div>

          <div 
            className={`relative rounded-[40px] overflow-hidden border-2 border-dashed transition-all duration-500 aspect-square flex items-center justify-center cursor-pointer group ${
              image ? 'border-brand-500 bg-white shadow-2xl' : 'border-slate-300 bg-slate-50 hover:border-brand-400 hover:bg-brand-50/30'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <div className="relative w-full h-full">
                <img src={image} alt="Crop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                   <div className="glass px-4 py-2 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest border border-white/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">बदलें</div>
                </div>
                {loading && (
                   <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-1 bg-brand-400 absolute top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_20px_#22c55e]"></div>
                   </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-slate-300 group-hover:text-brand-500 group-hover:scale-110 transition-all duration-500 border border-slate-100">
                  <Camera size={40} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                   <p className="text-slate-800 font-black text-sm tracking-tight">फोटो खींचें या अपलोड करें</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Maximum 5MB • JPG, PNG</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <button
            onClick={detectDisease}
            disabled={loading || !image}
            className="btn-premium w-full text-white p-6 rounded-[24px] font-black text-xl shadow-2xl shadow-brand-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="animate-pulse">AI स्कैन कर रहा है...</span>
              </>
            ) : (
              <>
                <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
                <span>रोग की जांच करें</span>
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-10">
            <div className="flex justify-between items-center px-1 pt-4 border-t border-slate-100">
               <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">AI विश्लेषण रिपोर्ट</h2>
               <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest flex items-center">
                  <ShieldCheck size={12} className="mr-1" /> सत्यापित
               </span>
            </div>

            <div className={`rounded-[32px] p-8 border ${
              result.disease ? 'bg-red-50 border-red-100' : 'bg-brand-50 border-brand-100'
            }`}>
               <div className="flex items-center space-x-4 mb-6">
                  {result.disease ? (
                    <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                       <AlertCircle size={32} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
                       <CheckCircle2 size={32} />
                    </div>
                  )}
                  <div>
                     <h3 className={`text-2xl font-black tracking-tight ${result.disease ? 'text-red-900' : 'text-brand-900'}`}>
                        {result.disease || "फसल स्वस्थ है"}
                     </h3>
                     {result.confidence && (
                       <div className="flex items-center space-x-2 mt-1">
                          <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full ${result.disease ? 'bg-red-500' : 'bg-brand-500'}`}
                                style={{ width: `${result.confidence * 100}%` }}
                             ></div>
                          </div>
                          <span className="text-[10px] font-black text-slate-500">{(result.confidence * 100).toFixed(0)}% संभावना</span>
                       </div>
                     )}
                  </div>
               </div>

               <p className={`text-sm font-bold leading-relaxed ${result.disease ? 'text-red-700' : 'text-brand-700'}`}>
                  {result.analysis}
               </p>
            </div>

            {result.treatment && (
              <div className="glass bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                 <div className="flex items-center space-x-3 text-indigo-700">
                    <div className="p-2 bg-indigo-50 rounded-xl">
                       <Zap size={20} fill="currentColor" />
                    </div>
                    <h4 className="font-black text-lg tracking-tight">सुझाया गया उपचार</h4>
                 </div>
                 <p className="text-slate-600 text-sm font-bold leading-loose p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {result.treatment}
                 </p>
                 <button className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-900/10 active:scale-95 transition-all">
                    विशेषज्ञ से बात करें
                 </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>

      <nav className="fixed bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent">
        <div className="max-w-md mx-auto">
          <div className="glass shadow-2xl shadow-slate-200/50 rounded-[32px] px-6 py-3 flex justify-between items-center border border-white/50 bg-white/70">
             <Link href="/dashboard" className="btn-premium w-full py-4 rounded-2xl text-white font-black text-center shadow-lg">
                वापस होम पर जाएं
             </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
