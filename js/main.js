/* ===========================
   LC BATERIAS - JavaScript Principal
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---- Hamburger menu ----
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '';
      spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Hero Slider ----
  window.initHeroSlider = function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    if (window._sliderInterval) clearInterval(window._sliderInterval);

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      currentSlide = (index + slides.length) % slides.length;
      if (slides[currentSlide]) slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoplay() {
      window._sliderInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(window._sliderInterval);
    }

    if (slides.length > 0) {
      goToSlide(0);
      startAutoplay();

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          stopAutoplay();
          goToSlide(i);
          startAutoplay();
        });
      });

      const arrowLeft = document.querySelector('.hero-arrow-left');
      const arrowRight = document.querySelector('.hero-arrow-right');

      if (arrowLeft) arrowLeft.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
      if (arrowRight) arrowRight.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
    }
  };

  window.initHeroSlider();

  // ---- Product filters ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ---- Stats counter animation ----
  function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('pt-BR');
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target.querySelector('.stat-number');
          if (el && !el.dataset.animated) {
            el.dataset.animated = '1';
            animateCounter(el, parseFloat(el.dataset.target));
          }
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
  }

  // ---- Scroll reveal ----
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .blog-card, .unit-card');

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 80);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObs.observe(el));
  }

  // ---- Contact form ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Mensagem enviada!';
      btn.disabled = true;
      btn.style.background = '#10B981';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3500);
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Blog: busca, categorias e paginação ----
  const blogGrid = document.querySelector('.blog-main-grid');
  const blogCards = blogGrid ? Array.from(blogGrid.querySelectorAll('.blog-card')) : [];

  if (blogCards.length > 0) {
    const POSTS_PER_PAGE = 4;
    let currentCategory = 'all';
    let currentSearch = '';
    let currentPage = 1;

    const searchInput = document.querySelector('#blog-search');
    const searchBtn = document.querySelector('#blog-search-btn');
    const noResults = document.querySelector('#blog-no-results');
    const pagination = document.querySelector('#blog-pagination');

    function getFiltered() {
      return blogCards.filter(card => {
        const matchCat = currentCategory === 'all' || card.dataset.category === currentCategory;
        const matchSearch = currentSearch === '' || card.innerText.toLowerCase().includes(currentSearch);
        return matchCat && matchSearch;
      });
    }

    function updatePagination(totalFiltered) {
      if (!pagination) return;
      const totalPages = Math.max(1, Math.ceil(totalFiltered / POSTS_PER_PAGE));
      const pageBtns = pagination.querySelectorAll('.page-btn[data-page]');
      const nextBtn = pagination.querySelector('.page-btn-next');

      pageBtns.forEach(btn => {
        const page = parseInt(btn.dataset.page);
        const isActive = page === currentPage;
        const visible = page <= totalPages;
        btn.style.display = visible ? '' : 'none';
        btn.style.background = isActive ? 'var(--primary)' : '#fff';
        btn.style.color = isActive ? '#fff' : 'var(--text-gray)';
        btn.style.borderColor = isActive ? 'var(--primary)' : 'var(--border)';
      });

      if (nextBtn) nextBtn.style.display = currentPage >= totalPages ? 'none' : '';
      pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
    }

    function render() {
      const filtered = getFiltered();
      const start = (currentPage - 1) * POSTS_PER_PAGE;
      const pageItems = filtered.slice(start, start + POSTS_PER_PAGE);

      blogCards.forEach(card => { card.style.display = 'none'; });
      pageItems.forEach(card => {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });

      if (noResults) noResults.style.display = filtered.length === 0 ? 'block' : 'none';
      updatePagination(filtered.length);
    }

    // Filtros de categoria (topo)
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.filter;
        currentPage = 1;
        render();
      });
    });

    // Links de categoria da sidebar
    document.querySelectorAll('.sidebar-cat-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const cat = link.dataset.filter;
        currentCategory = cat;
        currentPage = 1;
        document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filter === cat);
        });
        render();
        blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Busca
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.toLowerCase().trim();
        currentPage = 1;
        render();
      });
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') { currentSearch = searchInput.value.toLowerCase().trim(); currentPage = 1; render(); }
      });
    }
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        currentSearch = searchInput.value.toLowerCase().trim();
        currentPage = 1;
        render();
      });
    }

    // Paginação
    if (pagination) {
      pagination.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
          currentPage = parseInt(btn.dataset.page);
          render();
          blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      const nextBtn = pagination.querySelector('.page-btn-next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const totalPages = Math.ceil(getFiltered().length / POSTS_PER_PAGE);
          if (currentPage < totalPages) { currentPage++; render(); blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
      }
    }

    render();
  }

});
