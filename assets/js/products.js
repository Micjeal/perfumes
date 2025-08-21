// Product data and management

// Sample product data (In a real application, this would come from an API)
const products = [
    {
        id: 1,
        name: "Elegant Rose",
        description: "A sophisticated blend of Bulgarian rose and white tea",
        price: 89.99,
        category: "women",
        scent: "floral",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
        images: [
            "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
            "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg"
        ],
        inStock: true,
        volume: "50ml",
        notes: {
            top: ["Bulgarian Rose", "Pink Pepper", "Bergamot"],
            middle: ["White Tea", "Peony", "Lily of the Valley"],
            base: ["White Musk", "Cedar", "Ambroxan"]
        },
        rating: 4.8,
        reviewCount: 127
    },
    {
        id: 2,
        name: "Mystic Woods",
        description: "Deep and mysterious with notes of sandalwood and amber",
        price: 124.99,
        category: "men",
        scent: "woody",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
        images: [
            "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
            "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg"
        ],
        inStock: true,
        volume: "100ml",
        notes: {
            top: ["Black Pepper", "Pink Pepper", "Cardamom"],
            middle: ["Sandalwood", "Cedar", "Patchouli"],
            base: ["Amber", "Vanilla", "Tonka Bean"]
        },
        rating: 4.9,
        reviewCount: 89
    },
    {
        id: 3,
        name: "Citrus Burst",
        description: "Refreshing and energizing with Mediterranean citrus",
        price: 67.99,
        category: "unisex",
        scent: "citrus",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg",
        images: [
            "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg",
            "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
        ],
        inStock: true,
        volume: "75ml",
        notes: {
            top: ["Lemon", "Bergamot", "Grapefruit"],
            middle: ["Neroli", "Orange Blossom", "Petitgrain"],
            base: ["White Musk", "Vetiver", "Light Woods"]
        },
        rating: 4.6,
        reviewCount: 203
    },
    {
        id: 4,
        name: "Oriental Dreams",
        description: "Exotic and luxurious with vanilla and spices",
        price: 156.99,
        category: "women",
        scent: "oriental",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg",
        images: [
            "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
            "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg"
        ],
        inStock: true,
        volume: "50ml",
        notes: {
            top: ["Saffron", "Pink Pepper", "Orange"],
            middle: ["Rose", "Jasmine", "Cinnamon"],
            base: ["Vanilla", "Amber", "Patchouli"]
        },
        rating: 4.7,
        reviewCount: 156
    },
    {
        id: 5,
        name: "Fresh Breeze",
        description: "Light and airy with marine and green notes",
        price: 72.99,
        category: "men",
        scent: "fresh",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
        images: [
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
            "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg",
            "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg"
        ],
        inStock: true,
        volume: "100ml",
        notes: {
            top: ["Marine Notes", "Mint", "Green Apple"],
            middle: ["Lavender", "Geranium", "Sage"],
            base: ["Cedar", "White Musk", "Ambroxan"]
        },
        rating: 4.5,
        reviewCount: 134
    },
    {
        id: 6,
        name: "Midnight Bloom",
        description: "Mysterious floral with dark undertones",
        price: 98.99,
        category: "women",
        scent: "floral",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
        images: [
            "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg",
            "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
        ],
        inStock: true,
        volume: "75ml",
        notes: {
            top: ["Blackcurrant", "Pear", "Pink Pepper"],
            middle: ["Tuberose", "Jasmine", "Orange Blossom"],
            base: ["Vanilla", "Patchouli", "Vetiver"]
        },
        rating: 4.8,
        reviewCount: 98
    },
    {
        id: 7,
        name: "Golden Spice",
        description: "Warm and spicy with golden amber",
        price: 142.99,
        category: "unisex",
        scent: "oriental",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
        images: [
            "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
            "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg",
            "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg"
        ],
        inStock: false,
        volume: "50ml",
        notes: {
            top: ["Cardamom", "Coriander", "Orange"],
            middle: ["Cinnamon", "Rose", "Jasmine"],
            base: ["Amber", "Sandalwood", "Musk"]
        },
        rating: 4.9,
        reviewCount: 76
    },
    {
        id: 8,
        name: "Ocean Mist",
        description: "Fresh aquatic fragrance with sea salt",
        price: 79.99,
        category: "unisex",
        scent: "fresh",
        brand: "Luxe Parfum",
        image: "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg",
        images: [
            "https://images.pexels.com/photos/6636286/pexels-photo-6636286.jpeg",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
            "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg"
        ],
        inStock: true,
        volume: "100ml",
        notes: {
            top: ["Sea Salt", "Lemon", "Marine Notes"],
            middle: ["Water Lily", "Cyclamen", "Freesia"],
            base: ["Driftwood", "White Musk", "Amber"]
        },
        rating: 4.4,
        reviewCount: 167
    }
];

