document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h3').innerText;
      const price = parseFloat(card.querySelector('.price').innerText.replace('€', '').replace(',', '.'));
      const img = card.querySelector('img').getAttribute('src');

      const product = { name, price, img, quantity: 1 };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(item => item.name === product.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} is toegevoegd aan je winkelwagen.`);
    });
  });
});
