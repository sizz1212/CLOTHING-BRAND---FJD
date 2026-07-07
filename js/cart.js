// ============================================
// FJD — Cart & Wishlist (LocalStorage)
// ============================================

// ── CART ──────────────────────────────────

const Cart = {
  key: 'fjd_cart',

  getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },

  add(productId, size, color, qty = 1) {
    const product = getProductById(productId);
    if (!product) return;
    const items = this.getAll();
    const key = `${productId}-${size}-${color}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ key, productId, size, color, qty, addedAt: Date.now() });
    }
    this.save(items);
    showToast(`<i class="fas fa-shopping-bag"></i> ${product.name} added to cart`);
  },

  remove(key) {
    const items = this.getAll().filter(i => i.key !== key);
    this.save(items);
    showToast(`<i class="fas fa-trash"></i> Item removed from cart`);
  },

  updateQty(key, qty) {
    const items = this.getAll();
    const item = items.find(i => i.key === key);
    if (item) {
      if (qty < 1) { this.remove(key); return; }
      item.qty = qty;
      this.save(items);
    }
  },

  clear() {
    localStorage.removeItem(this.key);
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },

  count() {
    return this.getAll().reduce((sum, i) => sum + i.qty, 0);
  },

  total() {
    return this.getAll().reduce((sum, i) => {
      const p = getProductById(i.productId);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },

  updateBadge() {
    const count = this.count();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ── WISHLIST ──────────────────────────────

const Wishlist = {
  key: 'fjd_wishlist',

  getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },

  save(ids) {
    localStorage.setItem(this.key, JSON.stringify(ids));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  },

  toggle(productId) {
    const ids = this.getAll();
    const product = getProductById(productId);
    if (!product) return;
    if (ids.includes(productId)) {
      this.save(ids.filter(id => id !== productId));
      showToast(`<i class="far fa-heart"></i> Removed from wishlist`);
      return false;
    } else {
      this.save([...ids, productId]);
      showToast(`<i class="fas fa-heart"></i> Added to wishlist`);
      return true;
    }
  },

  has(productId) {
    return this.getAll().includes(productId);
  },

  remove(productId) {
    this.save(this.getAll().filter(id => id !== productId));
  },

  count() {
    return this.getAll().length;
  },

  updateBadge() {
    const count = this.count();
    document.querySelectorAll('.wishlist-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ── TOAST ────────────────────────────────

function showToast(message, duration = 2800) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ── FORMAT PRICE ──────────────────────────

function formatPrice(amount) {
  return '₱' + amount.toLocaleString('en-PH');
}

// Init badges on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  Wishlist.updateBadge();
});
