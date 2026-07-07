// ============================================
// FJD — App JS (Nav, Animations, Utilities)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Loading Screen ──
  const loader = document.querySelector('.loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 1300);

  // ── Navbar Scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile Nav ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── Scroll Reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Newsletter ──
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value.includes('@')) {
        showToast('<i class="fas fa-check-circle"></i> You\'re on the list — welcome to FJD.');
        input.value = '';
      } else {
        showToast('<i class="fas fa-exclamation-circle"></i> Enter a valid email address');
      }
    });
  }
});

// ── Product Card Renderer ──
function renderProductCard(product) {
  const wishlisted = Wishlist.has(product.id);
  const badgeHTML = product.badge
    ? `<span class="card-badge badge-${product.badge}">${product.badge === 'hot' ? '🔥 Hot' : product.badge === 'new' ? 'New' : 'Sale'}</span>`
    : '';
  const priceHTML = product.originalPrice
    ? `<span class="price-current">${formatPrice(product.price)}</span><span class="price-original">${formatPrice(product.originalPrice)}</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;
  const colorsHTML = product.colors.map((c, i) =>
    `<span class="color-dot${i === 0 ? ' active' : ''}" style="background:${c}" title="${c}"></span>`
  ).join('');

  return `
    <div class="product-card reveal" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="card-img-link">
        <div class="card-img">
          <img
            src="${product.img}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none';this.parentElement.style.background='var(--blue-light)'"
          >
          ${badgeHTML}
          <div class="card-actions">
            <button class="card-action-btn wishlist-toggle ${wishlisted ? 'wishlisted' : ''}" data-id="${product.id}" title="Wishlist">
              <i class="fa${wishlisted ? 's' : 'r'} fa-heart"></i>
            </button>
            <a href="product.html?id=${product.id}" class="card-action-btn" title="View product">
              <i class="fas fa-eye"></i>
            </a>
          </div>
        </div>
      </a>
      <div class="card-body">
        <div class="card-category">${product.category}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-price">${priceHTML}</div>
        <div class="card-colors">${colorsHTML}</div>
        <button class="card-add-btn" data-id="${product.id}">
          <i class="fas fa-plus"></i> Add to Cart
        </button>
      </div>
    </div>`;
}

// ── Event Delegation ──
document.addEventListener('click', (e) => {
  // Wishlist toggle
  const wishBtn = e.target.closest('.wishlist-toggle');
  if (wishBtn) {
    e.preventDefault();
    const id = parseInt(wishBtn.dataset.id);
    const isNow = Wishlist.toggle(id);
    wishBtn.classList.toggle('wishlisted', isNow);
    const icon = wishBtn.querySelector('i');
    if (icon) icon.className = `fa${isNow ? 's' : 'r'} fa-heart`;
  }

  // Quick add to cart
  const addBtn = e.target.closest('.card-add-btn');
  if (addBtn) {
    const id = parseInt(addBtn.dataset.id);
    const product = getProductById(id);
    if (product) Cart.add(id, product.sizes[0], product.colors[0]);
  }
});
