/* Julien Perradin — site behaviour. Vanilla, no dependencies.
   Everything here degrades gracefully without JS. */
(function () {
  'use strict';

  /* current year in footer */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

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

  /* header shadow + scrollspy, in document order */
  var header = document.getElementById('siteHeader');
  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') links[href.slice(1)] = a;
  });
  var sections = Object.keys(links)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean)
    .sort(function (a, b) { return a.offsetTop - b.offsetTop; });

  /* ponytail: match the CSS anchor landing point, else a jumped-to section
     sits below the line and the section above it stays highlighted */
  var anchorLine = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
                    header.offsetHeight) + 4;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);

    /* last section whose top crossed the line wins. Plain rect test,
       no IntersectionObserver band to fall through. */
    var current = null;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= anchorLine) current = s;
    });
    /* bottom of page: last section may never reach the line */
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1] || current;
    }
    sections.forEach(function (s) {
      links[s.id].classList.toggle('active', s === current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

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
