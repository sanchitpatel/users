import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedServices from './components/FeaturedServices';
import VideoPlayer from './components/VideoPlayer';
import MapLocation from './components/MapLocation';
import TrustReviews from './components/TrustReviews';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import ScrollVideoDemo from './components/ScrollVideoDemo';
import Lenis from 'lenis';
import { useTenant } from './context/TenantContext';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll momentum
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easeOut
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Run Lenis animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isBookingOpen) {
      lenisRef.current?.stop();
      document.body.classList.add('no-scroll');
    } else {
      lenisRef.current?.start();
      document.body.classList.remove('no-scroll');
    }

    return () => {
      lenisRef.current?.start();
      document.body.classList.remove('no-scroll');
    };
  }, [isBookingOpen]);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const handleScrollPush = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(5 * window.innerHeight, {
        duration: 7.0, // Majestic, cinematic slow-scroll through all video frames
        easing: (t) => 1 - Math.pow(1 - t, 3) // easeOutQuart: Fast initial pickup, smooth slow deceleration
      });
    } else {
      window.scrollTo({ top: 5 * window.innerHeight, behavior: 'smooth' });
    }
  };

  const tenant = useTenant();

  // Dynamic browser metadata updates for SEO & Tab Branding
  useEffect(() => {
    if (!tenant) return;

    // 1. Update document title
    const brand = tenant.brandName || 'xyz';
    const city = tenant.city || '';
    const state = tenant.state || '';
    const locationStr = city ? ` in ${city}${state ? `, ${state}` : ''}` : '';
    document.title = `${brand} | Premium Device Repair Service${locationStr}`;

    // Helper to update or insert meta tags dynamically
    const updateMetaTag = (nameOrProperty, content, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${nameOrProperty}"]` 
        : `meta[name="${nameOrProperty}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', nameOrProperty);
        } else {
          el.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Dynamic description
    const description = `Professional repairs by ${brand} for iPhones, Apple Watches, and smartphones. Same-day screen replacement, battery, and face ID repair with genuine parts and 1-year warranty in ${city}, ${state}.`;
    updateMetaTag('description', description);
    updateMetaTag('og:title', `${brand} | Premium Device Repair Service${locationStr}`, true);
    updateMetaTag('og:description', description, true);

    // 3. Dynamic keywords
    const keywords = `${brand}, ${brand} repair, phone repair ${city}, iPhone repair ${city}, screen replacement ${city}`;
    updateMetaTag('keywords', keywords);
  }, [tenant]);

  // If no tenant is matched (unauthorized subdomain or main domain), show the 404 page
  if (!tenant) {
    return <NotFoundPage />;
  }

  // Check if we're on the demo page
  const isDemo = window.location.pathname === '/demo' || window.location.search.includes('demo');

  // If demo mode, show only the scroll video demo
  if (isDemo) {
    return <ScrollVideoDemo />;
  }

  return (
    <div className="app-container">
      <Header onOpenBooking={openBooking} />
      <main>
        {/* Top Branding & Hero Section */}
        <div className="left-column hero-container">
          <Hero onOpenBooking={openBooking} />
          <div
            className="scroll-indicator-label"
            onClick={handleScrollPush}
          >
            <span>scroll while we fix your iphone</span>
            <span className="scroll-indicator-arrow">↓</span>
          </div>
        </div>

        {/* Scroll-Driven Feature Showcase (Full Screen) */}
        <ScrollVideoDemo onOpenBooking={openBooking} />

        {/* Action, Services, and Reviews */}
        <div className="left-column" style={{ marginTop: 0 }}>
          {/* Map Location Section */}
          <MapLocation onOpenBooking={openBooking} />
          <div className="section-divider"></div>

          {tenant.videos && tenant.videos.length > 0 && (
            <>
              <VideoPlayer />
              <div className="section-divider"></div>
            </>
          )}
          <FeaturedServices onOpenBooking={openBooking} />
          <div className="section-divider"></div>
          <TrustReviews />

          {/* Ready to Restore Card */}
          <div className="ready-to-restore-card" style={{ marginBottom: '50px' }}>
            <h2>Ready to Restore?</h2>
            <p>Get premium repairs with genuine components and a comprehensive service warranty.</p>
            <motion.button
              onClick={openBooking}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cta-button"
            >
              Book a Repair
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer: Spans full width at the bottom of the page */}
      <Footer />

      {/* Booking Modal (Shared glassmorphism popup) */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
