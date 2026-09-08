const menu = document.getElementById('menu');
const nav = document.getElementById('navigation');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

const links = document.querySelectorAll('.navlink');

links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-12% 0px -65% 0px' });

document.querySelectorAll('section').forEach(s => observer.observe(s));
