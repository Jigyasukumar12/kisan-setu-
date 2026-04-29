import React from 'react';
import { Home, ShoppingBag, MessageSquare, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'होम', icon: Home, href: '/dashboard' },
    { label: 'बाज़ार', icon: ShoppingBag, href: '/marketplace' },
    { label: 'AI डॉक्टर', icon: Sparkles, href: '/disease-detect' },
    { label: 'चैट', icon: MessageSquare, href: '/chat' },
    { label: 'प्रोफ़ाइल', icon: User, href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full p-6 z-50 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent">
      <div className="max-w-md mx-auto glass shadow-2xl shadow-slate-200/50 rounded-[32px] px-6 py-3 flex justify-between items-center border border-white/50 bg-white/70">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'bg-brand-800 text-white shadow-lg shadow-brand-900/20' : 'text-slate-600'
              }`}>
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                isActive ? 'text-brand-800' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
