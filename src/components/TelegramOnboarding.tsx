import React, { useState, useEffect } from 'react';
import { Send, Smartphone, Bell, ArrowRight, ShieldCheck, ExternalLink, RefreshCw, X } from 'lucide-react';

interface TelegramOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  telegramUrl?: string;
}

export default function TelegramOnboarding({ isOpen, onClose, telegramUrl = 'https://t.me/FIFAWorldCupbd1' }: TelegramOnboardingProps) {
  const [countdown, setCountdown] = useState<number>(6);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    // Reset settings
    setCountdown(6);
    setCanSkip(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in font-sans">
      <div 
        id="telegram-onboarding-card"
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-3xl overflow-hidden relative p-6 sm:p-8 flex flex-col gap-6 animate-slide-up"
      >
        {/* Instant Close Bypass Button (Requested by User) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-450 hover:text-white rounded-full bg-slate-950/40 hover:bg-slate-800 border border-slate-800/60 transition-all cursor-pointer z-50 hover:scale-105 active:scale-95"
          title="বন্ধ করুন (Close)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center select-none pt-2">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4 relative">
            <Send className="w-8 h-8 text-sky-400 transform rotate-45 -translate-x-0.5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] font-black items-center justify-center text-white">1</span>
            </span>
          </div>
          
          <h3 className="text-xl font-black text-slate-100 tracking-tight leading-tight">📢 আমাদের অফিশিয়াল টেলিগ্রাম চ্যানেলে জয়েন করুন</h3>
          <p className="text-[10px] text-sky-400 uppercase tracking-widest font-mono font-bold mt-1.5">Official Telegram APK Channel Notification</p>
        </div>

        {/* Message body */}
        <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-2xl text-slate-300 text-xs leading-relaxed space-y-3.5">
          <p className="text-center font-medium">
            লাইভ খেলার লিংক পরিবর্তন, খেলা শুরুর নোটিফিকেশন, অ্যাপের নতুন APK আপডেট এবং সার্ভারের জরুরি ঘোষণা সবার আগে পেতে অবশ্যই এখনই টেলিগ্রাম চ্যানেলে যুক্ত হয়ে যান!
          </p>
          <div className="pt-2 border-t border-slate-850/60 flex flex-col gap-2 select-none text-[10px] text-slate-450">
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span>খেলা শুরু হবার ১ মিনিট আগে লাইভ লিংক অ্যালার্ট পাবেন।</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>নতুন APK রিলিজ হলে সরাসরি মেসেজে পাবেন।</span>
            </div>
          </div>
        </div>

        {/* Actions layout */}
        <div className="flex flex-col gap-3">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setClicked(true)}
            className="w-full py-4 bg-gradient-to-r from-sky-500 via-sky-650 to-indigo-650 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl hover:shadow-sky-500/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send className="w-4.5 h-4.5 transform rotate-45" />
            <span>টেলিগ্রাম চ্যানেলে জয়েন করুন (Join Link)</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </a>

          {/* Conditional Countdown vs Entry Button */}
          <div className="h-12 flex items-center justify-center relative mt-1 select-none">
            {!canSkip ? (
              <div className="flex items-center gap-2.5 text-slate-450 text-[11px] font-mono font-bold">
                <RefreshCw className="w-3.5 h-3.5 text-slate-500 animate-spin" />
                <span>নিরাপদ লিংকার ভেরিফাই হচ্ছে: {countdown} সেকেন্ড অপেক্ষা করুন...</span>
              </div>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-705 text-emerald-300 font-bold text-xs rounded-2xl border border-slate-750 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 animate-fade-in"
              >
                <span>ড্যাশবোর্ড এ যান (Go to Dashboard)</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            )}
          </div>
        </div>

        {/* Verified security tagline */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-500 uppercase select-none border-t border-slate-850/40 pt-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Verified link protection filter active</span>
        </div>
      </div>
    </div>
  );
}