// Product management class
class ProductManager {
    constructor() {
        this.products = products;
        this.filteredProducts = [...products];
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    // Filter products
    filterProducts(filters) {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (filters.category && product.category !== filters.category) {
                return false;
            }

            // Scent filter
            if (filters.scent && product.scent !== filters.scent) {
                return false;
            }

            // Price range filter
            if (filters.priceRange) {
                const [min, max] = filters.priceRange.split('-').map(Number);
                if (max && (product.price < min || product.price > max)) {
                    return false;
                }
                if (!max && product.price < min) {
                    return false;
                }
            }

            // Search query filter
            if (filters.search) {
                const query = filters.search.toLowerCase();
                const searchableText = `${product.name} ${product.description} ${product.brand} ${product.scent}`.toLowerCase();
                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });

        return this.filteredProducts;
    }

    // Search products
    searchProducts(query) {
        if (!query) {
            this.filteredProducts = [...this.products];
            return this.filteredProducts;
        }

        const searchQuery = query.toLowerCase();
        this.filteredProducts = this.products.filter(product => {
            const searchableText = `${product.name} ${product.description} ${product.brand} ${product.scent}`.toLowerCase();
            return searchableText.includes(searchQuery);
        });

        return this.filteredProducts;
    }

    // Get search suggestions
    getSearchSuggestions(query) {
        if (!query || query.length < 2) {
            return [];
        }

        const suggestions = [];
        const searchQuery = query.toLowerCase();

        // Add product names
        this.products.forEach(product => {
            if (product.name.toLowerCase().includes(searchQuery)) {
                suggestions.push({
                    type: 'product',
                    text: product.name,
                    id: product.id
                });
            }
        });

        // Add categories
        const categories = ['men', 'women', 'unisex'];
        categories.forEach(category => {
            if (category.includes(searchQuery)) {
                suggestions.push({
                    type: 'category',
                    text: category.charAt(0).toUpperCase() + category.slice(1),
                    filter: { category }
                });
            }
        });

        // Add scent types
        const scents = ['floral', 'woody', 'citrus', 'oriental', 'fresh'];
        scents.forEach(scent => {
            if (scent.includes(searchQuery)) {
                suggestions.push({
                    type: 'scent',
                    text: scent.charAt(0).toUpperCase() + scent.slice(1),
                    filter: { scent }
                });
            }
        });

        return suggestions.slice(0, 8); // Limit to 8 suggestions
    }

    // Get related products
    getRelatedProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && (p.category === product.category || p.scent === product.scent))
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);
    }

    // Get filtered products
    getFilteredProducts() {
        return this.filteredProducts;
    }

    // Sort products
    sortProducts(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default: shuffle for variety
                this.filteredProducts.sort(() => 0.5 - Math.random());
        }

        return this.filteredProducts;
    }

    // Get product statistics
    getProductStats() {
        return {
            total: this.products.length,
            inStock: this.products.filter(p => p.inStock).length,
            categories: {
                men: this.products.filter(p => p.category === 'men').length,
                women: this.products.filter(p => p.category === 'women').length,
                unisex: this.products.filter(p => p.category === 'unisex').length
            },
            scents: {
                floral: this.products.filter(p => p.scent === 'floral').length,
                woody: this.products.filter(p => p.scent === 'woody').length,
                citrus: this.products.filter(p => p.scent === 'citrus').length,
                oriental: this.products.filter(p => p.scent === 'oriental').length,
                fresh: this.products.filter(p => p.scent === 'fresh').length
            },
            priceRange: {
                min: Math.min(...this.products.map(p => p.price)),
                max: Math.max(...this.products.map(p => p.price)),
                avg: this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length
            }
        };
    }
}

