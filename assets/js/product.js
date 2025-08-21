// Product details page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
});

// Initialize product page
function initializeProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        // Redirect to shop if no product ID
        window.location.href = 'shop.html';
        return;
    }
    
    const product = productManager.getProductById(parseInt(productId));
    
    if (!product) {
        // Show product not found
        showProductNotFound();
        return;
    }
    
    // Display product details
    displayProductDetails(product);
    
    // Update breadcrumb
    updateBreadcrumb(product);
    
    // Load recommendations
    loadRecommendations(productId);
    
    // Initialize interactions
    initializeProductInteractions();
}

// Display product details
function displayProductDetails(product) {
    const productContainer = document.getElementById('product-container');
    
    if (!productContainer) return;
    
    productContainer.innerHTML = productUtils.createProductDetail(product);
    
    // Initialize image thumbnails
    initializeImageThumbnails();
    
    // Initialize zoom functionality
    initializeImageZoom();
    
    // Initialize add to cart
    initializeAddToCart();
}

// Initialize image thumbnails
function initializeImageThumbnails() {
    const thumbnails = document.querySelectorAll('.product__thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (!mainImage) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newImageSrc = this.dataset.image;
            
            // Update main image
            mainImage.src = newImageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize image zoom functionality
function initializeImageZoom() {
    const mainImageContainer = document.querySelector('.product__main-image');
    const mainImage = document.getElementById('main-product-image');
    
    if (!mainImageContainer || !mainImage) return;
    
    mainImageContainer.addEventListener('click', function() {
        openImageZoom(mainImage.src);
    });
}

// Open image zoom modal
function openImageZoom(imageSrc) {
    // Create zoom modal
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <img src="${imageSrc}" alt="Zoomed product image">
        <div class="zoom-close">&times;</div>
    `;
    
    document.body.appendChild(zoomModal);
    
    // Show modal
    setTimeout(() => {
        zoomModal.classList.add('active');
    }, 10);
    
    // Close on click
    zoomModal.addEventListener('click', function(e) {
        if (e.target === zoomModal || e.target.classList.contains('zoom-close')) {
            zoomModal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(zoomModal);
            }, 300);
        }
    });
    
    // Close on escape key
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            zoomModal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(zoomModal);
            }, 300);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
}

// Initialize add to cart functionality
function initializeAddToCart() {
    const addToCartBtn = document.querySelector('.product__add-to-cart');
    
    if (!addToCartBtn) return;
    
    addToCartBtn.addEventListener('click', function() {
        const productId = parseInt(this.dataset.productId);
        const product = productManager.getProductById(productId);
        
        if (product && product.inStock) {
            cartManager.addToCart(product);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.background = 'var(--success-color, #10B981)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 3000);
        }
    });
}

// Update breadcrumb
function updateBreadcrumb(product) {
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }
    
    // Update page title
    document.title = `${product.name} - Luxe Parfum`;
}

// Load product recommendations
function loadRecommendations(productId) {
    const recommendationsGrid = document.getElementById('recommendations-grid');
    
    if (!recommendationsGrid) return;
    
    const relatedProducts = productManager.getRelatedProducts(parseInt(productId), 4);
    
    if (relatedProducts.length === 0) {
        // Hide recommendations section if no related products
        const recommendationsSection = document.querySelector('.recommendations');
        if (recommendationsSection) {
            recommendationsSection.style.display = 'none';
        }
        return;
    }
    
    recommendationsGrid.innerHTML = relatedProducts.map(product => `
        <div class="recommendation__card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="recommendation__image">
            <div class="recommendation__info">
                <h3 class="recommendation__name">${utils.sanitizeHTML(product.name)}</h3>
                <div class="recommendation__price">${utils.formatPrice(product.price)}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for recommendations
    recommendationsGrid.querySelectorAll('.recommendation__card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            window.location.href = `product.html?id=${productId}`;
        });
    });
}

// Show product not found message
function showProductNotFound() {
    const productContainer = document.getElementById('product-container');
    
    if (productContainer) {
        productContainer.innerHTML = `
            <div class="product-not-found">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <a href="shop.html" class="btn btn--primary">Back to Shop</a>
            </div>
        `;
    }
    
    // Update page title
    document.title = 'Product Not Found - Luxe Parfum';
}

// Initialize additional product interactions
function initializeProductInteractions() {
    // Wishlist functionality (placeholder)
    const wishlistBtn = document.querySelector('.product__wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.innerHTML = this.innerHTML === '♡' ? '♥' : '♡';
            this.style.color = this.innerHTML === '♥' ? 'var(--primary-color)' : '';
            
            const isAdded = this.innerHTML === '♥';
            const message = isAdded ? 'Added to wishlist' : 'Removed from wishlist';
            showNotification(message, 'info');
        });
    }
    
    // Smooth scroll to reviews when clicking rating
    const rating = document.querySelector('.product__rating');
    if (rating) {
        rating.style.cursor = 'pointer';
        rating.addEventListener('click', function() {
            const reviewsSection = document.querySelector('.reviews');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Notification function for product page
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        success: '#10B981',
        error: '#DC2626',
        info: '#3B82F6'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification__message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    const notificationContent = notification.querySelector('.notification__content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const notificationIcon = notification.querySelector('.notification__icon');
    notificationIcon.style.cssText = `
        width: 20px;
        height: 20px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        flex-shrink: 0;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    initializeProductPage();
});