
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const body = document.body;

if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  };

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

const searchInput = document.querySelector('[data-answer-search]');
const topicButtons = Array.from(document.querySelectorAll('[data-topic-filter]'));
const cards = Array.from(document.querySelectorAll('[data-answer-card]'));
const resultsCount = document.querySelector('[data-results-count]');
const emptyState = document.querySelector('[data-empty-state]');

if (cards.length) {
  let currentTopic = 'Sve teme';

  const applyFilters = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const title = (card.dataset.title || '').toLowerCase();
      const topic = card.dataset.topic || '';
      const matchesTopic = currentTopic === 'Sve teme' || topic === currentTopic;
      const matchesQuery = !query || keywords.includes(query) || title.includes(query);
      const show = matchesTopic && matchesQuery;
      card.style.display = show ? '' : 'none';
      if (show) visible += 1;
    });

    if (resultsCount) {
      resultsCount.textContent = `${visible} pitanja`;
    }
    if (emptyState) {
      emptyState.classList.toggle('is-visible', visible === 0);
    }
  };

  topicButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentTopic = button.dataset.topicFilter || 'Sve teme';
      topicButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  applyFilters();
}

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
