/**
 * LUVAI UNISEX SALON & ACADEMY - INTERACTIVE SCRIPTS
 * Vanilla JS, zero dependencies, lightweight and performant.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initServiceTabs();
  initGalleryFilterAndLightbox();
  initBookingForm();
  initScrollReveals();
  initMinDatePicker();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER TRANSITIONS
-------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
-------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .mobile-nav-drawer .btn');

  if (!hamburgerBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. SMOOTH ANCHOR SCROLLING
-------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  initActiveNavSpy();
}

function initActiveNavSpy() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (navLinks.length === 0) return;

  const sectionData = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#') && id.length > 1) {
      const section = document.querySelector(id);
      if (section) {
        sectionData.push({ id, section, link });
      }
    }
  });

  if (sectionData.length === 0) return;

  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 120;
    let activeItem = sectionData[0];

    for (let i = 0; i < sectionData.length; i++) {
      const { section } = sectionData[i];
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeItem = sectionData[i];
        break;
      } else if (scrollPos >= top) {
        activeItem = sectionData[i];
      }
    }

    sectionData.forEach(({ link }) => {
      if (link === activeItem.link) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();
}

/* --------------------------------------------------------------------------
   4. SERVICES FILTERING & BOOKING AUTO-FILL
-------------------------------------------------------------------------- */
function initServiceTabs() {
  const filterBtns = document.querySelectorAll('.services-filter .filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSelect = document.getElementById('booking-service');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('is-revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle "Book Service" button click on cards
  const bookServiceBtns = document.querySelectorAll('.service-book-btn');
  bookServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-name');
      if (serviceSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value === serviceName) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Scroll smoothly to booking
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        const headerOffset = 90;
        const elementPosition = bookingSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Focus name field
        setTimeout(() => {
          const nameInput = document.getElementById('booking-name');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. GALLERY FILTER & ACCESSIBLE LIGHTBOX
-------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentVisibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  // Gallery category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      currentVisibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  function showImage(index) {
    if (currentVisibleItems.length === 0) return;
    if (index < 0) index = currentVisibleItems.length - 1;
    if (index >= currentVisibleItems.length) index = 0;

    currentIndex = index;
    const item = currentVisibleItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || img?.alt || 'Luvai Unisex Salon';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || title;
    lightboxCaption.textContent = title;
  }

  function openLightbox(item) {
    currentIndex = currentVisibleItems.indexOf(item);
    if (currentIndex === -1) currentIndex = 0;
    showImage(currentIndex);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   6. BOOKING FORM & DIRECT WHATSAPP INTEGRATION
-------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('appointment-form');
  const successModal = document.getElementById('booking-success-modal');
  if (!form) return;

  const summaryDetails = document.getElementById('summary-details');
  const whatsappSyncBtn = document.getElementById('whatsapp-sync-btn');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('booking-name');
    const phoneInput = document.getElementById('booking-phone');
    const serviceSelect = document.getElementById('booking-service');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');
    const notesInput = document.getElementById('booking-notes');

    // Reset error states
    form.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Phone (At least 10 digits)
    const phoneClean = phoneInput.value.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      phoneInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Service
    if (!serviceSelect.value) {
      serviceSelect.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Date
    if (!dateInput.value) {
      dateInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Time
    if (!timeSelect.value) {
      timeSelect.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) {
      const firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }

    // Create Booking details
    const bookingData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: serviceSelect.options[serviceSelect.selectedIndex].text,
      date: dateInput.value,
      time: timeSelect.options[timeSelect.selectedIndex].text,
      notes: notesInput.value.trim() || 'None'
    };

    // Populate Success Modal
    if (summaryDetails) {
      summaryDetails.innerHTML = `
        <p><strong>Guest:</strong> ${escapeHtml(bookingData.name)} (${escapeHtml(bookingData.phone)})</p>
        <p><strong>Service:</strong> ${escapeHtml(bookingData.service)}</p>
        <p><strong>Date & Time:</strong> ${escapeHtml(bookingData.date)} at ${escapeHtml(bookingData.time)}</p>
        ${bookingData.notes !== 'None' ? `<p><strong>Notes:</strong> ${escapeHtml(bookingData.notes)}</p>` : ''}
      `;
    }

    // Pre-fill WhatsApp message
    const message = `Hello Luvai Unisex Salon, I would like to book an appointment:%0A%0A` +
      `*Guest:* ${encodeURIComponent(bookingData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(bookingData.phone)}%0A` +
      `*Service:* ${encodeURIComponent(bookingData.service)}%0A` +
      `*Preferred Date:* ${encodeURIComponent(bookingData.date)}%0A` +
      `*Preferred Time:* ${encodeURIComponent(bookingData.time)}%0A` +
      (bookingData.notes !== 'None' ? `*Notes:* ${encodeURIComponent(bookingData.notes)}%0A%0A` : '%0A') +
      `Please confirm the slot availability. Thank you!`;

    const whatsappUrl = `https://wa.me/919901602126?text=${message}`;

    if (whatsappSyncBtn) {
      whatsappSyncBtn.href = whatsappUrl;
    }

    // Show confirmation dialog
    if (successModal) {
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    // Reset form
    form.reset();
    initMinDatePicker();
  });

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   7. MINIMUM DATE PICKER (No past dates)
-------------------------------------------------------------------------- */
function initMinDatePicker() {
  const dateInput = document.getElementById('booking-date');
  if (!dateInput) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

/* --------------------------------------------------------------------------
   8. INTERSECTION OBSERVER SCROLL REVEALS
-------------------------------------------------------------------------- */
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
