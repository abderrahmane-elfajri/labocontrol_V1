// LABOCONTROL — Terrain interactions
(function(){
  // ------------- Nav scroll state & Floating call -------------
  const nav = document.querySelector('.nav');
  const floatingCall = document.querySelector('.floating-call');
  const onScroll = () => {
    if (nav) {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    if (floatingCall) {
      if (window.scrollY > 260) floatingCall.classList.add('is-visible');
      else floatingCall.classList.remove('is-visible');
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------------- Reveal on scroll -------------
  document.documentElement.classList.add('js-ready');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Safety fallback: reveal all elements so content is never stuck or hidden
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 600);

  // ------------- Counters -------------
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const dur = 1600;
      const start = performance.now();
      const isFloat = target % 1 !== 0;
      function tick(t){
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString('fr-FR');
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString('fr-FR');
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  // ------------- Map pin ↔ agency list sync (Desktop hover + Mobile touch/click) -------------
  const pins = document.querySelectorAll('.map__pin');
  const agencies = document.querySelectorAll('.agency');
  const agCards = document.querySelectorAll('.ag-card');

  function activate(idx){
    pins.forEach((p, i) => p.classList.toggle('active', i === idx));
    agencies.forEach((a, i) => a.classList.toggle('active', i === idx));
    agCards.forEach((c, i) => c.classList.toggle('active', i === idx));
  }

  pins.forEach((p, i) => {
    p.addEventListener('mouseenter', () => activate(i));
    p.addEventListener('click', (e) => { e.preventDefault(); activate(i); });
    p.addEventListener('touchstart', () => activate(i), { passive: true });
  });

  agencies.forEach((a, i) => {
    a.addEventListener('mouseenter', () => activate(i));
    a.addEventListener('click', () => activate(i));
    a.addEventListener('touchstart', () => activate(i), { passive: true });
  });

  agCards.forEach((c, i) => {
    c.addEventListener('mouseenter', () => activate(i));
    c.addEventListener('click', () => activate(i));
    c.addEventListener('touchstart', () => activate(i), { passive: true });
  });

  // ------------- Mobile burger drawer -------------
  const burger = document.querySelector('.nav__burger');
  const drawer = document.querySelector('.mobile-drawer');
  if (burger){
    burger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }
  // Close drawer on close button click and link click
  if (drawer){
    const closeBtn = drawer.querySelector('.mobile-drawer__close');
    if (closeBtn){
      closeBtn.addEventListener('click', () => document.body.classList.remove('menu-open'));
    }
    // Ensure mobile sub-menu has rich tags and overview link matching desktop
    const subMenu = drawer.querySelector('.mobile-drawer__sub');
    if (subMenu && !subMenu.querySelector('.drop-tag')) {
      const isSubDir = window.location.pathname.includes('/services/');
      const prefix = isSubDir ? '' : 'services/';
      const allHref = isSubDir ? '../services.html' : 'services.html';
      subMenu.innerHTML = `
        <a href="${allHref}" class="drop-all"><span>Vue d'ensemble des 5 disciplines</span> <span class="drop-tag">Tout voir →</span></a>
        <a href="${prefix}geotechnique.html"><span>01 · Études géotechniques</span> <span class="drop-tag">Sondages</span></a>
        <a href="${prefix}expertises.html"><span>02 · Expertises &amp; diagnostic</span> <span class="drop-tag">Structure</span></a>
        <a href="${prefix}beton.html"><span>03 · Essais sur béton frais</span> <span class="drop-tag">NF EN 12350</span></a>
        <a href="${prefix}granulats.html"><span>04 · Contrôle des granulats</span> <span class="drop-tag">NF EN 933</span></a>
        <a href="${prefix}impact.html"><span>05 · Environnement &amp; Eau</span> <span class="drop-tag">ISO 17025</span></a>
      `;
    }

    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        setTimeout(() => {
          document.body.classList.remove('menu-open');
        }, 150);
      });
    });
  }
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
  });

  // ------------- Hero headline rotator -------------
  const rotator = document.querySelector('[data-rotator]');
  if (rotator){
    const raw = rotator.dataset.rotator || '';
    const items = raw.split('|').map(s => s.trim()).filter(Boolean);
    if (items.length > 1){
      let idx = 0;
      let slot = rotator.querySelector('.h-slot');
      let isRotating = false;

      const rotate = () => {
        if (isRotating || document.hidden) return;
        isRotating = true;
        idx = (idx + 1) % items.length;
        const old = slot;
        const next = document.createElement('span');
        next.className = 'h-slot h-slot--enter';
        next.innerHTML = items[idx];
        rotator.appendChild(next);

        // Force reflow before applying classes
        void next.offsetHeight;

        if (old) {
          old.classList.remove('h-slot--in');
          old.classList.add('h-slot--exit');
        }

        requestAnimationFrame(() => {
          next.classList.remove('h-slot--enter');
          next.classList.add('h-slot--in');
        });
        slot = next;

        setTimeout(() => {
          if (old && old.parentNode) old.remove();
          isRotating = false;
        }, 700);
      };
      setInterval(rotate, 5500);
    }
  }

  // ------------- Magnetic buttons (desktop mouse only) -------------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.12}px, ${my * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ------------- Testimonials carousel -------------
  const testimonials = [
    {
      q: '« Sur nos chantiers, un rapport <em>Labocontrol</em> vaut plus qu\'un permis de construire.<br>C\'est ce qui rassure notre bureau de contrôle et nos investisseurs. »',
      mark: 'TG',
      name: 'Youssef T.',
      role: 'Directeur technique · Grand groupe BTP casablancais',
    },
    {
      q: '« Nous avons cherché pendant des années un labo qui livre <em>à l\'heure</em>, avec un ingénieur au bout du fil. Depuis 2018, on ne cherche plus. »',
      mark: 'OC',
      name: 'Nadia H.',
      role: 'Cheffe de projet · Office public marocain',
    },
    {
      q: '« Un désordre structurel dans un silo — trois experts consultés, trois avis différents.<br>Le rapport de Labocontrol a <em>tranché</em>, avec des chiffres. »',
      mark: 'IN',
      name: 'Karim B.',
      role: 'Ingénieur en chef · Industriel du phosphate',
    },
  ];
  const testiQ = document.querySelector('.testi__quote');
  const testiMark = document.querySelector('.testi__author__mark');
  const testiName = document.querySelector('.testi__author__name');
  const testiRole = document.querySelector('.testi__author__role');
  const testiDots = document.querySelectorAll('.testi__dot');
  let testiIdx = 0;
  function setTesti(i){
    if (!testiQ) return;
    testiIdx = i;
    testiQ.style.opacity = 0;
    testiMark.style.opacity = 0;
    setTimeout(() => {
      testiQ.innerHTML = testimonials[i].q;
      testiMark.textContent = testimonials[i].mark;
      testiName.textContent = testimonials[i].name;
      testiRole.textContent = testimonials[i].role;
      testiQ.style.opacity = 1;
      testiMark.style.opacity = 1;
    }, 300);
    testiDots.forEach((d, j) => d.classList.toggle('testi__dot--active', j === i));
  }
  testiDots.forEach((d, i) => d.addEventListener('click', () => setTesti(i)));
  if (testiDots.length){
    // Add smooth transition
    if (testiQ){ testiQ.style.transition = 'opacity .3s'; testiMark.style.transition = 'opacity .3s'; }
    // Auto-cycle
    setInterval(() => {
      setTesti((testiIdx + 1) % testimonials.length);
    }, 8000);
  }

  // ------------- Parallax on hero image -------------
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg){
    document.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 900) heroBg.style.transform = `scale(${1.06 + y * 0.00018}) translateY(${y * 0.15}px)`;
    }, { passive: true });
  }

  // ------------- Quote & Contact Form Submission Feedback -------------
  document.querySelectorAll('form').forEach(form => {
    if (form.classList.contains('footer__nl-form')) return;
    if (form.classList.contains('footer__nl-form') ) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Transmission en cours...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }

        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback';
          form.appendChild(feedback);
        }
        
        const refNum = 'LC-2026-T' + Math.floor(1000 + Math.random() * 9000);
        feedback.innerHTML = `
          <div style="background: var(--bg); border: 1px solid var(--line); border-left: 4px solid var(--accent); padding: 20px 24px; border-radius: var(--radius); font-size: 15px; line-height: 1.55; margin-top: 20px; box-shadow: 0 4px 16px rgba(20,16,14,0.06);">
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
              <span class="badge--blue">DOSSIER ENREGISTRÉ</span>
              <span style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; color: var(--accent); font-weight: 600;">RÉF. ${refNum}</span>
            </div>
            <strong style="font-family: var(--serif); font-size: 20px; color: var(--ink); display: block; margin-bottom: 6px; line-height: 1.2;">Votre demande d'intervention &amp; devis a été transmise.</strong>
            <p style="color: var(--ink-2); margin: 0; font-size: 14px;">Nos ingénieurs géotechniciens et directeurs techniques de l'agence vous contacteront sous 24h ouvrées. Un accusé de réception officiel est en cours d'envoi.</p>
          </div>
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        form.reset();
      }, 650);
    });
  });

  // ------------- Project Category Filtering -------------
  const pjFilters = document.querySelectorAll('.pj-filter');
  const pjItems = document.querySelectorAll('.pj-item');
  if (pjFilters.length && pjItems.length) {
    pjFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        pjFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter || 'all';

        pjItems.forEach(item => {
          const cat = item.dataset.category || '';
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
            item.classList.add('in');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

})();

