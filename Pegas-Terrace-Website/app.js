const menuList = document.querySelector('#menu-list');
let dishes = [];

function loadMenu(category = 'All') {
  if (!dishes.length) dishes = [
    { name: 'Steak & truffle purée', category: 'Mains', description: 'Beef tenderloin, silky potato, red wine jus', price: 420, tag: 'Guest favourite' },
    { name: 'Salmon alla griglia', category: 'Mains', description: 'Charcoal-grilled salmon, seasonal greens', price: 360, tag: 'From the grill' },
    { name: 'Mămăligă reinterpretată', category: 'Mains', description: 'Golden polenta, slow-cooked mushrooms, herbs', price: 240, tag: 'Local soul' },
    { name: 'Ukrainian borscht', category: 'Starters', description: 'Beetroot, tender beef, dill and sour cream', price: 155, tag: 'A classic' },
    { name: 'Burrata & garden tomato', category: 'Starters', description: 'Basil oil, heirloom tomatoes, grilled bread', price: 225, tag: 'Seasonal' },
    { name: 'Pegas Kiev cake', category: 'Desserts', description: 'Layers of crisp meringue, hazelnut and cream', price: 145, tag: 'House signature' },
    { name: 'Pistachio cheesecake', category: 'Desserts', description: 'Pistachio, vanilla, delicate shortbread', price: 155, tag: 'Guest favourite' },
    { name: 'Rhubarb garden sour', category: 'Drinks', description: 'Cachaça, rhubarb, citrus, a little sparkle', price: 190, tag: 'From the bar' },
  ];
  const visible = category === 'All' ? dishes : dishes.filter(dish => dish.category === category);
  menuList.innerHTML = visible.map((dish, index) => `
    <article class="menu-item" style="animation-delay:${index * 55}ms">
      <div><h3>${dish.name}</h3><p>${dish.description}</p><span class="menu-tag">${dish.tag}</span></div>
      <span class="menu-price">${dish.price} MDL</span>
    </article>`).join('');
}

document.querySelectorAll('.menu-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.menu-tabs button.active')?.classList.remove('active');
    button.classList.add('active');
    loadMenu(button.dataset.category);
  });
});
loadMenu();

const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.nav').classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));

const dateField = document.querySelector('input[name="date"]');
const localDate = new Date();
dateField.min = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

const form = document.querySelector('#booking-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const payload = Object.fromEntries(new FormData(form));
  status.className = 'form-status success';
  status.innerHTML = `Looking forward to welcoming you, ${escapeHtml(payload.name)}. Please call <a href="tel:+37378800600">+373 78 800 600</a> to confirm your table for ${escapeHtml(payload.guests)} on ${escapeHtml(payload.date)} at ${escapeHtml(payload.time)}.`;
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('reveal');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.14 });
document.querySelectorAll('.intro-copy,.intro-image,.menu-heading,.menu-image,.moments-top,.moment-card,.private-image,.private-copy,.gallery-photo,.booking-form,.visit-message,.visit-info').forEach(el => revealObserver.observe(el));
document.body.classList.add('js-ready');
