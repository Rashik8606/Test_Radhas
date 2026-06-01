// ===== RADHAS TEXTILES - MAIN SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 900);
  });
  // Fallback
  setTimeout(() => preloader.classList.add('hidden'), 3500);

  // ===== HERO PARTICLES =====
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 4 + 2) + 'px';
      p.style.height = p.style.width;
      p.style.animationDelay = (Math.random() * 5) + 's';
      p.style.animationDuration = (Math.random() * 5 + 5) + 's';
      particleContainer.appendChild(p);
    }
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // ===== BACK TO TOP =====
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== HAMBURGER / MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.style.transitionDelay || '0');
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== GALLERY LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      if (!src) return;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // ===== ENQUIRY FORM =====
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  enquiryForm && enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !category) {
      alert('Please fill in your name, phone number, and select a category.');
      return;
    }

    // Build WhatsApp message
    const waMsg = `Hello Radhas Textiles! 👋%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Looking for:* ${encodeURIComponent(category)}%0A*Message:* ${encodeURIComponent(message || 'No additional message.')}`;
    const waUrl = `https://wa.me/914752228650?text=${waMsg}`;

    // Show success
    enquiryForm.querySelectorAll('input, select, textarea, button').forEach(el => el.style.display = 'none');
    formSuccess.style.display = 'block';

    // Open WhatsApp in new tab
    setTimeout(() => window.open(waUrl, '_blank'), 400);

    // Reset after 5 seconds
    setTimeout(() => {
      enquiryForm.reset();
      enquiryForm.querySelectorAll('input, select, textarea, button').forEach(el => el.style.display = '');
      formSuccess.style.display = 'none';
    }, 5000);
  });

  // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== COLLECTION CARD HOVER EFFECT (tilt) =====
  const cards = document.querySelectorAll('.collection-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -3;
      const rotY = ((x - cx) / cx) * 3;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== WHY CARD COUNTER ANIMATION =====
  // (Runs once when Why section is visible)
  const whySection = document.getElementById('why');
  let whyAnimated = false;
  if (whySection) {
    const whyObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !whyAnimated) {
        whyAnimated = true;
        // Stagger why cards entrance
        document.querySelectorAll('.why-card').forEach((card, i) => {
          card.style.transitionDelay = (i * 0.07) + 's';
        });
        whyObserver.disconnect();
      }
    }, { threshold: 0.1 });
    whyObserver.observe(whySection);
  }

  // ===== ACTIVE NAV HIGHLIGHT ON SCROLL =====
  const sections = document.querySelectorAll('section[id], div[id="highlights"]');
  const navLinksAll = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

});
