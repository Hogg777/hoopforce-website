// THEME TOGGLE
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('hf-theme', next);
  });

  const saved = localStorage.getItem('hf-theme') || 'dark';
  root.setAttribute('data-theme', saved);
}

// SIMPLE CART (localStorage)
const CART_KEY = 'hf-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert(`${product.name} added to cart`);
}

function updateCartCount() {
  const cart = getCart();
  const badge = document.querySelector('.cart-count');
  if (!badge) return;
  badge.textContent = cart.length;
}

updateCartCount();

// Attach to buttons (Shop page)
document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      name: btn.dataset.name,
      price: btn.dataset.price,
      img: btn.dataset.img
    };
    addToCart(product);
  });
});

// Checkout page rendering
const cartContainer = document.querySelector('#cart-items');
const cartTotalEl = document.querySelector('#cart-total');

if (cartContainer && cartTotalEl) {
  const cart = getCart();
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalEl.textContent = '£0';
  } else {
    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
      total += Number(item.price);
      return `
        <div class="card" style="display:flex;gap:14px;align-items:center;">
          <img src="${item.img}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
          <div>
            <h3>${item.name}</h3>
            <p class="price">£${item.price}</p>
          </div>
        </div>
      `;
    }).join('');
    cartTotalEl.textContent = '£' + total.toFixed(2);
  }

  const clearBtn = document.querySelector('#clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      saveCart([]);
      location.reload();
    });
  }

  const checkoutBtn = document.querySelector('#real-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Replace this URL with your real Shopify/Stripe checkout link
      window.location.href = 'https://your-real-checkout-link.com';
    });
  }
}
