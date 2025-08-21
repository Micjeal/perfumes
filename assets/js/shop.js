// Shop page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    initializeFilters();
    initializeSearch();
    handleURLParameters();
});

let currentFilters = {
    category: '',
    scent: '',
    price: '',
    search: ''
};

// Initialize shop functionality
function initializeShop() {
    displayProducts();
    initializeProductCards();
}

// Display products in grid
function displayProducts(products = null) {
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (!productsGrid) return;
    
    // Use filtered products if no specific products provided
    const productsToShow = products || productManager.getFilteredProducts();
    
    if (productsToShow.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    // Add products with animation
    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.innerHTML = productUtils.createProductCard(product);
        productCard.firstElementChild.style.animationDelay = `${index * 0.1}s`;
        productCard.firstElementChild.classList.add('animate-in');
        productsGrid.appendChild(productCard.firstElementChild);
    });
    
    // Initialize event listeners for new products
    initializeProductCards();
}

// Initialize product card interactions
function initializeProductCards() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.product__add-to-cart');
    addToCartButtons.forEach(button => {
        // Remove existing listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-query after cloning
    document.querySelectorAll('.product__add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Product cards for navigation
    const productCards = document.querySelectorAll('.product__card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on buttons
            if (e.target.closest('button')) return;
            
            const productId = this.dataset.productId;
            if (productId) {
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
    
    // Wishlist buttons (placeholder functionality)
    const wishlistButtons = document.querySelectorAll('.product__wishlist');
    wishlistButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
    
    document.querySelectorAll('.product__wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Placeholder wishlist functionality
            this.innerHTML = this.innerHTML === '♡' ? '♥' : '♡';
            this.style.color = this.innerHTML === '♥' ? 'var(--primary-color)' : '';
        });
    });
}

// Handle add to cart
function handleAddToCart(e) {
    e.stopPropagation();
    
    const productId = parseInt(this.dataset.productId);
    const product = productManager.getProductById(productId);
    
    if (product && product.inStock) {
        cartManager.addToCart(product);
        
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.background = 'var(--success-color, #10B981)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    }
}

// Initialize filters
function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const scentFilter = document.getElementById('scent-filter');
    const priceFilter = document.getElementById('price-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    }
    
    // Scent filter
    if (scentFilter) {
        scentFilter.addEventListener('change', function() {
            currentFilters.scent = this.value;
            applyFilters();
        });
    }
    
    // Price filter
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            currentFilters.price = this.value;
            applyFilters();
        });
    }
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            clearFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    const filters = {
        category: currentFilters.category,
        scent: currentFilters.scent,
        priceRange: currentFilters.price,
        search: currentFilters.search
    };
    
    const filteredProducts = productManager.filterProducts(filters);
    displayProducts(filteredProducts);
    
    // Update URL without reload
    updateURL();
}

// Clear filters
function clearFilters() {
    currentFilters = {
        category: '',
        scent: '',
        price: '',
        search: ''
    };
    
    // Reset form controls
    const categoryFilter = document.getElementById('category-filter');
    const scentFilter = document.getElementById('scent-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchInput = document.getElementById('search-input');
    
    if (categoryFilter) categoryFilter.value = '';
    if (scentFilter) scentFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    // Reset products
    productManager.filterProducts({});
    displayProducts();
    
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (!searchInput || !searchSuggestions) return;
    
    // Debounced search function
    const debouncedSearch = utils.debounce(function(query) {
        currentFilters.search = query;
        applyFilters();
        
        // Update suggestions
        if (query.length >= 2) {
            const suggestions = productManager.getSearchSuggestions(query);
            displaySearchSuggestions(suggestions);
        } else {
            hideSearchSuggestions();
        }
    }, 300);
    
    // Search input handler
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        debouncedSearch(query);
    });
    
    // Focus and blur handlers for suggestions
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            const suggestions = productManager.getSearchSuggestions(query);
            displaySearchSuggestions(suggestions);
        }
    });
    
    searchInput.addEventListener('blur', function() {
        // Delay hiding to allow for suggestion clicks
        setTimeout(() => {
            hideSearchSuggestions();
        }, 200);
    });
}

// Display search suggestions
function displaySearchSuggestions(suggestions) {
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (suggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    searchSuggestions.innerHTML = suggestions.map(suggestion => `
        <div class="search__suggestion" data-type="${suggestion.type}" data-id="${suggestion.id || ''}" data-filter='${JSON.stringify(suggestion.filter || {})}'>
            ${suggestion.text}
        </div>
    `).join('');
    
    searchSuggestions.style.display = 'block';
    
    // Add click handlers
    searchSuggestions.querySelectorAll('.search__suggestion').forEach(suggestionEl => {
        suggestionEl.addEventListener('click', function() {
            const type = this.dataset.type;
            const id = this.dataset.id;
            const filter = JSON.parse(this.dataset.filter || '{}');
            
            if (type === 'product' && id) {
                window.location.href = `product.html?id=${id}`;
            } else if (filter && Object.keys(filter).length > 0) {
                // Apply filter
                if (filter.category) {
                    currentFilters.category = filter.category;
                    document.getElementById('category-filter').value = filter.category;
                }
                if (filter.scent) {
                    currentFilters.scent = filter.scent;
                    document.getElementById('scent-filter').value = filter.scent;
                }
                applyFilters();
            }
            
            hideSearchSuggestions();
        });
    });
}

// Hide search suggestions
function hideSearchSuggestions() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

// Handle URL parameters
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for category parameter
    const category = urlParams.get('category');
    if (category) {
        currentFilters.category = category;
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }
    }
    
    // Check for scent parameter
    const scent = urlParams.get('scent');
    if (scent) {
        currentFilters.scent = scent;
        const scentFilter = document.getElementById('scent-filter');
        if (scentFilter) {
            scentFilter.value = scent;
        }
    }
    
    // Check for search parameter
    const search = urlParams.get('search');
    if (search) {
        currentFilters.search = search;
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = search;
        }
    }
    
    // Apply filters if any parameters were found
    if (category || scent || search) {
        applyFilters();
    }
}

// Update URL with current filters
function updateURL() {
    const params = new URLSearchParams();
    
    if (currentFilters.category) {
        params.set('category', currentFilters.category);
    }
    if (currentFilters.scent) {
        params.set('scent', currentFilters.scent);
    }
    if (currentFilters.search) {
        params.set('search', currentFilters.search);
    }
    
    const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, document.title, newURL);
}

// Initialize sorting (if needed)
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            productManager.sortProducts(sortBy);
            displayProducts();
        });
    }
}

// Add sorting to initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSorting();
});