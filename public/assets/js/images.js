// Preserve the designed placeholders until a configured image has loaded successfully.
(() => {
  const assets = window.SITE_ASSETS || {};
  const hero = document.querySelector('.hero-image');
  function applyImage(container, asset, logo = false) {
    if (!container) return;
    const source = asset?.src || '';
    container.dataset.assetSource = source;
    container.querySelector('.asset-photo')?.remove();
    container.classList.remove('has-photo');
    if (!source) return;
    const picture = new Image();
    picture.className = 'asset-photo';
    picture.alt = asset.alt || '';
    picture.decoding = 'async';
    picture.onload = () => {
      if (container.dataset.assetSource !== source) return;
      container.querySelector('.asset-photo')?.remove();
      container.append(picture);
      container.classList.add('has-photo');
      if (logo) container.classList.add('has-logo');
    };
    picture.onerror = () => console.warn('Image unavailable; keeping placeholder:', source);
    picture.src = source;
  }
  document.querySelectorAll('.logo-slot').forEach(slot => applyImage(slot, assets.logo, true));
  document.querySelectorAll('.project-image').forEach((slot, i) => applyImage(slot, assets.projects?.[i]));
  const updateHero = () => applyImage(hero, assets.hero?.[Number(hero.dataset.scene || 0)]);
  if (hero) {
    updateHero();
    new MutationObserver(updateHero).observe(hero, {attributes:true, attributeFilter:['data-scene']});
  }
})();
