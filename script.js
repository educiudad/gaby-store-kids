document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     SCROLL PARA FAVORITOS
  ========================= */
  const btnFavoritos = document.querySelector('.btn-primary');
  const sectionFavoritos = document.querySelector('#favoritos');

  if (btnFavoritos && sectionFavoritos) {
    btnFavoritos.addEventListener('click', () => {
      sectionFavoritos.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* =========================
     INTERSECTION OBSERVER
  ========================= */
  const animatedElements = document.querySelectorAll(
    '.category-card, .favorite-item, .stories-content'
  );

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));

  /* =========================
     HEADER COM SOMBRA
  ========================= */
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* =========================
     MICROINTERAÇÃO BOTÕES
  ========================= */
  document.querySelectorAll('button, .stories-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 200);
    });
  });

  /* =========================
     STAGGER FAVORITOS
  ========================= */
  document.querySelectorAll('.favorite-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  /* =========================
     MENU HAMBURGER
  ========================= */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.menu-overlay');
  const menuLinks = document.querySelectorAll('.menu a');

  if (hamburger && nav && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      overlay.classList.remove('show');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        overlay.classList.remove('show');
      });
    });
  }

});


const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.product-modal .modal-overlay');

document.querySelectorAll('.favorite-item').forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    const img = item.querySelector('img');

    modalImage.src = img.src;
    modalTitle.textContent = `Produto ${index + 1}`;
    modalPrice.textContent = 'R$ 99,90';

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

const addToCartBtn = document.querySelector('.add-to-cart');

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


/* =========================
   CARRINHO - LOCALSTORAGE
========================= */


const cartCount = document.querySelector('.cart-count');

/* pegar carrinho */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

/* salvar carrinho */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* atualizar contador */
function updateCartCount() {
  if (!cartCount) return;

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

/* adicionar produto */
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const cart = getCart();

    const product = {
      title: modalTitle.textContent,
      price: modalPrice.textContent,
      image: modalImage.src,
      quantity: 1
    };

    const existing = cart.find(item => item.title === product.title);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    saveCart(cart);
    updateCartCount();
    renderCart();

    addToCartBtn.textContent = 'Adicionado ✔';
    addToCartBtn.disabled = true;

    setTimeout(() => {
      addToCartBtn.textContent = 'Adicionar ao carrinho';
      addToCartBtn.disabled = false;
    }, 1500);
  });
}

/* atualizar contador ao carregar a página */
updateCartCount();

/* =========================
   MINI CARRINHO
========================= */

const cartIcon = document.querySelector('.cart-icon');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartClose = document.querySelector('.cart-close');

function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const price = Number(item.price.replace('R$', '').replace(',', '.'));
    total += price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <span>${item.quantity}x • ${item.price}</span>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/* abrir carrinho */
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    renderCart();
    cartPanel.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
}

/* fechar carrinho */
function closeCart() {
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);