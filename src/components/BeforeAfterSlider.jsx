import React, { useState, useRef } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  // SVG representation of a premium abstract mobile phone wallpaper
  const WallpaperSvg = ({ isCracked }) => (
    <svg 
      className="slider-img" 
      viewBox="0 0 266 566" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        {/* Rich background gradient */}
        <radialGradient id="phoneBg" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        
        {/* Glow behind the iOS clock */}
        <radialGradient id="clockGlow" cx="50%" cy="20%" r="30%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>

        {/* Diagonal glare */}
        <linearGradient id="glare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="30%" stopColor="white" stopOpacity="0.05" />
          <stop offset="31%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Screen Background */}
      <rect width="266" height="566" fill="url(#phoneBg)" />

      {/* iOS UI elements */}
      {/* Glow */}
      <circle cx="133" cy="110" r="100" fill="url(#clockGlow)" />
      
      {/* Time */}
      <text x="133" y="115" fontFamily="var(--font-heading)" fontSize="48" fontWeight="800" fill="#ffffff" fillOpacity="0.9" textAnchor="middle">09:41</text>
      
      {/* Date */}
      <text x="133" y="65" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600" fill="#93c5fd" fillOpacity="0.8" letterSpacing="1.5" textAnchor="middle">WEDNESDAY, JUNE 17</text>
      
      {/* Lock Icon */}
      <path d="M133 32c-4.4 0-8 3.6-8 8v6h16v-6c0-4.4-3.6-8-8-8zm-11 14h22v18h-22z" fill="#ffffff" fillOpacity="0.5" />

      {/* App Icons or Widget Mocks */}
      <rect x="33" y="150" width="90" height="45" rx="10" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.1" />
      <text x="78" y="176" fontFamily="var(--font-sans)" fontSize="9" fontWeight="600" fill="#ffffff" fillOpacity="0.7" textAnchor="middle">Battery: 98%</text>

      <rect x="143" y="150" width="90" height="45" rx="10" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.1" />
      <text x="188" y="176" fontFamily="var(--font-sans)" fontSize="9" fontWeight="600" fill="#ffffff" fillOpacity="0.7" textAnchor="middle">Patiala: 32°C</text>

      {/* Dock Area at bottom */}
      <rect x="20" y="495" width="226" height="50" rx="20" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.05" />
      
      {/* Dock circular icons */}
      <circle cx="55" cy="520" r="15" fill="#3b82f6" fillOpacity="0.8" />
      <circle cx="107" cy="520" r="15" fill="#10b981" fillOpacity="0.8" />
      <circle cx="159" cy="520" r="15" fill="#f59e0b" fillOpacity="0.8" />
      <circle cx="211" cy="520" r="15" fill="#ec4899" fillOpacity="0.8" />

      {/* Home indicator bar */}
      <rect x="93" y="555" width="80" height="4" rx="2" fill="#ffffff" fillOpacity="0.5" />

      {/* Diagonal Glare Reflection overlay */}
      <rect width="266" height="566" fill="url(#glare)" />

      {/* Cracked Screen Glass Overlay (only rendered on the cracked side) */}
      {isCracked && (
        <g stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" fill="none">
          {/* Main impact point 1 (Left middle) */}
          <path d="M 40,240 L 0,220 M 40,240 L 10,180 M 40,240 L 70,200 M 40,240 L 90,260 M 40,240 L 20,300 M 40,240 L 50,330 M 40,240 L 0,260" />
          {/* Main impact point 2 (Center lower) */}
          <path d="M 120,380 L 70,360 M 120,380 L 100,320 M 120,380 L 150,340 M 120,380 L 170,410 M 120,380 L 130,440 M 120,380 L 80,420" />
          
          {/* Concentric fracture rings */}
          <path d="M 25,230 Q 40,210 55,235 Q 50,255 30,250 Z" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M 10,220 Q 40,170 75,220 Q 60,280 15,270 Z" strokeWidth="0.8" strokeOpacity="0.4" />
          
          <path d="M 105,370 Q 120,355 135,370 Q 130,395 110,390 Z" strokeWidth="1" strokeOpacity="0.5" />
          
          {/* Connectors / radiating cracks */}
          <path d="M 40,240 L 120,380" strokeWidth="2" strokeOpacity="0.85" />
          <path d="M 40,240 L 133,115" strokeWidth="0.8" strokeOpacity="0.3" />
          <path d="M 120,380 L 220,495" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M 120,380 L 266,320" strokeWidth="0.8" strokeOpacity="0.4" />
          <path d="M 0,100 L 80,150" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M 266,150 L 180,220" strokeWidth="0.6" strokeOpacity="0.3" />

          {/* Slight glass tint/distortion on broken parts */}
          <rect width="266" height="566" fill="#ef4444" fillOpacity="0.03" />
        </g>
      )}
    </svg>
  );

  return (
    <div className="slider-container" ref={containerRef}>
      <div className="device-mockup">
        {/* Dynamic Island Notch */}
        <div className="device-island"></div>
        
        <div className="slider-image-container">
          {/* Base Layer: Restored (Fixed) Screen */}
          <WallpaperSvg isCracked={false} />
          
          {/* Sliding Overlay Layer: Cracked (Broken) Screen */}
          <div 
            className="slider-fixed-wrapper" 
            style={{ width: `${sliderPos}%`, borderRight: '2px solid rgba(255,255,255,0.8)' }}
          >
            {/* The wrapper width shrinks, cutting off the cracked image from right to left */}
            <WallpaperSvg isCracked={true} />
          </div>

          {/* Badges indicating Broken vs Fixed */}
          <div className="slider-badge badge-fixed">Fixed</div>
          <div className="slider-badge badge-broken">Broken</div>

          {/* Draggable Vertical Handle */}
          <div className="slider-handle-bar" style={{ left: `${sliderPos}%` }}>
            <div className="slider-handle-button">
              <svg viewBox="0 0 24 24">
                <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
              </svg>
            </div>
          </div>

          {/* Invisible range input overlaid on top to capture drag events perfectly on all devices */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            aria-label="Before and after repair slider"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'ew-resize',
              zIndex: 15,
            }}
          />
        </div>
      </div>
    </div>
  );
}
