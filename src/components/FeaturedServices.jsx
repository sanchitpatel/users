import React from 'react';

export default function FeaturedServices({ onOpenBooking }) {
  const services = [
    {
      id: 'screen',
      name: 'Screen Repair',
      desc: 'Premium glass and display restoration with pixel-perfect resolution. Fixes cracked screens, touch unresponsive panels, and bleeding pixels.',
      price: '₹3,999',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    },
    {
      id: 'battery',
      name: 'Battery Replacement',
      desc: 'Genuine and fast battery swap to restore 100% battery health. Resolves heating issues, rapid drain, and random shutdowns.',
      price: '₹1,999',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
          <line x1="22" y1="11" x2="22" y2="13"></line>
          <line x1="6" y1="11" x2="6" y2="13"></line>
          <line x1="10" y1="11" x2="10" y2="13"></line>
          <line x1="14" y1="11" x2="14" y2="13"></line>
        </svg>
      )
    },
    {
      id: 'faceid',
      name: 'Face ID Repair',
      desc: 'Precision micro-soldering to fix TrueDepth sensor issues. Resolves "Face ID is not available" alerts while keeping security intact.',
      price: '₹4,999',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
          <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
          <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
          <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
          <line x1="12" y1="11" x2="12" y2="13"></line>
        </svg>
      )
    },
    {
      id: 'watch',
      name: 'Apple Watch Glass',
      desc: 'Specialized glass-only and touch-digitizer replacement for Apple Watch Series 3 to Ultra. Save up to 70% compared to full screen replacement.',
      price: '₹2,499',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="12" height="16" rx="3"></rect>
          <path d="M10 4V1h4v3"></path>
          <path d="M10 20v3h4v-3"></path>
          <circle cx="18" cy="10" r="1"></circle>
        </svg>
      )
    }
  ];

  return (
    <section className="services-section" id="repairs">
      <div className="section-title-wrapper" id="pricing">
        <h2 className="section-title">Our Featured Services</h2>
        <p className="section-subtitle">
          We use genuine grade components and state-of-the-art diagnostic machinery. All repairs come backed by a solid service guarantee.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card"
            onClick={onOpenBooking}
          >
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            
            <div className="service-info">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>

            <div className="service-footer">
              <div className="service-price-box">
                <span className="price-label">Price from</span>
                <span className="price-val">{service.price}</span>
              </div>
              
              <span className="service-link">
                Book
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
