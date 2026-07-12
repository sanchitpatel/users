import React, { useRef } from 'react';

export default function TrustReviews() {
  const scrollRef = useRef(null);
  const reviews = [
    {
      id: 1,
      name: 'Rohan S.',
      rating: 5,
      avatarInitials: 'RS',
      text: 'Excellent customer service and professional repair quality. The team kept me informed throughout the process, and my phone looks brand new again.'
    },
    {
      id: 2,
      name: 'Anjali G.',
      rating: 5,
      avatarInitials: 'AG',
      text: 'The repair was completed quickly and the device was returned in perfect condition. Great communication and a very smooth experience overall.'
    },
    {
      id: 3,
      name: 'Vikram P.',
      rating: 5,
      avatarInitials: 'VP',
      text: 'Fast turnaround time and reliable service. The staff was knowledgeable, transparent, and delivered exactly what was promised.'
    },
    {
      id: 4,
      name: 'Kabir M.',
      rating: 5,
      avatarInitials: 'KM',
      text: "I was skeptical about getting my iPhone 14's motherboard repaired, but Applifix fixed the micro-soldering issue perfectly. Truly certified experts!"
    },
    {
      id: 5,
      name: 'Priya D.',
      rating: 5,
      avatarInitials: 'PD',
      text: 'My Apple Watch Series 8 had a completely shattered glass screen. Applifix replaced the glass while retaining the original OLED screen, saving me a ton. Highly recommend!'
    },
    {
      id: 6,
      name: 'Aarav K.',
      rating: 5,
      avatarInitials: 'AK',
      text: 'Prompt service, clean clinic setup, and genuine Apple diagnostic machinery. The same-day repair badge is fully accurate - fixed my iPad digitizer in 45 minutes!'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector('.review-slide-card');
      const cardWidth = card ? card.offsetWidth : 300;
      const scrollAmount = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="trust-section">
      <div className="video-header-row">
        <h2 className="video-card-title">Trust & Reviews</h2>
        <div className="slider-nav-buttons">
          <button onClick={() => scroll('left')} className="slider-nav-btn" aria-label="Previous reviews">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button onClick={() => scroll('right')} className="slider-nav-btn" aria-label="Next reviews">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Reviews Cards List Slider */}
      <div className="reviews-slider-container">
        <div ref={scrollRef} className="reviews-slider-track">
          {reviews.map((review) => (
            <div key={review.id} className="review-slide-card">
              <div className="review-header">
                <div className="review-avatar">
                  {review.avatarInitials}
                </div>
                
                <div className="review-meta">
                  <span className="review-name">{review.name}</span>
                  <div className="review-rating" aria-label={`Rated ${review.rating} stars`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <p className="review-text">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
