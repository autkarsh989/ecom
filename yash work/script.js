// Simulating product data (adding image link to products)
const products = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1, // Unique identifier for each product
    name: `Product ${index + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    details: "See Details",
    img: `https://storage.googleapis.com/a1aa/image/hLC146Xa4y4qB5UrLSz1zkWHy1M4Vhdep9GOvTVONxGdhBzJA.jpg` // Ensure these images exist in your images folder
}));

// Retrieve cart from localStorage or initialize as empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
    } else {
        console.error('Product not found!');
    }
}

// Function to update cart count in the icon
function updateCartCount() {
    const cartCountElement = document.querySelector('#cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Function to load products onto the product grid
function loadProducts(startIndex, count) {
    const productGrid = document.getElementById('product-grid');
    const productsToLoad = products.slice(startIndex, startIndex + count);

    productsToLoad.forEach((product) => {
        const productCard = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null; this.src='images/default.jpg';">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <div class="button-group">
                    <button class="buy-now">Buy Now</button>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });
}

// Function to load cart items onto the cart page
function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return; // Exit if not on cart page

    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null; this.src='https://storage.googleapis.com/a1aa/image/hLC146Xa4y4qB5UrLSz1zkWHy1M4Vhdep9GOvTVONxGdhBzJA.jpg';">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price}</p>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}

// Function to remove items from the cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart.splice(index, 1)[0];
        localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        updateCartCount();
        loadCartItems(); // Re-load the cart items
        alert(`${removedItem.name} has been removed from your cart.`);
    }
}

// Function to display cart items on the cart page (alternative approach)
function displayCartItems() {
    // This function is redundant since loadCartItems handles displaying items
    // You can remove it if not needed
}

// Initialize the cart count and load products if on the index page
window.addEventListener('load', () => {
    updateCartCount();
    if (document.getElementById('product-grid')) {
        loadProducts(0, 10);
    }
    if (document.querySelector('.cart-items')) {
        loadCartItems();
    }
});

// Infinite Scroll Logic to load products dynamically
let currentIndex = 12; // Start from 10 since first 10 are already loaded
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (currentIndex < products.length) { // Check if more products are available
            loadProducts(currentIndex, 10);
            currentIndex += 10;
        }
    }
});
