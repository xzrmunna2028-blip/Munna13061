import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, ArrowBigDown, Shield, CheckCircle, Info } from 'lucide-react';

interface InstallPromptBannerProps {
  siteNameEnglish: string;
  siteNameBangla: string;
}

export default function InstallPromptBanner({ siteNameEnglish, siteNameBangla }: InstallPromptBannerProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if user already dismissed the banner in this browser session
    const isDismissed = localStorage.getItem('site_install_banner_dismissed') === 'true';
    
    // 2. Hear the browser's PWA install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 3. Fallback: If event hasn't fired in 3.5 seconds but it's not dismissed yet, 
    // show the banner so that mobile users can click to see standard guidelines!
    const timer = setTimeout(() => {
      if (!isDismissed && !deferredPrompt) {
        setShowBanner(true);
      }
    }, 3500);

    return () => {
      window.removeEventListener('beforebeforeinstallprompt' as any, handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger the official native PWA install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('site_install_banner_dismissed', 'true');
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Show elegant walkthrough instruction modal for manual Add-to-Home-Screen setup
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('site_install_banner_dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return (
    <>
      {/* Retain helper modal structure even if main banner is dismissed */}
      {showInstructions && renderInstructionsModal()}
    </>
  );

  return (
    <>
      {/* Sliding Premium Top Install Banner */}
      <div 
        id="top-pwa-install-banner"
        className="w-full bg-gradient-to-r from-emerald-600 via-teal-900 to-indigo-950 text-white py-3 px-4 border-b border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left relative z-50 sticky top-0 shadow-lg animate-slide-down select-none font-sans"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-400/25 flex items-center justify-center shrink-0 border border-emerald-300/30 animate-pulse">
            <Smartphone className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-black tracking-tight flex items-center gap-1.5 justify-center md:justify-start">
              <span>📱 আমাদের {siteNameBangla} অ্যাপটি ফোনে সেটআপ করুন</span>
              <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold animate-bounce hidden sm:inline">ফ্রি ইনস্টল (PWA)</span>
            </p>
            <p className="text-[10px] md:text-[11px] text-teal-200 mt-0.5 leading-none">সরাসরি হোম স্ক্রীন থেকে কোনো প্রকার ডাউনলোড ও বাফারিং ছাড়াই খেলা দেখতে এখনই অ্যাপটি হোম পেইজে যুক্ত করুন!</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>হোম স্ক্রিনে যুক্ত করুন (Install)</span>
          </button>
          
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/10 rounded-lg text-teal-300 hover:text-white transition-all cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInstructions && renderInstructionsModal()}
    </>
  );

  function renderInstructionsModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in font-sans">
        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-slide-up">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-850 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight">মোবাইলে অ্যাপটি ইনস্টল করার গাইড</h3>
                <p className="text-[9px] text-slate-400 font-mono">Simple Add to Home Screen</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Guide list */}
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              আইফোন ও এন্ড্রয়েড ফোনে কোনো ঝামেলা ছাড়াই সরাসরি আমাদের ওয়েবসাইটটি একটি অফিশিয়াল অ্যাপের মত হোম স্ক্রীনে ইনস্টল বা যুক্ত করার সহজ নিয়ম নিচে দেয়া হলো:
            </p>

            {/* Android Guide */}
            <div className="p-3.5 bg-slate-950/45 border border-slate-850 rounded-2xl">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>এন্ড্রয়েড ফোন (Chrome / Android Browser)</span>
              </p>
              <ol className="text-[11px] text-slate-300 space-y-1 ml-5 list-decimal lider-relaxed">
                <li>আপনার ক্রোম (Chrome) ব্রাউজারের উপরে ডান কোনায় <strong>তিনটি ডট (Menu)</strong> আইকনটিতে ট্যাপ করুন।</li>
                <li>নিচের দিকে স্ক্রোল করে <strong>"Add to Home screen"</strong> অথবা <strong>"Install app"</strong> অপশনটিতে ক্লিক করুন।</li>
                <li>কিক করে <strong>Add / Install</strong> প্রেস করলেই অ্যাপটি আপনার ব্যাকগ্রাউন্ডে ইনস্টল হয়ে যাবে।</li>
              </ol>
            </div>

            {/* iPhone / iOS Guide */}
            <div className="p-3.5 bg-slate-950/45 border border-slate-850 rounded-2xl">
              <p className="text-xs font-bold text-sky-400 flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>আইফোন / আইপ্যাড (Safari / iOS Setup)</span>
              </p>
              <ol className="text-[11px] text-slate-300 space-y-1 ml-5 list-decimal leading-relaxed">
                <li>আপনার সাফারি (Safari) ব্রাউজারের নিচে থাকা মাঝখানের <strong>"Share" (শেয়ার তীর)</strong> আইকনে চাপুন।</li>
                <li>মেনুটি স্ক্রোল করে নিচের দিক থেকে <strong>"Add to Home Screen"</strong> অপশনে চাপ দিন।</li>
                <li>উপরে ডান কোনায় থাকা <strong>"Add"</strong> বাটনে পুনরায় ক্লিক করুন। অ্যাপটি সাথে সাথে আপনার আইফোনে সেভ হয়ে যাবে।</li>
              </ol>
            </div>

            {/* Premium PWA Info */}
            <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex gap-3 text-left">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-indigo-300 mb-0.5">কেন এটি ইনস্টল করবেন?</p>
                <p className="text-[10px] text-slate-400 leading-normal">
                  অ্যাপটি ইনস্টল করলে এটি ব্রাউজার বার ছাড়াই ফুল-স্ক্রিন মোডে রান করবে। এতে আপনার স্ট্রিমিং স্পিড বৃদ্ধি পাবে এবং বাফারিং মুক্ত হাই-ডেফিনিশন লাইভ ফুটবল/ক্রিকেট ম্যাচ সরাসরি ওয়াচ করা যাবে।
                </p>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="text-right border-t border-slate-850 pt-3 flex justify-between items-center">
            <span className="text-[10px] text-green-400 font-bold flex items-center gap-1.5 select-none uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>শতভাগ নিরাপদ অ্যাপ</span>
            </span>
            <button
              onClick={() => {
                localStorage.setItem('site_install_banner_dismissed', 'true');
                setShowInstructions(false);
                setShowBanner(false);
              }}
              className="px-4.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              আমি বুঝলাম
            </button>
          </div>

        </div>
      </div>
    );
  }
}
