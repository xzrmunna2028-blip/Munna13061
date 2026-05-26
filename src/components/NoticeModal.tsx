import React from 'react';
import { X, ShieldAlert, Info, HelpCircle, FileText, Heart } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteNameEnglish: string;
  siteNameBangla: string;
}

export default function NoticeModal({ isOpen, onClose, siteNameEnglish, siteNameBangla }: NoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        id="team-notices-container"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-sky-950/20 overflow-hidden flex flex-col max-h-[85vh] animate-slide-up"
      >
        {/* Modal Decorative Premium Top Header Banner */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-450/20 flex items-center justify-center">
              <ShieldAlert className="w-5.5 h-5.5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100 tracking-tight leading-tight">📢 টিমের গুরুত্বপূর্ণ নোটিশ ও নীতিমালা</h3>
              <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono font-bold mt-0.5">{siteNameEnglish} Official Notice Deck</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-400 rounded-xl transition-all cursor-pointer active:scale-90"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Contents area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-850">
          
          {/* Main Notice Announcement Highlight Box */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-3.5">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-400 mb-1">গুরুত্বপূর্ণ ঘোষণা (Live Streaming Updates)</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                প্রিয় দর্শক, আমাদের প্লাটফর্মে যুক্ত হওয়া সমস্ত ক্রীড়া (Sports), সংবাদ ও সাধারণ টিভি চ্যানেলগুলোর লিংক নিয়মিত ২৪/৭ অটোমেটিকলী আপডেট করা হয়। যদি কোনো চ্যানেল বাফারিং করে বা চলতে সমস্যা দেয়, তবে দয়া করে প্লেয়ারের উপরে থাকা <strong className="text-white bg-slate-800 px-1 py-0.2 rounded font-normal">"রিফ্রেশ"</strong> বাটনটি প্রেস করুন, অথবা <strong className="text-white bg-slate-800 px-1 py-0.2 rounded font-normal">"Alternate" সার্ভার লিংকে</strong> সুইচ করে দেখুন।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 1: About Us / Goals */}
            <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-2 mb-2.5">
                <HelpCircle className="w-4.5 h-4.5 text-sky-400" />
                <h5 className="text-xs font-bold text-slate-200">আমাদের লক্ষ্য ও উদ্দেশ্য</h5>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {siteNameBangla} ({siteNameEnglish}) এর প্রধান লক্ষ্য হচ্ছে সকল প্রবাসী ও প্রবাসী বাঙালি এবং দেশি ভাইদের অত্যন্ত সহজ ও চমৎকার ইন্টারফেসে কোনো ধরণের রেজিস্ট্রেশন বা ফি ছাড়াই শতভাগ ফ্রিতে লাইভ বাংলাদেশের চমৎকার সব টিভি চ্যানেল ও আন্তর্জাতিক খেলা দেখার সুযোগ করে দেওয়া।
              </p>
            </div>

            {/* Section 2: Live Chat Code of Conduct */}
            <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-2 mb-2.5">
                <ShieldAlert className="w-4.5 h-4.5 text-rose-450" />
                <h5 className="text-xs font-bold text-slate-200">লাইভ চ্যাটের কঠোর নিয়মাবলী</h5>
              </div>
              <p className="text-[11px] text-slate-440 leading-relaxed font-sans">
                লাইভ শেয়ারিং চ্যাট বক্সে গালিগালাজ, রাজনৈতিক উস্কানিমুলক কথাবার্তা, ব্যক্তিগত স্প্যাম লিঙ্ক বা অশালীন আচরণ সম্পূর্ণ নিষিদ্ধ। আমাদের অটোমেটেড ফিল্টার এবং অ্যাডমিন দল লাইভ চ্যাট পর্যবেক্ষণ করছে। নিয়মভঙ্গের শাস্তি হিসেবে আইপি ও অ্যাকাউন্ট স্থায়ীভাবে ব্লক করে দেয়া হয়।
              </p>
            </div>

            {/* Section 3: DMCA & Copyright Info */}
            <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-2 mb-2.5">
                <FileText className="w-4.5 h-4.5 text-yellow-500" />
                <h5 className="text-xs font-bold text-slate-200">স্বত্বাধিকার ও কপিরাইট পলিসি</h5>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                আমরা সরাসরি কোনো কন্টেন্ট বা ফিড আমাদের নিজস্ব সার্ভারে হোস্ট বা রেকর্ড করি না। সকল চ্যানেল তৃতীয় পক্ষীয় পাবলিক সোর্স থেকে সংযুক্ত। কোনো কপিরাইট স্বত্বাধিকারী যদি কোনো চ্যানেলের স্ট্রিমিং নিয়ে আপত্তি জানাতে চান, তবে আমাদের সাথে "লাইভ সাপোর্ট" অথবা অ্যাডমিনকে নোটিশ পাঠালেই আমরা তা ২৪ ঘন্টার মধ্যে সরিয়ে দেব।
              </p>
            </div>

            {/* Section 4: Secure Data & M3U policy */}
            <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-2 mb-2.5">
                <Heart className="w-4.5 h-4.5 text-purple-450" />
                <h5 className="text-xs font-bold text-slate-200">নিরাপত্তা ও প্লেলিস্ট বিবরণ</h5>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                ব্যবহারকারী এবং লাইসেন্সিং সুরক্ষার স্বার্থে আমাদের অ্যাপের স্ট্রিমিং M3U ফাইল বা প্লেলিস্ট সোর্স এক্সপোর্ট ক্যাশে রাখা নিষিদ্ধ। সকল চ্যানেল এখানে হাই-স্পিড পিটুপি রুট দিয়ে সুরক্ষিত রাখা হয়েছে। অনুগ্রহ করে কোনো থার্ড-পার্টি প্লেয়ারে আমাদের লিঙ্ক চালানোর অননুমোদিত চেষ্টা করবেন না।
              </p>
            </div>
          </div>

          {/* Sincere message from team */}
          <div className="p-3 text-center border-t border-slate-850 select-none pt-4 bg-slate-950/20 rounded-2xl">
            <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              <span>by {siteNameEnglish} Support Team</span>
            </p>
          </div>

        </div>

        {/* Modal Bottom Footer Box */}
        <div className="bg-slate-950/90 p-4 border-t border-slate-850 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl cursor-pointer select-none transition-all active:scale-95 border border-slate-750"
          >
            আমি নীতিমালা ও নোটিশ বুঝলাম (Agree)
          </button>
        </div>
      </div>
    </div>
  );
}
