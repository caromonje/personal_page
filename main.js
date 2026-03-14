/**
 * Portfolio — Main JavaScript
 * Vanilla ES6+, no dependencies.
 */

(function () {
  'use strict';

  // ── Intersection Observer: Reveal on Scroll ─────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Header Shadow on Scroll ─────────────────────────────────────
  const header = document.querySelector('.site-header');

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('site-header--scrolled', !entry.isIntersecting);
    },
    { threshold: 1.0 }
  );

  // Sentinel: a zero-height element at the very top of the page
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  document.body.prepend(sentinel);
  headerObserver.observe(sentinel);

  // ── Mobile Menu Toggle ──────────────────────────────────────────
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function closeMobileMenu() {
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ── Expandable Experience Entries ─────────────────────────────────
  // Close other open entries when one is opened (accordion behavior)
  const indexEntries = document.querySelectorAll('details.index-entry');

  indexEntries.forEach((entry) => {
    entry.addEventListener('toggle', () => {
      if (entry.open) {
        indexEntries.forEach((other) => {
          if (other !== entry && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });

  // ── Smooth Scroll for Anchor Links ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
})();
