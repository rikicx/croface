/* ==========================================================================
   CROFACE — comportamento da página (JavaScript puro, sem bibliotecas)
   Tudo aqui é melhoria progressiva: sem JS, a página continua completa.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menu em tela cheia ---------- */
  function initMenu() {
    var overlay = document.getElementById('menu');
    var toggle = document.querySelector('.menu-toggle');
    if (!overlay || !toggle) return;
    var closeBtn = overlay.querySelector('.overlay__close');
    var lastFocus = null;

    function focusables() {
      return Array.prototype.slice.call(
        overlay.querySelectorAll('a[href], button:not([disabled])')
      );
    }
    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      window.setTimeout(function () { closeBtn.focus(); }, 50);
    }
    function close(restore) {
      overlay.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restore !== false && lastFocus) lastFocus.focus();
    }

    toggle.addEventListener('click', function (e) { e.preventDefault(); open(); });
    closeBtn.addEventListener('click', function (e) { e.preventDefault(); close(); });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var items = focusables();
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    overlay.querySelectorAll('.overlay__item').forEach(function (link) {
      link.addEventListener('click', function () { close(false); });
    });
    // Caso a página seja aberta com #menu (modo sem JS), normaliza para o modo com JS.
    if (location.hash === '#menu') { history.replaceState(null, '', location.pathname); open(); }
  }

  /* ---------- Header: marca a página como "rolada" quando o header sai da tela ---------- */
  function initScrolled() {
    var header = document.querySelector('.site-header');
    if (!header || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      document.body.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(header);
  }

  /* ---------- Barra de seções sobre o hero: fica mais opaca quando gruda no topo ---------- */
  function initBarStuck() {
    var bar = document.querySelector('.section-bar');
    if (!bar) return;
    var ticking = false;
    function update() {
      // A barra está "grudada" quando o topo dela encosta no topo da janela.
      bar.classList.toggle('is-stuck', bar.getBoundingClientRect().top <= 1 && window.scrollY > 0);
      document.body.classList.toggle('show-top', window.scrollY > window.innerHeight * 1.2);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
    var top = document.querySelector('.to-top');
    if (top) top.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var brand = document.querySelector('.brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ---------- Hero preso: o conteúdo sobe por cima; o texto some e a foto escurece ---------- */
  function initHeroPin() {
    var hero = document.querySelector('.hero');
    if (!hero || reduceMotion) return;
    var content = hero.querySelector('.hero__content');
    var img = hero.querySelector('.hero__media img');
    var ticking = false;
    function update() {
      var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      hero.style.setProperty('--cover', p.toFixed(3));
      if (content) {
        content.style.opacity = Math.max(0, 1 - p * 1.6).toFixed(3);
        content.style.transform = 'translate3d(0,' + (-p * 90).toFixed(1) + 'px,0)';
      }
      if (img) img.style.transform = 'scale(' + (1 + p * 0.08).toFixed(4) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Mega-menus: abrem no hover, no foco e no clique; Esc e clique fora fecham ---------- */
  function initMega() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.nav__item--mega'));
    function setOpen(item, open) {
      item.classList.toggle('is-open', open);
      item.classList.toggle('is-closed', !open && item.contains(document.activeElement));
      var t = item.querySelector('.nav__trigger');
      if (t) t.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    items.forEach(function (item) {
      var trigger = item.querySelector('.nav__trigger');
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault(); // clicar abre o menu em vez de pular para a home
          var willOpen = !item.classList.contains('is-open');
          items.forEach(function (other) { if (other !== item) setOpen(other, false); });
          setOpen(item, willOpen);
        });
      }
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setOpen(item, false); item.classList.add('is-closed'); trigger && trigger.focus(); }
      });
      item.addEventListener('mouseenter', function () { item.classList.remove('is-closed'); });
      item.addEventListener('mouseleave', function () { setOpen(item, false); item.classList.remove('is-closed'); });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) { setOpen(item, false); item.classList.remove('is-closed'); }
      });
    });
    document.addEventListener('click', function (e) {
      items.forEach(function (item) { if (!item.contains(e.target)) setOpen(item, false); });
    });
  }

  /* ---------- Foto fixa: troca conforme o passo que está no centro da tela ---------- */
  function initScrolly() {
    if (!('IntersectionObserver' in window)) return;
    document.querySelectorAll('[data-scrolly]').forEach(function (root) {
      var steps = root.querySelectorAll('.scrolly__step');
      var imgs = root.querySelectorAll('.scrolly__img');
      if (!steps.length || !imgs.length) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var idx = entry.target.getAttribute('data-media');
          steps.forEach(function (st) { st.classList.toggle('is-active', st === entry.target); });
          imgs.forEach(function (im) { im.classList.toggle('is-active', im.getAttribute('data-index') === idx); });
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(function (st) { io.observe(st); });
    });
  }

  /* ---------- Barra de seções: destaca a seção atual ---------- */
  function initSectionBar() {
    var bar = document.querySelector('.section-bar__list');
    if (!bar || !('IntersectionObserver' in window)) return;
    var links = {};
    bar.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = links[entry.target.id];
        if (!link || link === current) return;
        if (current) current.removeAttribute('aria-current');
        link.setAttribute('aria-current', 'true');
        current = link;
        // Rola só a barra (não a página) para manter o item ativo visível no celular.
        var left = link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2;
        bar.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Revelação ao rolar (com cascata nos grupos e fotos que se revelam) ---------- */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    // Filhos destes grupos entram em cascata.
    var groups = ['.explorer__list', '.carousel__track', '.people', '.gallery__grid', '.options', '.related',
      '.checks', '.faq', '.chain', '.cta-band__side ul', '.visit__links', '.facts'];
    groups.forEach(function (sel) {
      document.querySelectorAll('main ' + sel).forEach(function (g) {
        Array.prototype.forEach.call(g.children, function (ch) { ch.classList.add('reveal'); });
      });
    });
    // Fotos do conteúdo (exceto capas, parallax e a foto fixa, que têm movimento próprio).
    document.querySelectorAll('main picture').forEach(function (p) {
      if (p.closest('.hero, .page-hero, .scrolly__img, .stepper__media') || p.querySelector('[data-parallax]')) return;
      p.classList.add('reveal-img');
    });

    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      shown.sort(function (x, y) {
        var a = x.getBoundingClientRect(), b = y.getBoundingClientRect();
        return (a.top - b.top) || (a.left - b.left);
      });
      shown.forEach(function (el, i) {
        var delay = Math.min(i, 6) * 90;
        if (delay) {
          el.style.transitionDelay = delay + 'ms';
          window.setTimeout(function () { el.style.transitionDelay = ''; }, delay + 1600);
        }
        if (el.classList.contains('reveal-img')) { el.classList.add('reveal-img-in'); el.classList.remove('reveal-img-pending'); }
        else { el.classList.add('reveal-in'); el.classList.remove('reveal-pending'); }
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal, .reveal-img').forEach(function (el) {
      // Só esconde o que ainda está abaixo da dobra: nada "pisca" no carregamento.
      if (el.getBoundingClientRect().top > vh * 0.92) {
        el.classList.add(el.classList.contains('reveal-img') ? 'reveal-img-pending' : 'reveal-pending');
        io.observe(el);
      }
    });
  }

  /* ---------- Parallax leve ---------- */
  function initParallax() {
    if (reduceMotion) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
        el.style.transform = 'translate3d(0,' + (progress * -40).toFixed(1) + 'px,0) scale(1.1)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Abas: galeria, explorador de queixas (vertical) e stepper ---------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (root) {
      if (root.hasAttribute('data-stepper') && hscrollEnabled()) return; // tratado em initHscroll
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
      var nav = root.querySelector('[role="tablist"]');
      var prev = root.querySelector('[data-step="prev"]'), next = root.querySelector('[data-step="next"]');
      var count = root.querySelector('[data-step-count]');
      var current = 0;
      root.classList.add('is-enhanced', 'is-ready');

      function select(i, opts) {
        opts = opts || {};
        current = i;
        tabs.forEach(function (t, j) {
          var on = i === j;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.tabIndex = on ? 0 : -1;
          panels[j].hidden = !on;
          panels[j].classList.toggle('is-entering', on && !reduceMotion && !opts.initial);
        });
        if (nav && root.hasAttribute('data-stepper')) nav.style.setProperty('--p', (i + 1) / tabs.length);
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === tabs.length - 1;
        if (count) count.textContent = 'Etapa ' + (i + 1) + ' de ' + tabs.length;
        if (opts.focus) tabs[i].focus();
        // No celular, o detalhe do explorador fica abaixo da lista: traz para a vista.
        if (opts.reveal && root.hasAttribute('data-explorer') && window.innerWidth < 960) {
          var r = panels[i].getBoundingClientRect();
          if (r.top > window.innerHeight * 0.7) panels[i].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(i, { reveal: true }); });
        tab.addEventListener('keydown', function (e) {
          var n = tabs.length, k = e.key, go = null;
          if (k === 'ArrowRight' || k === 'ArrowDown') go = (i + 1) % n;
          else if (k === 'ArrowLeft' || k === 'ArrowUp') go = (i - 1 + n) % n;
          else if (k === 'Home') go = 0;
          else if (k === 'End') go = n - 1;
          if (go !== null) { e.preventDefault(); select(go, { focus: true }); }
        });
      });
      if (prev) prev.addEventListener('click', function () { if (current > 0) select(current - 1); });
      if (next) next.addEventListener('click', function () { if (current < tabs.length - 1) select(current + 1); });
      // Deslize lateral (toque) no stepper
      if (root.hasAttribute('data-stepper')) {
        var sx = null;
        root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
        root.addEventListener('touchend', function (e) {
          if (sx === null) return;
          var dx = e.changedTouches[0].clientX - sx; sx = null;
          if (dx < -50 && current < tabs.length - 1) select(current + 1);
          else if (dx > 50 && current > 0) select(current - 1);
        });
      }
      select(0, { initial: true });
    });
  }

  /* ---------- Primeira consulta: rolagem horizontal presa (desktop) ---------- */
  function hscrollEnabled() {
    return !reduceMotion && window.matchMedia('(min-width: 900px)').matches;
  }
  function initHscroll() {
    if (!hscrollEnabled()) return;
    document.querySelectorAll('[data-stepper]').forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      var panels = tabs.map(function (tb) { return document.getElementById(tb.getAttribute('aria-controls')); });
      var track = root.querySelector('.stepper__track');
      var pin = root.querySelector('.stepper__pin');
      var nav = root.querySelector('[role="tablist"]');
      var prev = root.querySelector('[data-step="prev"]'), next = root.querySelector('[data-step="next"]');
      var count = root.querySelector('[data-step-count]');
      var n = tabs.length, active = -1;
      root.style.setProperty('--n', n);
      root.classList.add('is-hscroll', 'is-ready');
      panels.forEach(function (p) { p.hidden = false; });

      function range() { return Math.max(1, root.offsetHeight - pin.offsetHeight); }
      function goTo(i) {
        var top = root.getBoundingClientRect().top + window.scrollY - (pin.getBoundingClientRect().top - root.getBoundingClientRect().top >= 0 ? 0 : 0);
        var barH = parseFloat(getComputedStyle(pin).top) || 0;
        window.scrollTo({ top: top - barH + range() * (i / (n - 1)) + 2, behavior: 'smooth' });
      }
      function setActive(i) {
        if (i === active) return;
        active = i;
        tabs.forEach(function (tb, j) {
          tb.setAttribute('aria-selected', j === i ? 'true' : 'false');
          tb.tabIndex = j === i ? 0 : -1;
          panels[j].setAttribute('aria-hidden', j === i ? 'false' : 'true');
          panels[j].inert = j !== i;
        });
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === n - 1;
        if (count) count.textContent = 'Etapa ' + (i + 1) + ' de ' + n;
      }
      var ticking = false;
      function update() {
        var barH = parseFloat(getComputedStyle(pin).top) || 0;
        var p = Math.min(1, Math.max(0, (barH - root.getBoundingClientRect().top) / range()));
        var pos = p * (n - 1);
        track.style.transform = 'translate3d(calc(' + (-pos * 100).toFixed(3) + '% - ' + (pos).toFixed(3) + ' * var(--bleed)),0,0)';
        nav.style.setProperty('--p', ((pos + 1) / n).toFixed(4));
        panels.forEach(function (pn, j) { pn.style.setProperty('--off', Math.min(1, Math.abs(pos - j)).toFixed(3)); });
        setActive(Math.round(pos));
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      window.addEventListener('resize', update);
      tabs.forEach(function (tb, i) {
        tb.addEventListener('click', function () { goTo(i); });
        tb.addEventListener('keydown', function (e) {
          var k = e.key, go = null;
          if (k === 'ArrowRight' || k === 'ArrowDown') go = Math.min(n - 1, i + 1);
          else if (k === 'ArrowLeft' || k === 'ArrowUp') go = Math.max(0, i - 1);
          if (go !== null) { e.preventDefault(); tabs[go].focus(); goTo(go); }
        });
      });
      if (prev) prev.addEventListener('click', function () { goTo(Math.max(0, active - 1)); });
      if (next) next.addEventListener('click', function () { goTo(Math.min(n - 1, active + 1)); });
      update();
    });
  }

  /* ---------- Carrossel: rolagem nativa (toque), setas, progresso e arrastar com o mouse ---------- */
  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (root) {
      var track = root.querySelector('.carousel__track');
      var prev = root.querySelector('[data-dir="-1"]'), next = root.querySelector('[data-dir="1"]');
      var bar = root.querySelector('.carousel__progress span');
      if (!track) return;
      root.classList.add('is-ready');

      function stepSize() {
        var first = track.children[0];
        var gap = parseFloat(getComputedStyle(track).columnGap) || 16;
        return first ? first.getBoundingClientRect().width + gap : 300;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth;
        var vis = Math.min(1, track.clientWidth / track.scrollWidth);
        var p = max > 0 ? track.scrollLeft / max : 0;
        if (bar) {
          bar.style.width = (vis * 100) + '%';
          bar.style.transform = 'translateX(' + (p * (1 - vis) / vis * 100) + '%)';
        }
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max - 2;
      }
      [prev, next].forEach(function (btn) {
        if (!btn) return;
        btn.addEventListener('click', function () {
          track.scrollBy({ left: stepSize() * +btn.getAttribute('data-dir'), behavior: reduceMotion ? 'auto' : 'smooth' });
        });
      });
      var ticking = false;
      track.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(function () { update(); ticking = false; }); ticking = true; }
      }, { passive: true });
      window.addEventListener('resize', update);

      // Arrastar com o mouse (no toque, a rolagem nativa já resolve).
      var down = false, moved = false, startX = 0, startLeft = 0;
      track.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('is-dragging'); }
        if (moved) { track.scrollLeft = startLeft - dx; e.preventDefault(); }
      });
      window.addEventListener('pointerup', function () {
        if (!down) return;
        down = false;
        if (moved) {
          track.classList.remove('is-dragging');
          // Encaixa no card mais próximo ao soltar.
          var s = stepSize();
          track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
      track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
      track.addEventListener('dragstart', function (e) { e.preventDefault(); });
      update();
    });
  }

  /* ---------- Mapa: carrega o Google Maps só quando pedido ---------- */
  function initMap() {
    document.querySelectorAll('[data-map-src]').forEach(function (map) {
      var btn = map.querySelector('.map__load');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var iframe = document.createElement('iframe');
        iframe.src = map.getAttribute('data-map-src');
        iframe.title = 'Mapa: Rua Coronel Diogo, 484, Vila Mariana, São Paulo';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        map.appendChild(iframe);
        map.classList.add('is-loaded');
        iframe.focus();
        track('mapa_carregado');
      });
    });
  }

  /* ---------- Compartilhar: usa o compartilhamento nativo do celular quando existe ---------- */
  function initShare() {
    document.querySelectorAll('.js-share').forEach(function (link) {
      if (!navigator.share) return; // sem suporte: o link do WhatsApp funciona normalmente
      link.addEventListener('click', function (e) {
        e.preventDefault();
        navigator.share({
          title: 'CROFACE — Odontologia em Vila Mariana',
          text: 'Encontrei uma clínica odontológica em Vila Mariana que fica no mesmo prédio de um centro de longevidade:',
          url: link.getAttribute('data-share-url') || location.href
        }).catch(function () { /* pessoa cancelou */ });
      });
    });
  }

  /* ---------- Mensuração: eventos de conversão ----------
     Funciona automaticamente quando o GA4 (gtag) ou o Google Tag Manager
     estiverem instalados. Sem eles, não faz nada e não envia dados. */
  function track(name) {
    if (typeof window.gtag === 'function') window.gtag('event', name);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name });
  }
  function initTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-evento]');
      if (el) track(el.getAttribute('data-evento'));
    });
  }

  function init() {
    initMenu();
    initScrolled();
    initBarStuck();
    initHeroPin();
    initMega();
    initScrolly();
    initSectionBar();
    initReveal();
    initParallax();
    initTabs();
    initHscroll();
    initCarousels();
    initMap();
    initShare();
    initTracking();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
