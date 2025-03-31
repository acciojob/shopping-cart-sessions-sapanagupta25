const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for the "Add to Cart" buttons
  const addButtons = document.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  // Clear current cart display
  cartList.innerHTML = '';

  // Get cart items from sessionStorage
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Display each item in the cart
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add the product to the cart (allow duplicates if same product is added)
  cart.push(product);

  // Save updated cart to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart UI
  renderCart();
}

// Clear the cart
clearCartButton.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// Initial render
renderProducts();
renderCart();

