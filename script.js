let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});

// Render product list
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return; // Prevent errors if element is missing
  productList.innerHTML = ""; // Clear existing items

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;
  cartList.innerHTML = ""; // Clear the cart list

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} (x${product.quantity}) 
      <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });

  const clearCartButton = document.getElementById("clear-cart-btn");
  if (clearCartButton) {
    clearCartButton.removeEventListener("click", clearCart); // Prevent duplicate event listeners
    clearCartButton.addEventListener("click", clearCart);
  }
}

// Add item to cart (with quantity management)
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((p) => p.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const index = cart.findIndex((p) => p.id === productId);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}


