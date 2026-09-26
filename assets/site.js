const button = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
if (button && menu) {
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}
const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
