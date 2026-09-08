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

// Barra de progreso de lectura y boton de volver arriba
const progress = document.createElement('div');
progress.id = 'progress';
document.body.appendChild(progress);

const toTop = document.createElement('button');
toTop.id = 'totop';
toTop.type = 'button';
toTop.textContent = '↑';
toTop.setAttribute('aria-label', 'Volver arriba');
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.body.appendChild(toTop);

let ticking = false;

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = (ratio * 100).toFixed(2) + '%';
  toTop.classList.toggle('show', window.scrollY > 700);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}, { passive: true });

update();
