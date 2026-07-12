import { useEffect, useRef, useState } from 'react';
import '../styles/ScrollVideoDemo.css';

const ScrollVideoDemo = ({ onOpenBooking }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('/Cinematic_D_commercial_produ_smooth.mp4');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const requestRef = useRef(null);
  const easedTimeRef = useRef(0);

  // Prefetch and cache the video file using Cache Storage API
  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const cacheAndLoadVideo = async () => {
      const videoUrl = '/Cinematic_D_commercial_produ_smooth.mp4';
      const cacheName = 'applifix-video-cache';

      try {
        const cache = await caches.open(cacheName);
        let response = await cache.match(videoUrl);

        // If already cached, apply Blob URL instantly
        if (response) {
          if (active) {
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setVideoSrc(objectUrl);
          }
          return;
        }

        // If not cached, schedule background prefetch after 4s to avoid network congestion
        if (!response && active) {
          setTimeout(async () => {
            if (!active) return;
            try {
              let res = await cache.match(videoUrl);
              if (!res) {
                const fetchedResponse = await fetch(videoUrl);
                if (fetchedResponse.ok) {
                  await cache.put(videoUrl, fetchedResponse.clone());
                  res = fetchedResponse;
                }
              }
              if (res && active) {
                const blob = await res.blob();
                objectUrl = URL.createObjectURL(blob);
                setVideoSrc(objectUrl);
              }
            } catch (fetchErr) {
              console.warn('[Applifix Cache] Background prefetch failed:', fetchErr);
            }
          }, 3500);
        }
      } catch (err) {
        console.warn('[Applifix Cache] Cache storage failed, streaming from Vercel:', err);
      }
    };

    // Delay initial cache check slightly
    const timer = setTimeout(() => {
      cacheAndLoadVideo();
    }, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  // Force video reload when changing source from network to cached blob
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Handle video loaded
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.pause();
      video.currentTime = 0;
      easedTimeRef.current = 0;
    };

    const handleError = (e) => {
      console.error('❌ Video loading error:', e);
      console.error('Video error details:', video.error);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    // Prevent seeking events from blocking
    video.addEventListener('seeking', () => {
      // Allow seeking to happen without blocking
    });

    // Calculate target time based on scroll
    const getTargetTime = () => {
      if (!video.duration) return 0;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Start video playback when container enters the bottom half of viewport
      // (corresponds to scrolling past half of the 100vh hero pane)
      const triggerOffset = windowHeight / 1;
      const animationDistance = containerHeight - windowHeight + triggerOffset;

      const scrolled = Math.max(0, triggerOffset - rect.top);
      const scrollProgress = Math.min(1, scrolled / animationDistance);

      return scrollProgress * video.duration;
    };

    // Continuous update loop - runs at 60fps
    const updateVideo = () => {
      if (!video.duration) {
        requestRef.current = requestAnimationFrame(updateVideo);
        return;
      }

      const targetTime = getTargetTime();
      const timeDiff = targetTime - easedTimeRef.current;

      // Easing speed: smaller = smoother/slower, larger = faster/tighter.
      // 0.08 offers a perfect balance of responsiveness and buttery smoothness.
      const ease = 0.08;

      if (Math.abs(timeDiff) > 0.001) {
        // Always update the eased time at 60fps to keep the motion buttery-smooth
        easedTimeRef.current += timeDiff * ease;
        easedTimeRef.current = Math.max(0, Math.min(video.duration, easedTimeRef.current));

        // Only trigger a new seek if the video is NOT currently seeking.
        // This avoids piling up abort-seek requests in the browser decoder thread.
        if (!video.seeking) {
          try {
            video.currentTime = easedTimeRef.current;
          } catch (e) {
            // Ignore seek errors
          }
        }
      }

      requestRef.current = requestAnimationFrame(updateVideo);
    };

    // Start the continuous update loop
    if (isVideoLoaded) {
      updateVideo();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVideoLoaded]);

  return (
    <div className="scroll-video-page">
      {/* Video container - full screen from top */}
      <div ref={containerRef} className="scroll-video-container">
        {/* Sticky video wrapper */}
        <div className="video-wrapper">
          <div className="video-frame-container">
            <video
              ref={videoRef}
              className="scroll-video"
              preload="auto"
              muted
              playsInline
              crossOrigin="anonymous"
              src={videoSrc}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="applifix-overlay-box">
              <span>Applifix</span>
            </div>
          </div>
          {!isVideoLoaded && (
            <div className="loading-indicator">Loading...</div>
          )}
        </div>

        {/* Scroll-Driven Tree Timeline Overlay */}
        <div className="tree-timeline-container">

          {/* Card 1: Right */}
          <div className="timeline-item right-branch" style={{ top: '11%' }}>
            <div className="tree-card">
              <h3>Flawless Screen Restoration</h3>
              <p>Removing hairline cracks, preserving OLED display calibration, and restoring original touch responsiveness.</p>
              <span className="card-badge">Genuine OLED Parts</span>
            </div>
          </div>

          {/* Card 2: Left */}
          <div className="timeline-item left-branch" style={{ top: '26%' }}>
            <div className="tree-card">
              <h3>Intelligent Battery Replacement</h3>
              <p>Restoring peak battery capacity, optimizing heat dissipation, and maximizing daily battery life.</p>
              <span className="card-badge">Zero-Cycle Cells</span>
            </div>
          </div>

          {/* Card 3: Right */}
          <div className="timeline-item right-branch" style={{ top: '40%' }}>
            <div className="tree-card">
              <h3>Advanced Motherboard Micro-Soldering</h3>
              <p>Resolving complex chip short circuits, logic board issues, and retrieving critical user data.</p>
              <span className="card-badge">IC Diagnostics</span>
            </div>
          </div>

          {/* Card 4: Left */}
          <div className="timeline-item left-branch" style={{ top: '54%' }}>
            <div className="tree-card">
              <h3>Precision Liquid Damage Recovery</h3>
              <p>Ultrasonic cleaning, corrosion removal, and chemical decontamination of motherboard circuits.</p>
              <span className="card-badge">De-corrosion Treatment</span>
            </div>
          </div>

          {/* Card 5: Right */}
          <div className="timeline-item right-branch" style={{ top: '68%' }}>
            <div className="tree-card">
              <h3>Face ID & Biometrics Calibration</h3>
              <p>Re-aligning depth-sensing dot projectors, ambient light sensors, and front-facing cameras with precision enclave coding tools.</p>
              <span className="card-badge">Secure Calibration</span>
            </div>
          </div>

          {/* Card 6: Left */}
          <div className="timeline-item left-branch" style={{ top: '82%' }}>
            <div className="tree-card">
              <h3>Chassis & Back Glass Overhaul</h3>
              <p>Replacing shattered rear glass panels and laser-aligning aerospace-grade outer frames for structural integrity and factory finish.</p>
              <span className="card-badge">Precision Laser Align</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content after video - only shown on standalone demo page */}
      {(window.location.pathname === '/demo' || window.location.search.includes('demo')) && (
        <section className="spacer-section">
          <div className="content-box">
            <h2>After the Video</h2>
            <p>The video effect is complete!</p>
            <p>You can now integrate this anywhere in your site.</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ScrollVideoDemo;
