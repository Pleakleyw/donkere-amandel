document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const summaryDetails = document.getElementById('summary-details');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    summaryDetails.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p>Je winkelwagen is leeg.</p>`;
      return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
      totalItems += item.quantity;
      totalPrice += item.quantity * item.price;

      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>Prijs: €${item.price.toFixed(2).replace('.', ',')}</p>
          <div class="quantity-controls">
            <button class="decrease" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
          <p>Subtotaal: €${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    summaryDetails.innerHTML = `
      <p><strong>Producten geselecteerd:</strong> ${totalItems}</p>
      <p><strong>Totaal:</strong> €${totalPrice.toFixed(2).replace('.', ',')}</p>
    `;
  }

  function attachQuantityEvents() {
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('increase')) {
        const index = parseInt(e.target.dataset.index);
        cart[index].quantity++;
        saveCart();
        updateCartDisplay();
      }

      if (e.target.classList.contains('decrease')) {
        const index = parseInt(e.target.dataset.index);
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          // Confirmación opcional para eliminar
          if (confirm(`Verwijder ${cart[index].name} uit de winkelwagen?`)) {
            cart.splice(index, 1);
          }
        }
        saveCart();
        updateCartDisplay();
      }
    });
  }

  
  /* Esto es la ruta del boton del cart y si está vacío nos saldrá la alerta*/

  document.querySelector('.checkout-btn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Je winkelwagen is leeg. Voeg eerst producten toe.");
      return;
    }
    window.location.href = 'shipping.html';
  });


  updateCartDisplay();
  attachQuantityEvents();
});
