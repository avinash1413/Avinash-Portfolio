// Lightweight interactions: menu, smooth scroll, form (Formspree placeholder)
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header-area');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }
  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = this.getAttribute('href');
      if (target.startsWith('#')) {
        e.preventDefault();
        if (target === '#home') window.scrollTo({top:0,behavior:'smooth'});
        else {
          const el = document.querySelector(target);
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({top:y,behavior:'smooth'});
          }
        }
      }
    });
  });
  // sticky header
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('sticky'); else header.classList.remove('sticky');
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.pageYOffset >= top) current = sec.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  // Formspree submission
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      // Replace FORM_ID with your Formspree ID: https://formspree.io/
      const endpoint = 'https://formspree.io/f/FORM_ID';
      fetch(endpoint, {method:'POST',body:data,headers:{'Accept':'application/json'}})
        .then(res => res.json())
        .then(json => {
          formMsg.textContent = 'Message sent — thank you!';
          form.reset();
          setTimeout(()=>formMsg.textContent='',4000);
        }).catch(err => {
          console.error(err);
          formMsg.textContent = 'Submission failed — email avi1807nash@gmail.com';
          setTimeout(()=>formMsg.textContent='',5000);
        });
    });
  }
  const yEl = document.getElementById('year'); if (yEl) yEl.textContent = new Date().getFullYear();
});
