import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ onOpenBooking }) {
  return (
    <header className="site-header fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] sm:w-[85%] max-w-[600px] bg-white/40 backdrop-blur-xl rounded-full border border-slate-300/50 px-3 pt-1.5 pb-1 sm:px-4 sm:py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.03)] select-none">

      {/* Left: Circular Logo & Brand name */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-xl shrink-0 overflow-hidden">
          <img
            src="/Gemini_Generated_Image_djkdejdjkdejdjkd.png"
            alt="APPLIFIX Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-slate-800 font-extrabold text-base sm:text-xl tracking-tight select-none">
          APPLIFIX<span className="text-blue-500 text-base sm:text-lg">.</span>
        </span>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
        <a
          href="#repairs"
          className="hidden sm:inline-block text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide transition-colors duration-200"
        >
          Repairs
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-block text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide transition-colors duration-200"
        >
          Store
        </a>
        <a
          href="#support"
          className="text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200"
        >
          Support
        </a>
      </nav>

      {/* Right: CTA Booking Button */}
      <motion.button
        onClick={onOpenBooking}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-3.5 py-1.5 sm:px-5 sm:py-2 min-h-[32px] sm:min-h-[40px] text-[10px] sm:text-xs md:text-sm font-semibold border-none outline-none text-white rounded-full transition-[box-shadow,opacity] duration-200 ease-out focus:outline-none flex items-center justify-center gap-1.5 whitespace-nowrap will-change-transform transform-gpu antialiased subpixel-antialiased"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.5), inset 2px 2px 5px rgba(16, 34, 66, 0.45), inset -2px -2px 5px rgba(137, 180, 255, 0.48)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4), inset 3px 3px 7px rgba(16, 34, 66, 0.48), inset -3px -3px 7px rgba(137, 180, 255, 0.8)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.5), inset 2px 2px 5px rgba(16, 34, 66, 0.45), inset -2px -2px 5px rgba(137, 180, 255, 0.48)';
        }}
      >
        Book Repair
      </motion.button>

    </header>
  );
}