// Create global product manager instance
window.productManager = new ProductManager();

// Utility functions for product display
const productUtils = {
    // Create product card HTML
    createProductCard: function(product) {
        const outOfStock = !product.inStock;
        const priceDisplay = utils.formatPrice(product.price);
        
        return `
            <div class="product__card ${outOfStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
                <div class="product__image-container">
                    <img src="${product.image}" alt="${product.name}" class="product__image" loading="lazy">
                    ${outOfStock ? '<div class="product__badge">Out of Stock</div>' : ''}
                    <div class="product__quick-view">Quick View</div>
                </div>
                <div class="product__info">
                    <div class="product__category">${product.category}</div>
                    <h3 class="product__name">${utils.sanitizeHTML(product.name)}</h3>
                    <p class="product__description">${utils.sanitizeHTML(product.description)}</p>
                    <div class="product__price">${priceDisplay}</div>
                    <div class="product__actions">
                        <button class="product__add-to-cart" ${outOfStock ? 'disabled' : ''} data-product-id="${product.id}">
                            ${outOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button class="product__wishlist" data-product-id="${product.id}" title="Add to Wishlist">
                            ♡
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Create product detail HTML
    createProductDetail: function(product) {
        const priceDisplay = utils.formatPrice(product.price);
        const stars = this.createStarRating(product.rating);
        
        return `
            <div class="product__images">
                <div class="product__main-image">
                    <img src="${product.images[0]}" alt="${product.name}" class="product__image" id="main-product-image">
                    <div class="product__zoom-overlay">Click to zoom</div>
                </div>
                <div class="product__thumbnails">
                    ${product.images.map((img, index) => `
                        <div class="product__thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                            <img src="${img}" alt="${product.name}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="product__info">
                <div class="product__category">${product.category}</div>
                <h1 class="product__title">${utils.sanitizeHTML(product.name)}</h1>
                <div class="product__rating">
                    <div class="product__stars">${stars}</div>
                    <span class="product__rating-text">${product.rating} (${product.reviewCount} reviews)</span>
                </div>
                <div class="product__price">${priceDisplay}</div>
                <p class="product__description">${utils.sanitizeHTML(product.description)}</p>
                
                <div class="product__details">
                    <div class="product__detail-item">
                        <span class="product__detail-label">Volume:</span>
                        <span class="product__detail-value">${product.volume}</span>
                    </div>
                    <div class="product__detail-item">
                        <span class="product__detail-label">Brand:</span>
                        <span class="product__detail-value">${product.brand}</span>
                    </div>
                    <div class="product__detail-item">
                        <span class="product__detail-label">Scent Family:</span>
                        <span class="product__detail-value">${product.scent.charAt(0).toUpperCase() + product.scent.slice(1)}</span>
                    </div>
                    <div class="product__detail-item">
                        <span class="product__detail-label">Availability:</span>
                        <span class="product__detail-value">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                </div>

                <div class="product__notes">
                    <h4>Fragrance Notes</h4>
                    <div class="product__note-category">
                        <h5>Top Notes</h5>
                        <p class="product__note-list">${product.notes.top.join(', ')}</p>
                    </div>
                    <div class="product__note-category">
                        <h5>Middle Notes</h5>
                        <p class="product__note-list">${product.notes.middle.join(', ')}</p>
                    </div>
                    <div class="product__note-category">
                        <h5>Base Notes</h5>
                        <p class="product__note-list">${product.notes.base.join(', ')}</p>
                    </div>
                </div>

                <div class="product__actions">
                    <button class="product__add-to-cart" ${!product.inStock ? 'disabled' : ''} data-product-id="${product.id}">
                        ${!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button class="product__wishlist" data-product-id="${product.id}" title="Add to Wishlist">
                        ♡
                    </button>
                </div>
            </div>
        `;
    },

    // Create star rating HTML
    createStarRating: function(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star filled">★</span>';
        }

        if (hasHalfStar) {
            stars += '<span class="star half">★</span>';
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star">★</span>';
        }

        return stars;
    }
};

// Export product utilities
window.productUtils = productUtils;