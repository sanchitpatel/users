import React from 'react';
import { useTenant } from '../context/TenantContext';
import { motion } from 'framer-motion';

export default function MapLocation({ onOpenBooking }) {
  const tenant = useTenant();

  // Determine if it is a physical location vs online/courier service
  const isOnlineOnly = tenant.address === 'Online / Courier Repair Service' || !tenant.address;

  // Resolve search query for Google Maps iframe embed
  const searchQuery = !isOnlineOnly
    ? `${tenant.brandName}, ${tenant.address}`
    : `${tenant.city}, ${tenant.state || ''}, India`;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  
  // Directions URL fallback
  const directionsUrl = tenant.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

  return (
    <section className="map-section" id="location-section">
      <div className="section-title-wrapper" style={{ marginBottom: '40px' }}>
        <h2 className="section-title">
          {isOnlineOnly ? 'Our Service Area' : 'Visit Our Service Center'}
        </h2>
        <p className="section-subtitle">
          {isOnlineOnly 
            ? `Get your device repaired with free home pickup and courier delivery across ${tenant.city}.`
            : `Drop by our ${tenant.city} center for premium diagnostics, same-day repairs, and real-time support.`
          }
        </p>
      </div>

      <div className="map-layout">
        {/* Info Card */}
        <div className="map-info-card">
          <div className="map-info-header">
            <h3 className="map-center-name">
              {tenant.walkInLocationName || `${tenant.city} Center`}
            </h3>
            <p className="map-address">{tenant.address}</p>
          </div>

          <div className="map-details-list">
            <div className="map-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Open Daily: 10:00 AM - 8:00 PM</span>
            </div>

            <div className="map-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{tenant.phone}</span>
            </div>

            <div className="map-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{tenant.email}</span>
            </div>
          </div>

          <div className="map-actions">
            {isOnlineOnly ? (
              <button 
                onClick={onOpenBooking}
                className="map-btn-primary"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Book Home Pickup
              </button>
            ) : (
              <a 
                href={directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-btn-primary"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                Get Directions
              </a>
            )}

            <a 
              href={`https://wa.me/${tenant.whatsapp || tenant.phoneRaw}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="map-btn-secondary"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp Support
            </a>
          </div>
        </div>

        {/* Map Container */}
        <div className="map-iframe-container">
          <iframe
            title="Google Maps Location"
            src={embedUrl}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
