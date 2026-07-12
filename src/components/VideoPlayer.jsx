import React, { useRef } from 'react';

export default function VideoPlayer() {
  const scrollRef = useRef(null);
  const youtubeChannelUrl = "https://youtube.com/@applify5080?si=61Jei2eder7yggaa";

  const videos = [
    {
      id: "Qwd7IfguEoE",
      title: "Apple Watch Glass Replacement | Cracked Screen to Brand New"
    },
    {
      id: "pUOX-ulIUKk",
      title: "iPad Pro Screen Restoration | Full Digitizer Repair"
    },
    {
      id: "2nytHtwE4Fg",
      title: "iPhone 15 Pro Max Restoration | Surgical Precision Rebuild"
    },
    {
      id: "h35oheJWFGU",
      title: "iPhone Motherboard Microsoldering | Repairing Logic Board"
    },
    {
      id: "W_xUfwsBZPI",
      title: "Apple Watch Series 8 Overhaul | Refurbished Frame & Glass"
    },
    {
      id: "J5bCAqdVqSE",
      title: "Premium Repair Showcase | Glass Restoration Process"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector('.video-slide-card');
      const cardWidth = card ? card.offsetWidth : 300;
      const scrollAmount = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="video-section" id="video-action">
      <div className="video-header-row">
        <h2 className="video-card-title">See Our Expert-Repairs in Action</h2>
        <div className="slider-nav-buttons">
          <button
            className="slider-nav-btn"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="slider-nav-btn"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="video-slider-container">
        <div ref={scrollRef} className="video-slider-track">
          {videos.map((video) => (
            <div key={video.id} className="video-slide-card">
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="video-card-label">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <a
          href={youtubeChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-slider-btn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.4 12 3.4 12 3.4s-7.53 0-9.388.655a3.003 3.003 0 0 0-2.11 2.108C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.6 12 20.6 12 20.6s7.53 0 9.388-.655a3.003 3.003 0 0 0 2.11-2.108C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch More on YouTube
        </a>
      </div>
    </section>
  );
}
