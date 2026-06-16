/* ============================================================
   MAISON JOUDIA — Cake design (expérience immersive)
   ============================================================ */

/* ── PRELOADER ── */
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => setTimeout(() => preloader && preloader.classList.add('done'), 1100));
setTimeout(() => preloader && preloader.classList.add('done'), 2600);
window.addEventListener('pageshow', e => { if (e.persisted && preloader) preloader.classList.add('done'); });

/* ── NAV ── */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });

const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-label', open ? 'Fermer' : 'Menu');
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.nav-mobile-link').forEach(a => a.addEventListener('click', () => {
  navMobile.classList.remove('open'); navToggle.classList.remove('open'); document.body.style.overflow = '';
}));

/* ── SCROLL PROGRESS ── */
const progress = document.getElementById('scroll-progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, { passive: true });

/* ── REVEAL ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── COMPTEURS ── */
function runCount(el, target) {
  const dur = 1500, t0 = performance.now();
  (function tick(t) {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round((1 - Math.pow(1 - k, 3)) * target);
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCount(e.target, parseInt(e.target.dataset.count)); countIO.unobserve(e.target); } });
}, { threshold: 0.6 });
document.querySelectorAll('.counter-val[data-count]').forEach(el => countIO.observe(el));

/* ── VITRINE HORIZONTALE ── */
const track = document.getElementById('showcaseTrack');
if (track) {
  const cakes = Array.from(track.children);
  const dotsWrap = document.getElementById('scDots');
  cakes.forEach((c, i) => {
    const d = document.createElement('button');
    d.className = 'sc-dot' + (i === 0 ? ' on' : '');
    d.setAttribute('aria-label', 'Gâteau ' + (i + 1));
    d.addEventListener('click', () => scrollToCake(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function scrollToCake(i) {
    const c = cakes[i];
    track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  }
  function current() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, min = Infinity;
    cakes.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < min) { min = d; best = i; }
    });
    return best;
  }
  document.getElementById('scNext').addEventListener('click', () => scrollToCake(Math.min(cakes.length - 1, current() + 1)));
  document.getElementById('scPrev').addEventListener('click', () => scrollToCake(Math.max(0, current() - 1)));

  const hint = document.getElementById('showcaseHint');
  track.addEventListener('scroll', () => {
    const i = current();
    dots.forEach((d, j) => d.classList.toggle('on', j === i));
    if (hint) hint.style.opacity = track.scrollLeft > 30 ? '0' : '1';
  }, { passive: true });
}

/* ── PARALLAXE DES SCÈNES ── */
const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
const parBgs = Array.from(document.querySelectorAll('.scene-bg[data-parallax]'));
if (parBgs.length && !reduceMotion) {
  let ticking = false;
  function parallax() {
    const vh = innerHeight;
    parBgs.forEach(bg => {
      const scene = bg.parentElement;
      const r = scene.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const offset = r.top + r.height / 2 - vh / 2;
      const amt = parseFloat(bg.dataset.parallax) || 0.15;
      const max = scene.offsetHeight * 0.08;
      let ty = -offset * amt;
      ty = Math.max(-max, Math.min(max, ty));
      bg.style.transform = `translateY(${ty}px)`;
    });
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  addEventListener('resize', parallax, { passive: true });
  parallax();
}

/* ── BOUTON COMMANDER → pré-remplit le formulaire ── */
const typeSelect = document.getElementById('type');
const messageField = document.getElementById('message');
document.querySelectorAll('.btn-order').forEach(btn => {
  btn.addEventListener('click', () => {
    const produit = btn.dataset.produit;
    if (typeSelect) {
      const match = Array.from(typeSelect.options).find(o => o.value === produit || o.text === produit);
      typeSelect.value = match ? match.value : 'Autre / sur mesure';
    }
    if (messageField && !messageField.value.trim()) messageField.value = `Bonjour, je souhaite commander : ${produit}. `;
    document.getElementById('commander').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { const f = document.getElementById('prenom'); if (f) f.focus({ preventScroll: true }); }, 700);
  });
});

/* ── FAQ : un seul ouvert ── */
const faqs = document.querySelectorAll('.faq');
faqs.forEach(d => d.addEventListener('toggle', () => { if (d.open) faqs.forEach(o => { if (o !== d) o.open = false; }); }));

/* ── ENVOI DU FORMULAIRE (Formspree + mode démo) ── */
const orderForm = document.getElementById('orderForm');
const orderBtn = document.getElementById('orderBtn');
const DEFAULT_LABEL = 'Envoyer ma demande <span>→</span>';
function btnState(html, bg, disabled) { orderBtn.innerHTML = html; orderBtn.style.background = bg || ''; orderBtn.disabled = !!disabled; }

if (orderForm) orderForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const isDemo = orderForm.action.includes('VOTRE_ID_FORMSPREE');
  btnState('Envoi en cours…', '', true);
  if (isDemo) {
    setTimeout(() => {
      btnState('Demande envoyée ✓', '#5a8a4c', true);
      orderForm.reset();
      setTimeout(() => btnState(DEFAULT_LABEL, '', false), 4000);
    }, 900);
    return;
  }
  try {
    const res = await fetch(orderForm.action, { method: 'POST', body: new FormData(orderForm), headers: { Accept: 'application/json' } });
    if (res.ok) {
      btnState('Demande envoyée ✓', '#5a8a4c', true);
      orderForm.reset();
      setTimeout(() => btnState(DEFAULT_LABEL, '', false), 4000);
    } else {
      btnState('Erreur, réessayez', '#c0392b', false);
      setTimeout(() => btnState(DEFAULT_LABEL, '', false), 3000);
    }
  } catch {
    btnState('Erreur réseau', '#c0392b', false);
    setTimeout(() => btnState(DEFAULT_LABEL, '', false), 3000);
  }
});
