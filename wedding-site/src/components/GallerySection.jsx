import { useState, useEffect, useCallback, useRef } from "react";

/*
 * ─── LÄGG TILL ERA BILDER HÄR ───
 * Placera bilderna i public/images/ i ditt Vite-projekt.
 * Lägg till fler objekt i arrayen för fler bilder.
 */
const GALLERY_IMAGES = [
  { src: "/images/couple-1.jpeg", alt: "Vi tillsammans" },
  { src: "/images/couple-2.jpeg", alt: "Förlovningen" },
  { src: "/images/couple-3.jpeg", alt: "Ett fint minne" },
  { src: "/images/couple-4.jpeg", alt: "Ett fint minne" },
  { src: "/images/couple-5.jpeg", alt: "Ett fint minne" },
  { src: "/images/couple-6.jpeg", alt: "Ett fint minne" },
  { src: "/images/couple-7.jpeg", alt: "Ett fint minne" },
];

const AUTO_PLAY_INTERVAL = 5000;

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const total = GALLERY_IMAGES.length;

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pause on hover
  const pauseAutoPlay = () => clearInterval(timerRef.current);
  const resumeAutoPlay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
  };

  return (
    <section id="galleri" className="gallery">
      <div className="gallery__inner">
        <p className="section-label">Ögonblick</p>
        <h2 className="section-title">Vårt Galleri</h2>

        <div
          className="gallery__carousel"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Images */}
          <div className="gallery__track">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`gallery__slide ${i === current ? "gallery__slide--active" : ""}`}
              >
                <img src={img.src} alt={img.alt} className="gallery__image" />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            className="gallery__arrow gallery__arrow--prev"
            onClick={prev}
            aria-label="Föregående bild"
          >
            ‹
          </button>
          <button
            className="gallery__arrow gallery__arrow--next"
            onClick={next}
            aria-label="Nästa bild"
          >
            ›
          </button>

          {/* Dots */}
          <div className="gallery__dots">
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`gallery__dot ${i === current ? "gallery__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Gå till bild ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}