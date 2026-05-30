/* Julien Perradin — site behaviour. Vanilla, no dependencies.
   Everything here degrades gracefully without JS. */
(function () {
  'use strict';

  /* current year in footer */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* header shadow on scroll */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu toggle */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* scrollspy — highlight nav link for the section in view */
  var sections = ['about', 'publications', 'curriculum', 'talks', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var linkFor = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') linkFor[href.slice(1)] = a;
  });
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove('active'); });
          var link = linkFor[e.target.id];
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* reveal-on-scroll */
  var revealEls = document.querySelectorAll('.section, .hero-grid');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { rev.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
