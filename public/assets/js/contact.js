// Obfuscation deters basic source scrapers; it is not encryption.
// Browsers (and bots that execute JavaScript) can recover these public details.
(() => {
  const encoded = {
    phone: [121, 126, 113, 127, 121, 105, 113, 112, 113, 105, 121, 125, 127],
    email: [44, 39, 56, 60, 32, 59, 32, 44, 58, 9, 32, 36, 57, 40, 42, 61, 58, 42, 40, 47, 47, 38, 37, 45, 32, 39, 46, 103, 42, 38, 103, 60, 34]
  };
  const decode = values => values.map(value => String.fromCharCode(value ^ 73)).join('');

  document.querySelectorAll('[data-contact]').forEach(link => {
    const kind = link.dataset.contact;
    if (!encoded[kind]) return;
    const value = decode(encoded[kind]);
    link.querySelector('[data-contact-text]').textContent = value;
    link.href = kind === 'phone' ? `tel:${value.replace(/\s/g, '')}` : `mailto:${value}`;
  });
})();
