import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ShieldCheck, Mail, Sparkles, UserCheck, Loader2, ArrowRight, X, Headphones, Clock } from 'lucide-react';

interface PartnerProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  telegramUrl?: string;
  onJoinedSuccess?: () => void;
}

export default function PartnerProgramModal({
  isOpen,
  onClose,
  currentUser,
  telegramUrl = 'https://t.me/FIFAWorldCupbd1',
  onJoinedSuccess
}: PartnerProgramModalProps) {
  const [stage, setStage] = useState<'intro' | 'evaluating' | 'congrats' | 'submitted'>('intro');
  const [countdown, setCountdown] = useState<number>(10);
  const [progress, setProgress] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    // Reset to initial states
    setStage('intro');
    setCountdown(10);
    setProgress(0);
    setEmailInput(currentUser?.email || '');
    setErrorMsg('');
  }, [isOpen, currentUser]);

  // Countdown timer logic when in 'evaluating' stage
  useEffect(() => {
    if (stage !== 'evaluating') return;

    setProgress(0);
    setCountdown(10);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStage('congrats');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [stage]);

  const handleStartEvaluation = () => {
    setStage('evaluating');
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('দয়া করে একটি সঠিক ইমেইল আইডি দিন।');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name: currentUser?.name || 'Anonymous User',
        username: currentUser?.username || 'guest_user',
        email: emailInput.trim(),
      };

      const res = await fetch('/api/partner/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStage('submitted');
        if (onJoinedSuccess) {
          onJoinedSuccess();
        }
        // Save flag in localStorage
        localStorage.setItem(`partner_joined_${currentUser?.username || 'guest'}`, 'true');
      } else {
        setErrorMsg(data.error || 'সংযুক্ত হতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Error joining partner program:', err);
      setErrorMsg('সার্ভার কানেকশন ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md select-none font-sans">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col gap-5 p-6 md:p-7"
        >
          {/* Top border ambient banner line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950/50 hover:bg-slate-820 transition-all cursor-pointer z-50 border border-slate-800/80"
          >
            <X className="w-4 h-4" />
          </button>

          {/* BACKGROUND GLOW */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* STAGE 1: INTRO */}
          {stage === 'intro' && (
            <div className="flex flex-col gap-4 text-center animate-fade-in pt-3 pb-1">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-550/20 flex items-center justify-center mx-auto text-amber-400">
                <Gift className="w-9 h-9 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">ফ্রী পার্টনার প্রোগ্রাম ২০২৬ 🤝</h3>
                <p className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold">Free Creator & Partner Program Eligibility</p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-855 rounded-2xl text-left space-y-3">
                <p className="text-slate-300 text-xs leading-relaxed text-center">
                  আপনি কি আমাদের সাথে স্পেশাল অংশীদারিত্ব প্রোগ্রামে যুক্ত হতে চান? আমাদের পার্টনারদের জন্য রয়েছে আকর্ষণীয় বোনাস কভারেজ ও বিশেষ সুযোগ সুবিধা!
                </p>
                <div className="pt-2 border-t border-slate-850/60 grid grid-cols-1 gap-2.5 text-[10.5px] text-slate-400 font-sans leading-relaxed pl-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">✓</span>
                    <span>কোনো বাফারিং ছাড়া হাই স্পিড ডেডিকেটেড সার্ভার অ্যাক্সেস।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">✓</span>
                    <span>নতুন চ্যানেলের রিকোয়েস্ট ও দ্রুত পার্সোনাল সাপোর্ট।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">✓</span>
                    <span>সম্পূর্ণ ফ্রী এবং কোনো চার্জ ছাড়াই লাইফটাইম সংযোগ।</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartEvaluation}
                className="w-full mt-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-slate-950 font-black text-sm rounded-xl cursor-pointer shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>যোগ্যতা যাচাই করুন (Click to Verify)</span>
                <ArrowRight className="w-4 h-4 shadow-sm" />
              </button>
            </div>
          )}

          {/* STAGE 2: EVALUATING (COUNTDOWN TIMER) */}
          {stage === 'evaluating' && (
            <div className="flex flex-col gap-5 text-center items-center py-6 animate-fade-in pt-3">
              <div className="relative flex items-center justify-center w-24 h-24">
                {/* Circular Loader */}
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
                <div 
                  className="absolute inset-0 border-4 border-amber-500 rounded-full transition-all duration-100"
                  style={{
                    clipPath: `polygon(50% 50%, -50% -50%, ${progress >= 25 ? '150% -50%' : '50% -50%'}, ${progress >= 50 ? '150% 150%' : '50% -50%'}, ${progress >= 75 ? '-50% 150%' : '50% -50%'}, ${progress >= 100 ? '-50% -50%' : '50% -50%'})`,
                    transform: 'rotate(-90deg)'
                  }}
                />
                <Clock className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-semibold">আপনার যোগ্যতা মূল্যায়ন হচ্ছে...</span>
                <span className="text-[11px] text-amber-500 font-mono font-bold block">{countdown} সেকেন্ড বাকি</span>
              </div>

              <div className="w-full max-w-xs bg-slate-950 rounded-full h-2 border border-slate-850 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-100" 
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-[11.5px] text-slate-400 italic font-sans max-w-xs">
                {progress < 30 ? '১. সার্ভার সেশন ও মেম্বার আইডি রিড করা হচ্ছে...' : 
                 progress < 65 ? '২. নেটওয়ার্ক ব্যান্ডউইথ ও ট্রাফিক অ্যানালিটিক্স চলছে...' : 
                 '৩. পার্টনারশিপ রেজিস্ট্রেশন স্লট বুকিং চূড়ান্ত করা হচ্ছে...'}
              </p>
            </div>
          )}

          {/* STAGE 3: CONGRATS & EMAIL INPUT */}
          {stage === 'congrats' && (
            <div className="flex flex-col gap-4 pt-2 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto text-emerald-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-lg md:text-xl font-black text-emerald-400 tracking-tight leading-tight">অভিনন্দন! আপনি পার্টনার প্রোগ্রামে যোগ্য (Congratulations!) 🎉</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Slot Reserved Space Identified</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed text-center bg-slate-950 p-3.5 border border-slate-850 rounded-xl">
                আপনি সফলভাবে প্রাথমিক ডাটাবেজ যাচাইকরণে উপযুক্ত হয়েছেন! আপনার অংশীদারত্ব চূড়ান্ত করার জন্য ও মেম্বার পোর্টাল লিঙ্কের আপডেট পেতে আপনার নিজের সচল ইমেইল আইডিটি সাবমিট করুন।
              </p>

              <form onSubmit={handleSubmitEmail} className="space-y-3 mt-1.5 text-left">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">আপনার আসল ইমেইল এড্রেস:</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. name@example.com"
                      required
                      className="w-full bg-slate-950 border border-slate-805 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-[10px] text-rose-450 font-bold bg-rose-500/5 p-2 rounded-lg border border-rose-500/10 text-center select-none font-sans">
                    ⚠ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-450 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>প্রক্রিয়াকরণ চলছে...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>যুক্ত হয়ে যান (Submit & Join)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STAGE 4: SUBMITTED SUCCESS AND CALLING API */}
          {stage === 'submitted' && (
            <div className="flex flex-col gap-5 text-center py-6 animate-fade-in pt-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center mx-auto text-white shadow-lg relative">
                <span className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-100">অনুরোধ সফলভাবে গৃহীত হয়েছে!</h3>
                <p className="text-[11px] text-emerald-400 font-extrabold uppercase">You are now a registered Free Partner</p>
              </div>

              <p className="text-xs text-slate-350 bg-slate-950 p-4 border border-slate-850 rounded-2xl max-w-sm mx-auto leading-relaxed">
                আপনার মেম্বার আইডি ও স্পেশাল সার্ভার কনফিগারেশন ইমেইল ঠিকানায় (<span className="text-white font-bold font-sans">{emailInput}</span>) পাঠানো হচ্ছে। নতুন আপডেট ও তাৎক্ষণিক সহযোগিতা পেতে নিচের আমাদের টেলগ্রাম গ্রুপে সাবস্ক্রাইব করুন।
              </p>

              <div className="flex flex-col gap-2.5 mt-2.5 w-full">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-sky-505 to-sky-600 hover:from-sky-450 hover:to-sky-550 text-white font-black text-xs rounded-xl cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>টেলিগ্রাম চ্যানেলে জয়েন করুন</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-705 text-slate-300 font-black text-xs rounded-xl cursor-pointer transition-all active:scale-95 text-center"
                >
                  ফিরে যান (Close Panel)
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
