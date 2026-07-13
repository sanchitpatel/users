import React from 'react';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 select-none font-sans">
      {/* Dynamic Background Light Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Glass Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[500px] bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.4)] text-center relative z-10"
      >
        {/* Glow behind the icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
        
        {/* Circular Alert Icon */}
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
        >
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </motion.div>

        {/* Large 404 Header */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent select-none leading-none">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-bold tracking-tight text-slate-200 mt-4 mb-2">
          Domain Not Configured
        </h2>

        {/* Message */}
        <p className="text-sm text-slate-400 leading-relaxed px-2">
          The requested whitelabel subdomain or domain is not configured on the Applifix network. 
          If you are trying to preview this site, please verify your subdomain mapping configuration or contact support.
        </p>

        {/* Footer/Contact */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Network Operator</span>
        </div>
      </motion.div>

      {/* Decorative Brand watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600/30 font-extrabold tracking-widest text-xs uppercase z-0">
        APPLE FIX NETWORK
      </div>
    </div>
  );
}
