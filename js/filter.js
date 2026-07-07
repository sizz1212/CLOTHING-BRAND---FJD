// ============================================
// FJD — Filter, Search & Sort
// ============================================

const ShopFilter = {
  state: {
    search: '',
    categories: [],
    minPrice: 0,
    maxPrice: 99999,
    sort: 'newest'
  },

  apply(products) {
    let result = [...products];

    // Search
    if (this.state.search) {
      const q = this.state.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (this.state.categories.length > 0) {
      result = result.filter(p => this.state.categories.includes(p.category));
    }

    // Price
    result = result.filter(p => p.price >= this.state.minPrice && p.price <= this.state.maxPrice);

    // Sort
    switch (this.state.sort) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'best':       result.sort((a, b) => b.sold - a.sold); break;
      case 'newest':     result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  },

  setSearch(q) { this.state.search = q; },
  setSort(s)   { this.state.sort = s; },
  setPriceRange(min, max) { this.state.minPrice = min; this.state.maxPrice = max; },

  toggleCategory(cat) {
    const idx = this.state.categories.indexOf(cat);
    if (idx > -1) this.state.categories.splice(idx, 1);
    else this.state.categories.push(cat);
  },

  reset() {
    this.state = { search: '', categories: [], minPrice: 0, maxPrice: 99999, sort: 'newest' };
  }
};
