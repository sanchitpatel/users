import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="support">
      <div className="footer-grid">
        <div className="footer-info">
          <div className="logo" style={{ border: 'none', padding: 0 }}>
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
              <img 
                src="/Gemini_Generated_Image_djkdejdjkdejdjkd.png" 
                alt="APPLIFIX Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span>APPLIFIX</span>India
          </div>
          
          <p className="footer-desc">
            Your trusted destination for premium Apple iPhone and smartwatch repairs. We specialize in glass restorations, screen fixes, battery swaps, and motherboard microsoldering.
          </p>

          <div className="footer-contacts">
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>SCO-90, Basement New, across Domino's Pizza, Leela Bhawan, Bank Colony, Patiala, Punjab 147001</span>
            </div>

            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href="tel:+917986863776">+91 9779871674</a>
            </div>

            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:applifyservicecenter@gmail.com">applifyservicecenter@gmail.com</a>
            </div>
          </div>

          <div className="footer-socials">
            {/* Instagram */}
            <a href="https://www.instagram.com/applifix_india" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/61586980768076" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            {/* YouTube */}
            <a href="https://www.youtube.com/@applify5080" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555A3.002 3.002 0 0 0 .5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.002 3.002 0 0 0 2.112 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/917986863776" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.244 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.856-1.859-4.335-2.88-6.972-2.882-5.437 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.418 1.328 4.908l-.307 1.12 1.157-.303zm12.385-6.666c-.302-.152-1.785-.881-2.062-.982-.277-.1-.478-.151-.679.151-.202.302-.782.982-.958 1.184-.176.201-.352.226-.654.075-.302-.15-1.274-.47-2.427-1.498-.897-.8-1.502-1.788-1.678-2.09-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.529.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.679-1.637-.93-2.24-.245-.589-.494-.509-.679-.518-.176-.008-.377-.01-.578-.01-.201 0-.528.075-.805.377-.277.302-1.057 1.03-1.057 2.512 0 1.483 1.082 2.915 1.232 3.116.15.201 2.13 3.253 5.16 4.562.72.311 1.282.497 1.721.637.724.23 1.382.197 1.902.12.58-.087 1.785-.73 2.037-1.435.252-.704.252-1.307.176-1.433-.076-.127-.277-.202-.579-.353z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-hours">
          <span className="footer-title">Operating Hours</span>
          <ul className="hours-list">
            <li><span>Monday - Saturday:</span> <span>10:30 AM - 08:00 PM</span></li>
            <li><span>Sunday:</span> <span style={{ color: 'var(--broken)', fontWeight: 'bold' }}>Closed</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Applifix India. All rights reserved.</p>
        <p>Expert Third-Party Repair Center | Patiala, Punjab</p>
      </div>
    </footer>
  );
}
