const header = document.querySelector('.site-header');
const button = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

const closeMenu = () => {
  if (!button || !menu) return;
  menu.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

if (button && menu) {
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (header) {
  const syncHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 18);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
