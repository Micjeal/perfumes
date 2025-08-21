// Main JavaScript file for common functionality across all pages

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollHeader();
    updateCartCount();
    initializeNewsletter();
    initializeProductButtons();
    initializeGiftCards();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Scroll header functionality
function initializeScrollHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scroll');
            } else {
                header.classList.remove('scroll');
            }
        });
    }
}

// Cart management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartDisplay();
    }

    loadCart() {
        const savedCart = localStorage.getItem('luxeParfumCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('luxeParfumCart', JSON.stringify(this.cart));
        this.updateCartDisplay();
    }

    addToCart(product) {
        // Check if user is authenticated
        if (!window.Auth || !window.Auth.isAuthenticated()) {
            // Store the intended action
            const redirectUrl = window.location.pathname === '/register.html' ? 
                window.location.href : 
                `${window.location.pathname}${window.location.search}`;
            
            // Store the current URL to redirect back after login
            localStorage.setItem('redirectAfterLogin', redirectUrl);
            
            // Show a message and redirect to register page
            if (window.showNotification) {
                window.showNotification('Please register or log in to add items to cart', 'info');
            }
            
            // Small delay to show notification before redirect
            setTimeout(() => {
                window.location.href = 'register.html';
            }, 1000);
            
            return false;
        }
        
        // If authenticated, proceed with adding to cart
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showAddToCartNotification(product.name);
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getCart() {
        return this.cart;
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    showAddToCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">${productName} added to cart</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;

        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        const notificationIcon = notification.querySelector('.notification-icon');
        notificationIcon.style.cssText = `
            width: 20px;
            height: 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Update cart count on page load
function updateCartCount() {
    cartManager.updateCartDisplay();
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', initializeSmoothScrolling);

// Newsletter Form
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real app, you would send this to your server
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
}

// Product Buttons
function initializeProductButtons() {
    // Add to cart buttons in bestsellers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.bestseller__card .btn--secondary')) {
            const card = e.target.closest('.bestseller__card');
            if (card) {
                const product = {
                    id: card.dataset.id || Date.now().toString(),
                    name: card.querySelector('h3').textContent,
                    price: parseFloat(card.querySelector('.bestseller__price').textContent.replace(/[^0-9.]/g, '')),
                    image: card.querySelector('img')?.src || '',
                    quantity: 1
                };
                cartManager.addToCart(product);
                showNotification(`${product.name} added to cart!`);
            }
        }
    });

    // Limited edition button
    const limitedEditionBtn = document.querySelector('.limited .btn--primary');
    if (limitedEditionBtn) {
        limitedEditionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Limited edition item added to cart!', 'success');
        });
    }
}

// Gift Cards
function initializeGiftCards() {
    const giftCardValues = document.querySelectorAll('.gift-cards__values .btn--outline');
    const purchaseBtn = document.querySelector('.gift-cards .btn--primary');
    let selectedAmount = 0;

    giftCardValues.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const amount = parseInt(this.textContent.replace(/[^0-9]/g, ''));
            selectedAmount = amount;
            
            // Update active state
            giftCardValues.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (purchaseBtn) {
                purchaseBtn.textContent = `Purchase $${amount} Gift Card`;
            }
        });
    });

    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', function(e) {
            if (selectedAmount > 0) {
                showNotification(`Gift card of $${selectedAmount} added to cart!`, 'success');
            } else {
                showNotification('Please select a gift card amount', 'error');
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add show class
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form validation utilities
class FormValidator {
    constructor() {
        this.rules = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, '')),
            minLength: (value, length) => value.length >= length,
            maxLength: (value, length) => value.length <= length,
            pattern: (value, pattern) => new RegExp(pattern).test(value)
        };
    }

    validateField(field, rules) {
        const value = field.value;
        const errors = [];

        for (const rule of rules) {
            const [ruleName, ruleValue] = rule.split(':');
            
            if (!this.rules[ruleName]) {
                continue;
            }

            const isValid = ruleValue ? 
                this.rules[ruleName](value, ruleValue) : 
                this.rules[ruleName](value);

            if (!isValid) {
                errors.push(this.getErrorMessage(ruleName, ruleValue));
            }
        }

        return errors;
    }

    getErrorMessage(rule, value) {
        const messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            minLength: `Must be at least ${value} characters long`,
            maxLength: `Must be no more than ${value} characters long`,
            pattern: 'Invalid format'
        };

        return messages[rule] || 'Invalid input';
    }

    showFieldError(field, errors) {
        const errorElement = document.getElementById(field.id + '-error');
        
        field.classList.remove('valid', 'error');
        
        if (errors.length > 0) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errors[0];
            }
        } else {
            field.classList.add('valid');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }

    validateForm(form, validationRules) {
        let isValid = true;
        const fields = Object.keys(validationRules);

        fields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const errors = this.validateField(field, validationRules[fieldName]);
                this.showFieldError(field, errors);
                
                if (errors.length > 0) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }
}

// Initialize form validator
const formValidator = new FormValidator();

// Utility functions
const utils = {
    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format price
    formatPrice: function(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },

    // Format card number
    formatCardNumber: function(value) {
        return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    },

    // Format expiry date
    formatExpiryDate: function(value) {
        return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    },

    // Sanitize HTML
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    // Show loading state
    showLoading: function(element, text = 'Loading...') {
        element.disabled = true;
        element.innerHTML = `<span class="loading"></span> ${text}`;
    },

    // Hide loading state
    hideLoading: function(element, originalText) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
};

// Export cart manager and utilities for use in other scripts
window.cartManager = cartManager;
window.formValidator = formValidator;
window.utils = utils;

// Security: Content Security Policy compliance
// Ensure all inline scripts are avoided and use event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Remove any potentially harmful attributes
    const elements = document.querySelectorAll('[onclick], [onload], [onerror]');
    elements.forEach(element => {
        element.removeAttribute('onclick');
        element.removeAttribute('onload');
        element.removeAttribute('onerror');
    });
});