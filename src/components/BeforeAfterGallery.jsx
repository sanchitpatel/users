import React from 'react';

export default function BeforeAfterGallery() {
  const galleryItems = [
    {
      id: 1,
      device: 'iPhone 14 Pro',
      label: 'iPhone Screen',
      bgGradient: 'linear-gradient(135deg, #701a75, #1e1b4b)',
      cracks: 'M 20,50 L 80,90 M 80,90 L 120,40 M 80,90 L 40,160 M 80,90 L 130,120'
    },
    {
      id: 2,
      device: 'Apple Watch Ultra',
      label: 'Watch Glass',
      bgGradient: 'linear-gradient(135deg, #ea580c, #171717)',
      cracks: 'M 40,40 L 70,80 M 70,80 L 100,50 M 70,80 L 30,120 M 70,80 L 110,110'
    },
    {
      id: 3,
      device: 'iPhone 13 Pro',
      label: 'Sierra Blue Screen',
      bgGradient: 'linear-gradient(135deg, #0284c7, #0f172a)',
      cracks: 'M 90,60 L 50,110 M 50,110 L 10,70 M 50,110 L 110,150 M 50,110 L 30,160'
    },
    {
      id: 4,
      device: 'iPhone 15 Pro Max',
      label: 'Titanium Screen',
      bgGradient: 'linear-gradient(135deg, #4b5563, #1e293b)',
      cracks: 'M 10,130 L 70,100 M 70,100 L 130,140 M 70,100 L 50,40 M 70,100 L 100,60'
    },
    {
      id: 5,
      device: 'Apple Watch S8',
      label: 'Watch Touch Glass',
      bgGradient: 'linear-gradient(135deg, #2563eb, #090d16)',
      cracks: 'M 60,30 L 40,70 M 40,70 L 10,50 M 40,70 L 80,90 M 40,70 L 50,110'
    },
    {
      id: 6,
      device: 'iPhone 12 Back Glass',
      label: 'Rear Glass Panel',
      bgGradient: 'linear-gradient(135deg, #10b981, #064e3b)',
      cracks: 'M 50,80 L 10,60 M 50,80 L 100,70 M 50,80 L 30,140 M 50,80 L 80,130 M 50,80 L 50,20'
    }
  ];

  // A light helper component to render the SVG phone mockup inside cards
  const CardMockupSvg = ({ bgGradient, isCracked, cracks }) => (
    <svg 
      viewBox="0 0 140 180" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        {/* Radial sheen for glare */}
        <linearGradient id="cardGlare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="40%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer Case / Bezel */}
      <rect x="2" y="2" width="136" height="176" rx="16" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      
      {/* Screen area */}
      <rect x="6" y="6" width="128" height="168" rx="12" fill="none" style={{ fill: 'none' }} />
      <g>
        <clipPath id="screenClip">
          <rect x="6" y="6" width="128" height="168" rx="12" />
        </clipPath>
        
        {/* Screen Wallpaper */}
        <g clipPath="url(#screenClip)">
          {/* Base gradient */}
          <rect x="6" y="6" width="128" height="168" fill="url(#bgGrad)" />
          {/* Draw actual background based on inline style or gradient fill */}
          <rect x="6" y="6" width="128" height="168" fill="currentColor" style={{ color: bgGradient.includes('url') ? '#0284c7' : bgGradient.replace('linear-gradient(135deg, ', '').split(',')[0] }} />
          
          {/* iOS Clock Mock */}
          <text x="70" y="32" fontFamily="var(--font-heading)" fontSize="14" fontWeight="800" fill="#ffffff" fillOpacity="0.8" textAnchor="middle">09:41</text>
          
          {/* Lock Screen UI widgets */}
          <circle cx="45" cy="148" r="8" fill="#ffffff" fillOpacity="0.1" />
          <circle cx="95" cy="148" r="8" fill="#ffffff" fillOpacity="0.1" />
          <rect x="50" y="160" width="40" height="2" rx="1" fill="#ffffff" fillOpacity="0.5" />

          {/* Glare Sheen */}
          <rect x="6" y="6" width="128" height="168" fill="url(#cardGlare)" />

          {/* Cracked screen overlay */}
          {isCracked && (
            <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.75" fill="none">
              <path d={cracks} />
              {/* Additional minor cracks */}
              <circle cx="70" cy="90" r="10" strokeWidth="0.5" strokeOpacity="0.4" />
              <rect x="6" y="6" width="128" height="168" fill="#ef4444" fillOpacity="0.02" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );

  return (
    <section className="gallery-section">
      <h2 className="video-card-title">Before & After Gallery</h2>
      
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-card">
            <div className="gallery-image-wrapper">
              {/* Broken Screen (Always Visible by default) */}
              <div className="img-before" style={{ width: '100%', height: '100%' }}>
                <CardMockupSvg 
                  bgGradient={item.bgGradient} 
                  isCracked={true} 
                  cracks={item.cracks} 
                />
              </div>

              {/* Fixed Screen (Opacity 1 on hover) */}
              <div className="img-after" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transition: 'opacity 0.3s ease-in-out' }}>
                <CardMockupSvg 
                  bgGradient={item.bgGradient} 
                  isCracked={false} 
                />
              </div>
            </div>

            <div className="gallery-card-label">
              {item.device}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
