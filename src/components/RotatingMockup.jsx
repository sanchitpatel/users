import React, { useState, useEffect, useRef } from 'react';

export default function RotatingMockup() {
  const [step, setStep] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const frontVideoRef = useRef(null);
  const backVideoRef = useRef(null);
  const frontVideo9Ref = useRef(null);
  const backVideo9Ref = useRef(null);
  const frontVideo7Ref = useRef(null);
  const backVideo7Ref = useRef(null);

  const [videoSources, setVideoSources] = useState({
    video5: '/Video Project 5.mp4',
    video7: '/Video Project 7.mp4',
    video9: '/Video Project 9.mp4'
  });

  const cachedBlobUrlsRef = useRef({});
  const stepRef = useRef(0);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Prefetch and cache the three rotating mockup videos
  useEffect(() => {
    let active = true;
    const cacheName = 'applifix-video-cache';
    const urls = {
      video5: '/Video Project 5.mp4',
      video7: '/Video Project 7.mp4',
      video9: '/Video Project 9.mp4'
    };
    const createdObjectUrls = {};

    const cacheAndLoadVideos = async () => {
      try {
        const cache = await caches.open(cacheName);
        const updatedSources = { ...urls };
        let allCached = true;

        // Perform a quick initial check of the cache
        for (const [key, url] of Object.entries(urls)) {
          const response = await cache.match(url);
          if (response) {
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            createdObjectUrls[key] = objectUrl;
            updatedSources[key] = objectUrl;
          } else {
            allCached = false;
          }
        }

        // If everything is already cached (returning visit), apply Blob URLs immediately
        if (allCached && active) {
          setVideoSources(updatedSources);
          return;
        }

        // If not cached yet (first visit), delay background prefetching to avoid network queue fight
        if (!allCached && active) {
          setTimeout(async () => {
            if (!active) return;
            try {
              for (const [key, url] of Object.entries(urls)) {
                if (createdObjectUrls[key]) continue; // Already loaded from cache

                let response = await cache.match(url);
                if (!response) {
                  const fetched = await fetch(url);
                  if (fetched.ok) {
                    await cache.put(url, fetched.clone());
                    response = fetched;
                  }
                }

                if (response && active) {
                  const blob = await response.blob();
                  const objectUrl = URL.createObjectURL(blob);
                  createdObjectUrls[key] = objectUrl;
                  updatedSources[key] = objectUrl;
                }
              }

              if (active) {
                cachedBlobUrlsRef.current = updatedSources;
                const latestAsset = stepRef.current % 3;
                setVideoSources(prev => {
                  const next = { ...prev };
                  if (latestAsset !== 0 && updatedSources.video5) next.video5 = updatedSources.video5;
                  if (latestAsset !== 1 && updatedSources.video9) next.video9 = updatedSources.video9;
                  if (latestAsset !== 2 && updatedSources.video7) next.video7 = updatedSources.video7;
                  return next;
                });
              }
            } catch (fetchErr) {
              console.warn('[Applifix Cache] Delayed prefetch fetch failed:', fetchErr);
            }
          }, 1200);
        }
      } catch (err) {
        console.warn('[Applifix Cache] Cache storage setup failed for hero videos:', err);
      }
    };

    // Delay caching slightly to prioritize initial page render
    const timer = setTimeout(() => {
      cacheAndLoadVideos();
    }, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      Object.values(createdObjectUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // IntersectionObserver to pause videos when they are scrolled out of view (saving CPU/GPU/battery)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 } // Trigger when at least 15% of the mockup card is visible
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Automatically apply any pending cached Blob URLs to sources when steps change (making them inactive)
  useEffect(() => {
    const currentAsset = step % 3;
    setVideoSources(prev => {
      const next = { ...prev };
      let changed = false;

      if (cachedBlobUrlsRef.current.video5 && next.video5 !== cachedBlobUrlsRef.current.video5 && currentAsset !== 0) {
        next.video5 = cachedBlobUrlsRef.current.video5;
        changed = true;
      }
      if (cachedBlobUrlsRef.current.video9 && next.video9 !== cachedBlobUrlsRef.current.video9 && currentAsset !== 1) {
        next.video9 = cachedBlobUrlsRef.current.video9;
        changed = true;
      }
      if (cachedBlobUrlsRef.current.video7 && next.video7 !== cachedBlobUrlsRef.current.video7 && currentAsset !== 2) {
        next.video7 = cachedBlobUrlsRef.current.video7;
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [step]);

  const lastStepRef = useRef(-1);
  const fallbackTimerRef = useRef(null);
  const rotationAngle = step * 180;

  // Determine the content of each face based on the step.
  // The hidden face maintains its previous content during the transition to prevent visual jumps.
  const getFaceContent = (face) => {
    if (face === 'front') {
      const activeStep = step % 2 === 0 ? step : step - 1;
      const assetIndex = activeStep % 3;
      if (assetIndex === 0) return 'video';
      if (assetIndex === 1) return 'video9';
      return 'video7';
    } else {
      const activeStep = step % 2 === 1 ? step : step - 1;
      if (activeStep < 0) return 'video9'; // Fallback before any flips
      const assetIndex = activeStep % 3;
      if (assetIndex === 0) return 'video';
      if (assetIndex === 1) return 'video9';
      return 'video7';
    }
  };

  const frontContent = getFaceContent('front');
  const backContent = getFaceContent('back');

  // Handle step timers and video playback triggers
  useEffect(() => {
    if (!isVisible) {
      // Pause all front and back videos when the mockup is scrolled out of view to save battery and performance
      [
        frontVideoRef.current, backVideoRef.current,
        frontVideo9Ref.current, backVideo9Ref.current,
        frontVideo7Ref.current, backVideo7Ref.current
      ].forEach(v => {
        if (v) {
          try {
            v.pause();
          } catch (e) {}
        }
      });
      clearTimeout(fallbackTimerRef.current);
      return;
    }

    const currentAsset = step % 3;
    // Video steps: Play immediately when the card starts rotating
    const delay = 10;
    const timer = setTimeout(() => {
      // Clear any existing fallback timers
      clearTimeout(fallbackTimerRef.current);

      // Pause all front and back videos first to release decoding resource overhead
      [
        frontVideoRef.current, backVideoRef.current,
        frontVideo9Ref.current, backVideo9Ref.current,
        frontVideo7Ref.current, backVideo7Ref.current
      ].forEach(v => {
        if (v) {
          try {
            v.pause();
          } catch (e) {}
        }
      });

      let activeVideo;
      if (currentAsset === 0) {
        activeVideo = (step % 2 === 0) ? frontVideoRef.current : backVideoRef.current;
      } else if (currentAsset === 1) {
        activeVideo = (step % 2 === 0) ? frontVideo9Ref.current : backVideo9Ref.current;
      } else {
        activeVideo = (step % 2 === 0) ? frontVideo7Ref.current : backVideo7Ref.current;
      }

      if (activeVideo) {
        if (lastStepRef.current !== step) {
          activeVideo.currentTime = 0;
          lastStepRef.current = step;
        }

        // Try playing the video
        activeVideo.play()
          .then(() => {
            // Autoplay/playback succeeded, clear the fallback timer
            clearTimeout(fallbackTimerRef.current);
          })
          .catch(err => {
            console.warn("Autoplay blocked or playback failed (possibly Low Power Mode):", err);
            // Low Power Mode fallback: Automatically rotate to the next card after video ends
            clearTimeout(fallbackTimerRef.current);
            const fallbackDelay = activeVideo.duration ? (activeVideo.duration * 1000) + 500 : 6500;
            fallbackTimerRef.current = setTimeout(() => {
              handleVideoEnded();
            }, fallbackDelay);
          });
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimerRef.current);
    };
  }, [step, videoSources, isVisible]);

  // Handle video ended event to automatically advance the flip steps
  const handleVideoEnded = () => {
    setStep(prev => prev + 1);
  };

  return (
    <div ref={containerRef} className="showcase-card relative mx-auto w-[290px] min-[375px]:w-[335px] sm:w-[480px] md:w-[630px] h-[250px] min-[375px]:h-[285px] sm:h-[410px] md:h-[540px] bg-transparent rounded-[24px] sm:rounded-[36px] md:rounded-[44px] border border-none shadow-[0_10px_30px_rgba(0,0,0,0.08),_inset_0_1px_0_rgba(255,255,255,0.3)] overflow-hidden select-none">
      {/* 3D Flipper Container for screen */}
      <div
        className="showcase-inner"
        style={{ transform: `rotateY(${rotationAngle}deg)` }}
      >

        {/* Front Side */}
        <div className="showcase-face showcase-face-front relative">
          <video
            ref={frontVideoRef}
            src={videoSources.video5}
            preload="auto"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: frontContent === 'video' ? 1 : 0,
              pointerEvents: frontContent === 'video' ? 'auto' : 'none'
            }}
          />
          <video
            ref={frontVideo9Ref}
            src={videoSources.video9}
            preload="none"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: frontContent === 'video9' ? 1 : 0,
              pointerEvents: frontContent === 'video9' ? 'auto' : 'none'
            }}
          />
          <video
            ref={frontVideo7Ref}
            src={videoSources.video7}
            preload="none"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: frontContent === 'video7' ? 1 : 0,
              pointerEvents: frontContent === 'video7' ? 'auto' : 'none'
            }}
          />
        </div>

        {/* Back Side */}
        <div className="showcase-face showcase-face-back bg-[#e3e3e3] relative">
          <video
            ref={backVideoRef}
            src={videoSources.video5}
            preload="auto"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: backContent === 'video' ? 1 : 0,
              pointerEvents: backContent === 'video' ? 'auto' : 'none'
            }}
          />
          <video
            ref={backVideo9Ref}
            src={videoSources.video9}
            preload="none"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: backContent === 'video9' ? 1 : 0,
              pointerEvents: backContent === 'video9' ? 'auto' : 'none'
            }}
          />
          <video
            ref={backVideo7Ref}
            src={videoSources.video7}
            preload="none"
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover absolute top-0 left-0"
            style={{
              opacity: backContent === 'video7' ? 1 : 0,
              pointerEvents: backContent === 'video7' ? 'auto' : 'none'
            }}
          />
        </div>

      </div>
    </div>
  );
}
