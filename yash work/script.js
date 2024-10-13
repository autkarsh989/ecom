// Simulating product data
const products = Array.from({ length: 20 }).map((_, index) => ({
    name: `Product ${index + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    details: "See Details"
}));

const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle the display of the navigation links
    });

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="../assets/images/placeholder.png" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <p>${product.details}</p>
            <div class="button-group">
                <button class="buy-now">BUY NOW</button>
                <button class="add-to-cart">TO CART</button>
            </div>
        </div>
    `;
}

// Load products into the grid
function loadProducts(startIndex, endIndex) {
    const productGrid = document.getElementById('product-grid');
    for (let i = startIndex; i < endIndex; i++) {
        const productHTML = createProductCard(products[i % products.length]);
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    }
}

// Infinite Scroll Logic
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadProducts(0, 10); // Load 10 more products
    }
});

// Initial Load
loadProducts(0, 10);