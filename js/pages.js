/* ==========================================================================
   pages.js
   Drives: cart.html, wishlist.html, contact.html, collections.html, 404.html
   Storage keys used: 'fjd_cart' and 'fjd_wishlist'
   ========================================================================== */

const CART_KEY = 'fjd_cart';
const WISHLIST_KEY = 'fjd_wishlist';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  updateNavCounts();
  initContactForm();
  initCartPage();
  initWishlistPage();
  
  // Scoped initialization for the collections page wave effect
  initWaveAnimation();
});

/* ---------------- wave animation helper (Collections Only) ---------------- */

function initWaveAnimation() {
  // Only run if the current page has the 'page-collections' body class
  if (!document.body.classList.contains('page-collections')) return;

  const h1 = document.querySelector('.wave-text');
  if (!h1) return;
  
  // Wrap each letter in a span with a delay variable
  h1.innerHTML = h1.textContent.split('').map((char, i) => 
    `<span style="--i:${i}">${char}</span>`
  ).join('');
}

/* ---------------- storage helpers ---------------- */

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateNavCounts();
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch (e) { return []; }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateNavCounts();
}

function findProduct(id) {
  if (typeof products === 'undefined') return null;
  return products.find(p => String(p.id) === String(id));
}

/* ---------------- nav ---------------- */

function updateNavCounts() {
  const cart = getCart();
  const wishlist = getWishlist();
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartEl = document.getElementById('cartCount');
  const wishEl = document.getElementById('wishlistCount');
  if (cartEl) cartEl.textContent = cartCount;
  if (wishEl) wishEl.textContent = wishlist.length;
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* ---------------- toast ---------------- */

function notify(message) {
  if (typeof showToast === 'function') { showToast(message); return; }
  const el = document.createElement('div');
  el.className = 'pages-toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

/* ---------------- contact form ---------------- */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    notify("Message sent — we'll reply within 1–2 business days.");
    form.reset();
  });
}

/* ---------------- cart page ---------------- */

function initCartPage() {
  const list = document.getElementById('cartList');
  if (!list) return;
  renderCart();
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (getCart().length === 0) { notify('Your cart is empty.'); return; }
      notify('Demo store — checkout isn\u2019t connected to real payment.');
    });
  }
}

function renderCart() {
  const list = document.getElementById('cartList');
  const emptyState = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  if (!list) return;

  const cart = getCart();
  list.innerHTML = '';

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (summary) summary.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (summary) summary.style.display = 'block';

  let subtotal = 0;

  cart.forEach((item, index) => {
    const product = findProduct(item.id) || {
      name: 'Product unavailable',
      price: 0,
      images: ['https://placehold.co/160x200/F1EEE5/4B5642?text=FJD']
    };
    const lineTotal = (product.price || 0) * (item.qty || 1);
    subtotal += lineTotal;

    const meta = [
      item.size ? `Size: ${item.size}` : '',
      item.color ? `Color: ${item.color}` : ''
    ].filter(Boolean).join(' · ');

    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <img class="cart-row-img" src="${(product.images && product.images[0]) || 'https://placehold.co/160x200/F1EEE5/4B5642?text=FJD'}" alt="${product.name}">
      <div class="cart-row-info">
        <h3>${product.name}</h3>
        <p class="cart-row-meta">${meta}</p>
        <p class="cart-row-price">$${(product.price || 0).toFixed(2)}</p>
      </div>
      <div class="qty-control">
        <button class="qty-btn" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">\u2212</button>
        <span>${item.qty || 1}</span>
        <button class="qty-btn" data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
      </div>
      <p class="cart-row-total">$${lineTotal.toFixed(2)}</p>
      <button class="remove-btn" data-index="${index}" aria-label="Remove item"><i class="fa-solid fa-xmark"></i></button>
    `;
    list.appendChild(row);
  });

  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

  list.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const cart = getCart();
      if (!cart[idx]) return;
      if (btn.dataset.action === 'increase') {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart[idx].qty = Math.max(1, (cart[idx].qty || 1) - 1);
      }
      saveCart(cart);
      renderCart();
    });
  });

  list.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const cart = getCart();
      cart.splice(idx, 1);
      saveCart(cart);
      renderCart();
      notify('Removed from cart.');
    });
  });
}

/* ---------------- wishlist page ---------------- */

function initWishlistPage() {
  const grid = document.getElementById('wishlistGrid');
  if (!grid) return;
  renderWishlist();
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('wishlistEmpty');
  if (!grid) return;

  const wishlist = getWishlist();
  grid.innerHTML = '';

  if (wishlist.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  wishlist.forEach((id) => {
    const product = findProduct(id);
    if (!product) return;

    const card = document.createElement('div');
    card.className = 'wishlist-card';
    card.innerHTML = `
      <a href="product.html?id=${product.id}" class="wishlist-card-img">
        <img src="${(product.images && product.images[0]) || 'https://placehold.co/300x360/F1EEE5/4B5642?text=FJD'}" alt="${product.name}">
      </a>
      <div class="wishlist-card-info">
        <h3>${product.name}</h3>
        <p>$${(product.price || 0).toFixed(2)}</p>
        <div class="wishlist-card-actions">
          <button class="btn-move" data-id="${product.id}">Move to Cart</button>
          <button class="btn-remove" data-id="${product.id}" aria-label="Remove from wishlist"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.btn-move').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = getCart();
      const existing = cart.find(i => String(i.id) === String(id));
      if (existing) existing.qty = (existing.qty || 1) + 1;
      else cart.push({ id, qty: 1 });
      saveCart(cart);

      const wishlist = getWishlist().filter(w => String(w) !== String(id));
      saveWishlist(wishlist);
      renderWishlist();
      notify('Moved to cart.');
    });
  });

  grid.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const wishlist = getWishlist().filter(w => String(w) !== String(id));
      saveWishlist(wishlist);
      renderWishlist();
      notify('Removed from wishlist.');
    });
  });
}