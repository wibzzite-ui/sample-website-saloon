import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CircularCarousel from './CircularCarousel';
import './CircularCarousel.css';

if (typeof window !== 'undefined') {
  window.React = React;
}

const SALON_ITEMS = [
  // Ambience
  {
    src: 'assets/images/salon-products-interior.jpg',
    alt: 'Illuminated product display wall and styling stations',
    title: 'Product Suites & Styling Bay',
    subtitle: 'Salon Ambience',
    category: 'ambience'
  },
  {
    src: 'assets/images/salon-styling-stations.jpg',
    alt: 'Modern hair styling mirrors and black leather chairs',
    title: 'Precision Styling Stations',
    subtitle: 'Sanctuary Interior',
    category: 'ambience'
  },
  {
    src: 'assets/images/salon-pedicure-lounge.jpg',
    alt: 'Dedicated pedicure and foot spa deck with armchairs',
    title: 'Pedicure & Spa Lounge',
    subtitle: 'Quiet Rejuvenation',
    category: 'ambience'
  },
  {
    src: 'assets/images/salon-vanity-academy.jpg',
    alt: 'Lighted vanity mirrors for academy and bridal makeup',
    title: 'Vanity Studio & Academy',
    subtitle: 'Mastery Suites',
    category: 'ambience'
  },
  {
    src: 'assets/images/salon-reception.jpg',
    alt: 'Front desk with friendly nature illuminated logo',
    title: 'Reception & Welcome Lounge',
    subtitle: 'Serene Hospitality',
    category: 'ambience'
  },
  // Hair Artistry
  {
    src: 'assets/images/service-hair-balayage-waves.jpg',
    alt: 'Copper balayage wave hair coloring',
    title: 'Copper Balayage Waves',
    subtitle: 'Hair Artistry',
    category: 'hair'
  },
  {
    src: 'assets/images/service-hair-bridal-cascade.jpg',
    alt: 'Bridal cascade curls with hair adornment',
    title: 'Bridal Cascade Styling',
    subtitle: 'Bridal Artistry',
    category: 'hair'
  },
  {
    src: 'assets/images/service-hair-straightening.jpg',
    alt: 'Silk keratin smoothing treatment',
    title: 'Silk Keratin Smoothing',
    subtitle: 'Hair Transformation',
    category: 'hair'
  },
  {
    src: 'assets/images/service-hair-twist-styling.jpg',
    alt: 'Textured half-up twist hairstyle',
    title: 'Textured Half-Up Styling',
    subtitle: 'Editorial Hair',
    category: 'hair'
  },
  {
    src: 'assets/images/service-hair-layered-cut.jpg',
    alt: 'Voluminous layered blowout haircut',
    title: 'Layered Volume Blowout',
    subtitle: 'Hair Artistry',
    category: 'hair'
  },
  // Nail Artistry
  {
    src: 'assets/images/service-nail-purple-glitter.jpg',
    alt: 'Purple glitter nail extensions',
    title: 'Purple Glitter Extensions',
    subtitle: 'Couture Nail Studio',
    category: 'nails'
  },
  {
    src: 'assets/images/service-nail-marble-art.jpg',
    alt: 'Marble swirl handcrafted nail art',
    title: 'Marble Swirl Nail Art',
    subtitle: 'Custom Nail Design',
    category: 'nails'
  },
  {
    src: 'assets/images/service-nail-red-stiletto.jpg',
    alt: 'Classic high-gloss red gel nails',
    title: 'Classic Red Gel Manicure',
    subtitle: 'Nail Studio',
    category: 'nails'
  },
  {
    src: 'assets/images/service-nail-burgundy-gel.jpg',
    alt: 'Deep wine burgundy gloss gel nails',
    title: 'Deep Burgundy Gloss',
    subtitle: 'Gel Manicure',
    category: 'nails'
  },
  {
    src: 'assets/images/service-nail-matte-white.jpg',
    alt: 'Ivory white coffin nails',
    title: 'Soft Ivory Coffin Set',
    subtitle: 'Nail Extension',
    category: 'nails'
  }
];

export const PortfolioCarouselApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoplayMode, setAutoplayMode] = useState('drift');

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all'
    ? SALON_ITEMS
    : SALON_ITEMS.filter(item => item.category === selectedCategory);

  const handleCardClick = (item, index) => {
    // If global lightbox exists in vanilla script, open it!
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
      const lightboxImg = lightbox.querySelector('.lightbox-img');
      const lightboxCaption = lightbox.querySelector('.lightbox-caption');
      if (lightboxImg && lightboxCaption) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt || item.title;
        lightboxCaption.textContent = `${item.title} — ${item.subtitle}`;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }
  };

  return (
    <div className="portfolio-carousel-wrapper">
      {/* Interactive Controls Bar */}
      <div className="portfolio-carousel-controls">
        <div className="control-group">
          <span className="control-label">Curated Collection:</span>
          <div className="pill-group" role="tablist" aria-label="Portfolio Category">
            <button
              type="button"
              className={`carousel-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Artistry ({SALON_ITEMS.length})
            </button>
            <button
              type="button"
              className={`carousel-pill ${selectedCategory === 'ambience' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ambience')}
            >
              Salon Ambience
            </button>
            <button
              type="button"
              className={`carousel-pill ${selectedCategory === 'hair' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('hair')}
            >
              Hair Transformations
            </button>
            <button
              type="button"
              className={`carousel-pill ${selectedCategory === 'nails' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('nails')}
            >
              Couture Nails
            </button>
          </div>
        </div>

        <div className="control-group motion-group">
          <button
            type="button"
            className={`carousel-pill motion-pill ${autoplayMode === 'drift' ? 'active' : ''}`}
            onClick={() => setAutoplayMode(prev => prev === 'drift' ? 'off' : 'drift')}
            title="Toggle drift motion"
          >
            {autoplayMode === 'drift' ? '⏸ Pause Drift' : '▶ Auto Drift'}
          </button>
        </div>
      </div>

      {/* 3D Circular Carousel Stage */}
      <div className="circular-carousel-stage-container">
        <CircularCarousel
          items={filteredItems}
          preset="cylinder"
          intro="rise"
          cardWidth={240}
          aspectRatio={0.92}
          gap={24}
          autoplay={autoplayMode}
          speed={12}
          draggable={true}
          momentum={0.65}
          snap={true}
          pauseOnHover={true}
          focusOnClick={true}
          parallax={0.35}
          depthFade={0.55}
          fadeColor="#161713"
          innerShade={0.5}
          cornerRadius={14}
          captions={true}
          onItemClick={handleCardClick}
          className="salon-circular-carousel"
        />

        {/* Floating Interactive Cue */}
        <div className="carousel-drag-hint">
          <span className="hint-icon">↔</span>
          <span>Click &amp; drag ring to rotate • Click any frame to view in detail</span>
        </div>
      </div>
    </div>
  );
};

// Resilient auto mount
function initPortfolioCarousel() {
  const mountElement = document.getElementById('circular-carousel-root');
  if (mountElement && !mountElement.dataset.mounted) {
    mountElement.dataset.mounted = 'true';
    const root = createRoot(mountElement);
    root.render(<PortfolioCarouselApp />);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioCarousel);
  } else {
    initPortfolioCarousel();
  }
}

export default PortfolioCarouselApp;
