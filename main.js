/* Arixentra Technologies — progressive enhancement, with no runtime dependencies. */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Mobile menu: keep keyboard focus and aria state in sync with visibility.
  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  const setMenuOpen = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.inert = !open;
  };
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => setMenuOpen(!document.body.classList.contains('menu-open')));
    $$('#mobile-nav a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
      if (event.matches) setMenuOpen(false);
    });
  }

  // Calm, staggered reveal effects. Content remains visible without this enhancement.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('visible'));
  }

  const year = $('#copyright-year');
  if (year) year.textContent = new Date().getFullYear();

  // Inline form intentionally uses mailto; no server or third-party service receives inputs.
  const form = $('#inquiry-form');
  const serviceSelect = $('#contact-service');
  $$('[data-service]').forEach((link) => link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  }));
  if (form) {
    const feedback = $('#form-feedback');
    const fields = [$('input[name="name"]', form), $('input[name="email"]', form), $('textarea[name="message"]', form)];
    fields.forEach((field) => field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      feedback.textContent = '';
    }));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const firstInvalid = fields.find((field) => !field.value.trim() || !field.checkValidity());
      if (firstInvalid) {
        firstInvalid.setAttribute('aria-invalid', 'true');
        feedback.textContent = 'Please complete the required fields with a valid email address.';
        firstInvalid.focus();
        return;
      }
      const name = fields[0].value.trim();
      const email = fields[1].value.trim();
      const message = fields[2].value.trim().slice(0, 1500);
      const service = serviceSelect.value || 'General enquiry';
      const subject = `Arixentra enquiry — ${service}`;
      const body = `Hello Arixentra Technologies,\n\n${message}\n\n---\nName: ${name}\nEmail: ${email}\nService: ${service}`;
      const mailto = `mailto:arixentra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      feedback.textContent = 'Your email application will open with the message prepared. Please send it there to complete your enquiry.';
      window.location.href = mailto;
    });
  }

  // Lightweight mathematically projected 3D network sphere. No heavy 3D libraries.
  const canvas = $('#network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const scene = canvas.parentElement;
  const TWO_PI = Math.PI * 2;
  const points = [];
  const edges = [];
  const latitudeBands = 13;
  const longitudeBands = 27;
  for (let lat = 0; lat <= latitudeBands; lat++) {
    const theta = Math.PI * lat / latitudeBands;
    for (let lon = 0; lon < longitudeBands; lon++) {
      const phi = TWO_PI * lon / longitudeBands;
      const jitter = 1 + 0.015 * Math.sin(lat * 19.7 + lon * 4.21);
      points.push({
        x: Math.sin(theta) * Math.cos(phi) * jitter,
        y: Math.cos(theta) * jitter,
        z: Math.sin(theta) * Math.sin(phi) * jitter,
        bright: ((lat * 11 + lon * 17) % 23) < 3
      });
      if (lat < latitudeBands) edges.push([lat * longitudeBands + lon, (lat + 1) * longitudeBands + lon]);
      edges.push([lat * longitudeBands + lon, lat * longitudeBands + (lon + 1) % longitudeBands]);
    }
  }

  let width = 720, height = 720, pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
  let frame = 0, animationId = 0, isVisible = true;
  const lowMotion = () => reduceMotion.matches;
  const project = (p, angleY, angleX, radius, centerX, centerY) => {
    const cy = Math.cos(angleY), sy = Math.sin(angleY);
    const cx = Math.cos(angleX), sx = Math.sin(angleX);
    const x1 = p.x * cy + p.z * sy;
    const z1 = -p.x * sy + p.z * cy;
    const y2 = p.y * cx - z1 * sx;
    const z2 = p.y * sx + z1 * cx;
    const scale = 2.85 / (2.85 - z2 * 0.32);
    return { x: centerX + x1 * radius * scale, y: centerY + y2 * radius * scale, z: z2, s: scale };
  };
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    width = Math.max(200, box.width);
    height = Math.max(200, box.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (lowMotion()) draw(0);
  };
  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    const cx = width * 0.50, cy = height * 0.49;
    const r = Math.min(width, height) * 0.36;
    smoothX += (pointerX - smoothX) * 0.035;
    smoothY += (pointerY - smoothY) * 0.035;
    const spin = (lowMotion() ? 0.30 : time * 0.00009) + smoothX * 0.45;
    const tilt = -0.22 + smoothY * 0.28;
    // Orbit guides add dimensional cues without obscuring the text labels.
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.30);
    ctx.strokeStyle = 'rgba(250,204,21,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.27, r * 0.42, 0, 0, TWO_PI); ctx.stroke();
    ctx.strokeStyle = 'rgba(154,178,209,0.095)';
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.2, r * 0.68, Math.PI / 2.5, 0, TWO_PI); ctx.stroke();
    ctx.restore();

    const projected = points.map((point) => project(point, spin, tilt, r, cx, cy));
    for (const [a, b] of edges) {
      const p = projected[a], q = projected[b];
      const depth = (p.z + q.z + 2) / 4;
      const front = depth > 0.5;
      ctx.strokeStyle = front
        ? `rgba(250,204,21,${(0.035 + depth * 0.21).toFixed(3)})`
        : `rgba(119,149,185,${(0.025 + depth * 0.10).toFixed(3)})`;
      ctx.lineWidth = front ? 0.75 : 0.55;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
    }
    for (let index = 0; index < projected.length; index++) {
      const p = projected[index];
      const depth = (p.z + 1) / 2;
      if (p.z < -0.4 && index % 3 !== 0) continue;
      const emphasized = points[index].bright && p.z > 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, emphasized ? 2.5 : (p.z > 0 ? 1.12 : 0.6), 0, TWO_PI);
      ctx.fillStyle = emphasized ? `rgba(250,204,21,${0.45 + depth * 0.48})` : `rgba(160,184,213,${0.17 + depth * 0.53})`;
      ctx.fill();
      if (emphasized && index % 2 === 0) {
        ctx.strokeStyle = 'rgba(250,204,21,.15)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, TWO_PI); ctx.stroke();
      }
    }
  };
  const tick = (time) => {
    if (isVisible && !document.hidden && !lowMotion()) {
      // Approximate 30fps is sufficient for a decorative background animation.
      if (time - frame >= 33) { draw(time); frame = time; }
    }
    animationId = requestAnimationFrame(tick);
  };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => { isVisible = entries[0]?.isIntersecting ?? false; }, { threshold: 0 }).observe(scene);
  }
  scene.addEventListener('pointermove', (event) => {
    if (lowMotion()) return;
    const bounds = scene.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
    pointerY = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
  }, { passive: true });
  scene.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && lowMotion()) draw(0); });
  reduceMotion.addEventListener('change', () => { if (lowMotion()) draw(0); });
  resize();
  if (lowMotion()) draw(0);
  else animationId = requestAnimationFrame(tick);
})();
