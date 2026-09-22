const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.querySelector('span').textContent = '+'; }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); menuButton.querySelector('span').textContent = open ? '−' : '+'; });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let motionPaused = reduceMotion.matches;
function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.innerHTML = motionPaused ? 'Enable motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); requestFrame(); });
reduceMotion.addEventListener('change', () => { motionPaused = reduceMotion.matches; updateMotion(); requestFrame(); });
updateMotion();

const scenes = [
  { title: 'ROOM TO\nREIMAGINE.', caption: 'Your residential project photograph here', tag: 'HOME.\nELEVATED.', description: 'SUPPORT FOR THE PLACE YOU CALL HOME' },
  { title: 'THINK BIG.\nBUILD BIGGER.', caption: 'Your commercial project photograph here', tag: 'AMBITION.\nSUPPORTED.', description: 'ACCESS FOR YOUR NEXT BIG AMBITION' },
  { title: 'NEW HEIGHTS.\nNEW POSSIBILITIES.', caption: 'Your specialist project photograph here', tag: 'A DIFFERENT\nPERSPECTIVE.', description: 'A DIFFERENT APPROACH TO COMPLEX ACCESS' }
];
const heroImage = document.querySelector('.hero-image');
const sceneButtons = [...document.querySelectorAll('.showcase-option')];
function showScene(index, animate = true) {
  const scene = scenes[index];
  sceneButtons.forEach((button, i) => { button.classList.toggle('is-selected', i === index); button.setAttribute('aria-pressed', String(i === index)); });
  heroImage.dataset.scene = index;
  heroImage.querySelector('.placeholder-center > span:not(.photo-icon)').textContent = scene.title;
  heroImage.querySelector('.placeholder-center > span:not(.photo-icon)').style.whiteSpace = 'pre-line';
  heroImage.querySelector('small').textContent = scene.caption;
  heroImage.querySelector('.yellow-tag').textContent = scene.tag;
  heroImage.querySelector('.yellow-tag').style.whiteSpace = 'pre-line';
  document.querySelector('.scene-description').textContent = scene.description;
  heroImage.classList.remove('scene-change');
  if (animate && !motionPaused) requestAnimationFrame(() => heroImage.classList.add('scene-change'));
}
sceneButtons.forEach((button, index) => button.addEventListener('click', () => showScene(index)));
showScene(0, false);

const hero = document.querySelector('.hero');
hero.addEventListener('pointermove', event => {
  if (motionPaused || event.pointerType !== 'mouse' || !matchMedia('(min-width: 761px)').matches) return;
  const bounds = hero.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  hero.style.setProperty('--light-x', `${x * 100}%`); hero.style.setProperty('--light-y', `${y * 100}%`);
  heroImage.style.setProperty('--tilt-x', `${(x - .5) * 7}deg`); heroImage.style.setProperty('--tilt-y', `${(.5 - y) * 5}deg`);
}, { passive: true });
hero.addEventListener('pointerleave', () => { heroImage.style.setProperty('--tilt-x', '0deg'); heroImage.style.setProperty('--tilt-y', '0deg'); });

const serviceList = document.querySelector('.service-list');
const serviceExperience = document.createElement('div');
serviceExperience.className = 'service-experience';
serviceList.before(serviceExperience);
const servicePreview = document.createElement('div');
servicePreview.className = 'service-preview';
servicePreview.setAttribute('aria-hidden', 'true');
servicePreview.innerHTML = '<span class="service-preview-label">THE RIGHT SUPPORT / EVERY TIME</span><span class="service-preview-number">01</span><h3>Residential scaffolding</h3><p>HOMES / EXTENSIONS / RENOVATIONS</p>';
serviceExperience.append(servicePreview, serviceList);
const services = [...serviceList.querySelectorAll('details')];
services.forEach((detail, index) => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  services.forEach(other => { if (other !== detail) other.open = false; });
  servicePreview.querySelector('.service-preview-number').textContent = `0${index + 1}`;
  servicePreview.querySelector('h3').textContent = detail.querySelector('h3').textContent;
  servicePreview.querySelector('p').textContent = detail.querySelector('.service-detail > span').textContent;
}));

const gallery = document.querySelector('.project-grid');
gallery.setAttribute('tabindex', '0'); gallery.setAttribute('role', 'region'); gallery.setAttribute('aria-label', 'Project gallery. Scroll horizontally or use the previous and next buttons.');
const projects = [...gallery.querySelectorAll('.project')];
const previous = document.querySelector('.gallery-previous');
const next = document.querySelector('.gallery-next');
function galleryState() {
  const end = gallery.scrollWidth - gallery.clientWidth;
  previous.disabled = gallery.scrollLeft < 4;
  next.disabled = gallery.scrollLeft >= end - 4;
  document.querySelector('.gallery-count').textContent = gallery.scrollLeft > end / 2 ? '02 / 02' : '01 / 02';
}
function moveGallery(direction) { gallery.scrollTo({left: direction > 0 ? gallery.scrollWidth - gallery.clientWidth : 0, behavior: motionPaused ? 'instant' : 'smooth'}); }
previous.addEventListener('click', () => moveGallery(-1)); next.addEventListener('click', () => moveGallery(1));
gallery.addEventListener('scroll', galleryState, {passive:true});
gallery.addEventListener('keydown', event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(event.key === 'ArrowRight' ? 1 : -1); } });
window.addEventListener('resize', galleryState, {passive:true}); galleryState();

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); } }), {threshold:.08});
  document.querySelectorAll('.section-heading, .service-experience, .project-grid, .approach-grid, .contact h2, .contact-bottom').forEach(element => { element.classList.add('reveal-ready'); reveal.observe(element); });
}
const sections = [...document.querySelectorAll('main > section[id]')];
const steps = [...document.querySelectorAll('.steps article')];
const contact = document.querySelector('.contact');
let framePending = false;
function requestFrame() { if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); } }
function updateScroll() {
  framePending = false;
  const pageHeight = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--page-progress', pageHeight > 0 ? Math.min(1, scrollY / pageHeight) : 0);
  let current = '';
  sections.forEach(section => { if (section.getBoundingClientRect().top <= innerHeight * .45) current = section.id; });
  navigation.querySelectorAll('a').forEach(link => { if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  if (!motionPaused) {
    const heroTop = hero.getBoundingClientRect().top;
    heroImage.style.setProperty('--hero-shift', `${Math.max(0, Math.min(40, -heroTop * .09))}px`);
  }
  let closest = 0;
  steps.forEach((step, i) => { if (Math.abs(step.getBoundingClientRect().top - innerHeight * .5) < Math.abs(steps[closest].getBoundingClientRect().top - innerHeight * .5)) closest = i; });
  steps.forEach((step, i) => step.classList.toggle('is-current', i === closest));
  const fill = motionPaused ? 100 : Math.max(0, Math.min(100, (innerHeight - contact.getBoundingClientRect().top) / (innerHeight * .7) * 100));
  contact.style.setProperty('--fill', `${fill}%`);
}
window.addEventListener('scroll', requestFrame, {passive:true});
window.addEventListener('resize', requestFrame, {passive:true}); requestFrame();
