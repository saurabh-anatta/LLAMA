/**
 * Collection Tag Filters
 *
 * Lightweight ES module for tag filter pill interactions.
 * Handles accessibility attributes and prevents redundant navigation
 * when clicking the already-active 'All' pill on the unfiltered page.
 */

const PILL_SELECTOR = '.collection-tag-filters__pill';
const ACTIVE_CLASS = 'collection-tag-filters__pill--active';

/**
 * Prevents navigation when clicking the 'All' pill on an already unfiltered page.
 * @param {Event} event
 */
const handlePillClick = (event) => {
  const pill = event.target.closest(PILL_SELECTOR);
  if (!pill) return;

  if (pill.classList.contains(ACTIVE_CLASS)) {
    event.preventDefault();
  }
};

/**
 * Sets aria-current on the active pill for screen readers.
 */
const setAriaCurrentOnPills = () => {
  const pills = document.querySelectorAll(PILL_SELECTOR);
  for (const pill of pills) {
    if (pill.classList.contains(ACTIVE_CLASS)) {
      pill.setAttribute('aria-current', 'true');
    } else {
      pill.removeAttribute('aria-current');
    }
  }
};

/**
 * Initializes the tag filter functionality.
 */
const init = () => {
  const container = document.querySelector('.collection-tag-filters');
  if (!container) return;

  container.addEventListener('click', handlePillClick);
  setAriaCurrentOnPills();

  // Enable smooth horizontal scroll snap on mobile pill containers
  const mobilePills = container.querySelector('.collection-tag-filters__mobile-pills');
  if (mobilePills) {
    mobilePills.style.scrollSnapType = 'x proximity';
    const pills = mobilePills.querySelectorAll(PILL_SELECTOR);
    for (const pill of pills) {
      pill.style.scrollSnapAlign = 'start';
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
