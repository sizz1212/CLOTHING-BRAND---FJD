// ============================================
// FJD — Products Data
// ============================================

// Image map: category → image path
const PRODUCT_IMAGES = {
  'T-Shirts':     ['images/tshirt.png', 'images/tshirt2.png'],
  'Hoodies':      ['images/hoodie.png'],
  'Jackets':      ['images/clothing.png'],
  'Bottoms':      ['images/pants.png', 'images/clothing.png'],
  'Accessories':  ['images/clothing.png'],
};

// Helper: get image for a product
function getProductImage(category, index = 0) {
  const imgs = PRODUCT_IMAGES[category] || ['images/clothing.png'];
  return imgs[index % imgs.length];
}

const FJD_PRODUCTS = [
  // T-SHIRTS
  { id:1,  name:"Classic Tee",       category:"T-Shirts",   price:899,  originalPrice:null, badge:"new",  colors:["#2C2C2C","#F7F5F0","#8FAF8A"], sizes:["XS","S","M","L","XL","XXL"], rating:4.8, reviews:124, sold:312, isNew:true,  isBestSeller:false, description:"Our signature classic tee. Pre-shrunk premium cotton with a relaxed fit that keeps its shape wash after wash.", img:"images/tshirt.png" },
  { id:2,  name:"Essential Tee",     category:"T-Shirts",   price:799,  originalPrice:null, badge:null,   colors:["#A8C4D4","#8FAF8A","#D4C4A8"], sizes:["XS","S","M","L","XL"],       rating:4.6, reviews:87,  sold:198, isNew:false, isBestSeller:true,  description:"Lightweight, breathable, essential. The tee you'll reach for first every morning.", img:"images/tshirt.png" },
  { id:3,  name:"Graphic Tee",       category:"T-Shirts",   price:1099, originalPrice:1399, badge:"sale", colors:["#2C2C2C","#F7F5F0"],           sizes:["S","M","L","XL","XXL"],      rating:4.7, reviews:63,  sold:156, isNew:false, isBestSeller:false, description:"Art meets apparel. FJD BE POLITE. printed on heavyweight washed cotton.", img:"images/tshirt2.png" },
  { id:4,  name:"Heavyweight Tee",   category:"T-Shirts",   price:1199, originalPrice:null, badge:"hot",  colors:["#2C2C2C","#4A4A4A","#8FAF8A"], sizes:["S","M","L","XL","XXL"],      rating:4.9, reviews:201, sold:445, isNew:false, isBestSeller:true,  description:"240gsm heavyweight cotton. Structured, substantial, built to outlast trends.", img:"images/tshirt2.png" },
  { id:5,  name:"Relaxed Tee",       category:"T-Shirts",   price:849,  originalPrice:null, badge:"new",  colors:["#D4C4A8","#A8C4D4","#F7F5F0"], sizes:["XS","S","M","L","XL"],       rating:4.5, reviews:42,  sold:89,  isNew:true,  isBestSeller:false, description:"Dropped shoulders, easy silhouette. Made for the days you want to feel effortless.", img:"images/tshirt.png" },
  { id:6,  name:"Vintage Tee",       category:"T-Shirts",   price:999,  originalPrice:null, badge:null,   colors:["#8B7355","#4A4A4A","#2C2C2C"], sizes:["S","M","L","XL"],            rating:4.7, reviews:55,  sold:134, isNew:false, isBestSeller:false, description:"Washed, worn-in feel with the quality to last years.", img:"images/tshirt2.png" },

  // HOODIES
  { id:7,  name:"Classic Hoodie",    category:"Hoodies",    price:2499, originalPrice:null, badge:"hot",  colors:["#2C2C2C","#8FAF8A","#A8C4D4"], sizes:["XS","S","M","L","XL","XXL"], rating:4.9, reviews:318, sold:621, isNew:false, isBestSeller:true,  description:"Our most-loved style. French terry cotton with a kangaroo pocket and adjustable drawstring.", img:"images/hoodie.png" },
  { id:8,  name:"Oversized Hoodie",  category:"Hoodies",    price:2799, originalPrice:null, badge:"new",  colors:["#F7F5F0","#B8D0B3","#4A4A4A"], sizes:["S","M","L","XL","XXL"],      rating:4.8, reviews:144, sold:287, isNew:true,  isBestSeller:true,  description:"Dramatically dropped shoulders, extended body length. The oversized silhouette done right.", img:"images/hoodie.png" },
  { id:9,  name:"Zip Hoodie",        category:"Hoodies",    price:2699, originalPrice:3199, badge:"sale", colors:["#2C2C2C","#4A4A4A","#A8C4D4"], sizes:["S","M","L","XL"],            rating:4.6, reviews:78,  sold:165, isNew:false, isBestSeller:false, description:"Full-zip construction for versatile layering. YKK zipper, ribbed cuffs, clean finish.", img:"images/hoodie.png" },
  { id:10, name:"Fleece Hoodie",     category:"Hoodies",    price:2999, originalPrice:null, badge:null,   colors:["#8FAF8A","#D4C4A8","#2C2C2C"], sizes:["XS","S","M","L","XL","XXL"], rating:4.8, reviews:92,  sold:203, isNew:false, isBestSeller:false, description:"Thick brushed fleece lining. Cold weather's best friend — cozy without the bulk.", img:"images/hoodie.png" },
  { id:11, name:"Premium Hoodie",    category:"Hoodies",    price:3499, originalPrice:null, badge:"hot",  colors:["#2C2C2C","#F7F5F0","#8FAF8A"], sizes:["S","M","L","XL","XXL"],      rating:4.9, reviews:176, sold:334, isNew:false, isBestSeller:true,  description:"Heavyweight 400gsm terry. Reinforced stitching, thick drawstrings, custom hardware.", img:"images/hoodie.png" },

  // JACKETS
  { id:12, name:"Denim Jacket",      category:"Jackets",    price:3999, originalPrice:null, badge:"new",  colors:["#5B7FA8","#2C2C2C","#8B7355"], sizes:["XS","S","M","L","XL"],       rating:4.7, reviews:53,  sold:108, isNew:true,  isBestSeller:false, description:"100% selvedge denim. Structured fit with brass hardware and interior chest pocket.", img:"images/clothing.png" },
  { id:13, name:"Varsity Jacket",    category:"Jackets",    price:4999, originalPrice:null, badge:"hot",  colors:["#2C2C2C","#8FAF8A","#A8C4D4"], sizes:["S","M","L","XL","XXL"],      rating:4.8, reviews:89,  sold:178, isNew:false, isBestSeller:true,  description:"Wool body, leather sleeves, satin lining. Classic American sportswear reinterpreted.", img:"images/clothing.png" },
  { id:14, name:"Bomber Jacket",     category:"Jackets",    price:4599, originalPrice:5499, badge:"sale", colors:["#2C2C2C","#4A4A4A","#8FAF8A"], sizes:["S","M","L","XL"],            rating:4.6, reviews:67,  sold:143, isNew:false, isBestSeller:false, description:"Nylon shell with satin lining. Ribbed collar, cuffs and hem. Timeless shape.", img:"images/clothing.png" },
  { id:15, name:"Coach Jacket",      category:"Jackets",    price:3499, originalPrice:null, badge:"new",  colors:["#A8C4D4","#8FAF8A","#2C2C2C"], sizes:["XS","S","M","L","XL","XXL"], rating:4.7, reviews:44,  sold:92,  isNew:true,  isBestSeller:false, description:"Lightweight woven nylon, snap buttons, relaxed cut. The perfect transitional layer.", img:"images/clothing.png" },

  // BOTTOMS
  { id:16, name:"Cargo Pants",       category:"Bottoms",    price:2799, originalPrice:null, badge:"hot",  colors:["#4A4A4A","#8B7355","#8FAF8A"], sizes:["28","30","32","34","36"],     rating:4.8, reviews:156, sold:289, isNew:false, isBestSeller:true,  description:"Six-pocket cargo silhouette with tapered leg. Ripstop cotton canvas that softens with wear.", img:"images/pants.png" },
  { id:17, name:"Sweatpants",        category:"Bottoms",    price:2199, originalPrice:null, badge:null,   colors:["#2C2C2C","#F7F5F0","#A8C4D4"], sizes:["XS","S","M","L","XL","XXL"], rating:4.9, reviews:223, sold:467, isNew:false, isBestSeller:true,  description:"Heavyweight fleece sweatpants with a relaxed fit and elasticated ankle.", img:"images/pants.png" },
  { id:18, name:"Joggers",           category:"Bottoms",    price:1999, originalPrice:null, badge:"new",  colors:["#8FAF8A","#2C2C2C","#D4C4A8"], sizes:["XS","S","M","L","XL"],       rating:4.6, reviews:71,  sold:154, isNew:true,  isBestSeller:false, description:"French terry joggers with a tapered fit. Side zip pockets, contrast drawstring.", img:"images/pants.png" },
  { id:19, name:"Denim Jeans",       category:"Bottoms",    price:2999, originalPrice:null, badge:null,   colors:["#5B7FA8","#2C2C2C","#8B7355"], sizes:["28","30","32","34","36","38"],rating:4.7, reviews:108, sold:234, isNew:false, isBestSeller:false, description:"Straight-leg, mid-rise. 12oz Japanese denim that breaks in beautifully over time.", img:"images/pants.png" },
  { id:20, name:"Chino Pants",       category:"Bottoms",    price:2399, originalPrice:2999, badge:"sale", colors:["#D4C4A8","#2C2C2C","#8FAF8A"], sizes:["28","30","32","34","36"],     rating:4.5, reviews:62,  sold:127, isNew:false, isBestSeller:false, description:"Slim-tapered chinos in brushed cotton twill. Versatile enough for wherever the day takes you.", img:"images/pants.png" },
  { id:21, name:"Shorts",            category:"Bottoms",    price:1499, originalPrice:null, badge:"new",  colors:["#A8C4D4","#8FAF8A","#F7F5F0"], sizes:["XS","S","M","L","XL","XXL"], rating:4.6, reviews:84,  sold:191, isNew:true,  isBestSeller:false, description:"5-inch inseam, relaxed fit. Quick-dry ripstop fabric with side pockets.", img:"images/clothing.png" },

  // ACCESSORIES
  { id:22, name:"Cap",               category:"Accessories",price:799,  originalPrice:null, badge:"hot",  colors:["#2C2C2C","#8FAF8A","#A8C4D4","#F7F5F0"], sizes:["One Size"],      rating:4.8, reviews:197, sold:423, isNew:false, isBestSeller:true,  description:"Unstructured 6-panel cap in washed cotton twill. Adjustable strap, embroidered FJD mark.", img:"images/clothing.png" },
  { id:23, name:"Beanie",            category:"Accessories",price:699,  originalPrice:null, badge:null,   colors:["#2C2C2C","#8FAF8A","#A8C4D4","#D4C4A8"], sizes:["One Size"],      rating:4.7, reviews:134, sold:298, isNew:false, isBestSeller:false, description:"100% merino wool. Ribbed knit, folded cuff. Warm without being scratchy.", img:"images/clothing.png" },
  { id:24, name:"Tote Bag",          category:"Accessories",price:999,  originalPrice:null, badge:"new",  colors:["#F7F5F0","#2C2C2C","#B8D0B3"],           sizes:["One Size"],      rating:4.9, reviews:88,  sold:201, isNew:true,  isBestSeller:false, description:"12oz canvas tote with reinforced handles. Interior zip pocket. Screen-printed FJD wordmark.", img:"images/clothing.png" },
  { id:25, name:"Crossbody Bag",     category:"Accessories",price:1999, originalPrice:2499, badge:"sale", colors:["#2C2C2C","#D4C4A8","#8FAF8A"],           sizes:["One Size"],      rating:4.7, reviews:56,  sold:112, isNew:false, isBestSeller:false, description:"Compact crossbody in premium nylon. Water-resistant, adjustable strap, multiple compartments.", img:"images/clothing.png" },
  { id:26, name:"Socks",             category:"Accessories",price:299,  originalPrice:null, badge:null,   colors:["#F7F5F0","#8FAF8A","#A8C4D4","#2C2C2C"], sizes:["S/M","L/XL"],    rating:4.5, reviews:245, sold:567, isNew:false, isBestSeller:false, description:"Ribbed crew socks in soft cotton blend. Subtle FJD branding at the ankle.", img:"images/clothing.png" },
];

const getProductById     = (id)  => FJD_PRODUCTS.find(p => p.id === id);
const getProductsByCategory = (cat) => FJD_PRODUCTS.filter(p => p.category === cat);
const getFeaturedProducts = ()   => FJD_PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
const getNewArrivals      = ()   => FJD_PRODUCTS.filter(p => p.isNew).slice(0, 8);
const getRelatedProducts  = (id, limit = 4) => {
  const product = getProductById(id);
  return FJD_PRODUCTS.filter(p => p.category === product?.category && p.id !== id).slice(0, limit);
};
const CATEGORIES = [...new Set(FJD_PRODUCTS.map(p => p.category))];
