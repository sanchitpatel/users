import React from 'react';
import { motion } from 'framer-motion';
import RotatingMockup from './RotatingMockup';

export default function Hero({ onOpenBooking }) {
  return (
    <section className="hero-section">
      <div className="hero-content z-10">
        
        {/* Same-day repair badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-xs font-bold tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          SAME-DAY REPAIR AVAILABLE
        </div>

        {/* Title with text gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.2] sm:leading-[1.15] md:leading-[1.1]">
          <span className="text-gradient">
            Premium Apple Device Repair in Punjab.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-700 max-w-md leading-relaxed">
          Expert Apple-certified technicians restoring your devices with surgical precision and genuine parts.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full justify-center lg:justify-start">
          <motion.button 
            onClick={onOpenBooking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] text-sm sm:text-base font-semibold border-none outline-none text-white rounded-[25px] transition-[box-shadow,opacity] duration-200 ease-out focus:outline-none flex items-center justify-center gap-1.5 whitespace-nowrap will-change-transform transform-gpu antialiased subpixel-antialiased"
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
            Schedule Your Repair
          </motion.button>
          <div className="flex flex-col justify-center text-center sm:text-left">
            <span className="text-sm text-black font-bold text-slate-800">★ 4.9/5 Rating</span>
            <span className="text-xs text-slate-600 font-semibold">From 12,000+ Customers</span>
          </div>
        </div>

        {/* Stats section */}
        <div className="flex items-center justify-between gap-2 sm:gap-8 border-t border-slate-200/80 pt-6 w-full">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <span className="text-lg sm:text-2xl font-bold text-slate-800">90-Day</span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-600 font-bold">
              Full Warranty
            </span>
          </div>
          <div className="w-px h-6 sm:h-8 bg-slate-200/80"></div>
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <span className="text-lg sm:text-2xl font-bold text-slate-800">45min</span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-600 font-bold">
              Avg Fix Time
            </span>
          </div>
          <div className="w-px h-6 sm:h-8 bg-slate-200/80"></div>
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <span className="text-lg sm:text-2xl font-bold text-slate-800">100%</span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-600 font-bold">
              Genuine Parts
            </span>
          </div>
        </div>
        
      </div>
      
      <RotatingMockup />
    </section>
  );
}
