  document.addEventListener("DOMContentLoaded", () => {
    const orderId = "BEZ" + Math.floor(10000000 + Math.random() * 89999999);
    document.getElementById("order-id").textContent = orderId;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryDiv = document.getElementById("order-summary");

    if (cart.length === 0) return;

    let html = "<h3>Overzicht van je bestelling:</h3><div class='order-summary-items'>";
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      html += `
        <div class="summary-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="item-details">
            <p><strong>${item.name}</strong></p>
            <p>${item.quantity} × €${item.price.toFixed(2)}</p>
            <p><strong>Subtotaal:</strong> €${subtotal.toFixed(2)}</p>
          </div>
        </div>
      `;
    });

    html += `</div><p><strong>Totaal: €${total.toFixed(2)}</strong></p>`;
    summaryDiv.innerHTML = html;

    localStorage.removeItem("cart");
  
  });