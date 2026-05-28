/**
 * Collection Tag Filters
 *
 * Lightweight ES module for tag filter pill interactions and sort dropdown.
 * Handles accessibility attributes, prevents redundant navigation when
 * clicking the already-active 'All' pill, and closes sort dropdowns on
 * click-outside or Escape.
 */

const PILL_SELECTOR = '.collection-tag-filters__pill';
const ACTIVE_CLASS = 'collection-tag-filters__pill--active';
const SORT_SELECTOR = '.collection-tag-filters__sort, .collection-tag-filters__mobile-sort';

const handlePillClick = (event) => {
  const pill = event.target.closest(PILL_SELECTOR);
  if (!pill) return;

  if (pill.classList.contains(ACTIVE_CLASS)) {
    event.preventDefault();
  }
};

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

const closeAllSortDropdowns = (except) => {
  const dropdowns = document.querySelectorAll(SORT_SELECTOR);
  for (const dropdown of dropdowns) {
    if (dropdown !== except && dropdown.open) {
      dropdown.open = false;
    }
  }
};

const handleDocumentClick = (event) => {
  const openDropdown = document.querySelector(`${SORT_SELECTOR.split(', ').map((s) => `${s}[open]`).join(', ')}`);
  if (!openDropdown) return;

  if (!event.target.closest(SORT_SELECTOR)) {
    closeAllSortDropdowns();
  }
};

const handleDropdownToggle = (event) => {
  const dropdown = event.target;
  if (dropdown.open) {
    closeAllSortDropdowns(dropdown);
  }
};

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeAllSortDropdowns();
  }
};

const init = () => {
  const container = document.querySelector('.collection-tag-filters');
  if (!container) return;

  container.addEventListener('click', handlePillClick);
  setAriaCurrentOnPills();

  const dropdowns = container.querySelectorAll(SORT_SELECTOR);
  for (const dropdown of dropdowns) {
    dropdown.addEventListener('toggle', handleDropdownToggle);
  }

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleEscape);

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
