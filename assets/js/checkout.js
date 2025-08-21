// Checkout page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
});

// Initialize checkout functionality
function initializeCheckout() {
    displayOrderSummary();
    initializeFormValidation();
    initializePaymentMethods();
    initializeFormSubmission();
    initializeInputFormatting();
    initializeClearCartButton();
}

// Display order summary
function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const cart = cartManager.getCart();
    
    if (!orderSummary) return;
    
    if (cart.length === 0) {
        orderSummary.innerHTML = `
            <div class="summary__empty">
                <div class="summary__empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some beautiful fragrances to your cart first</p>
                <a href="shop.html" class="btn btn--primary">Continue Shopping</a>
            </div>
        `;
        
        // Disable checkout form
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.style.opacity = '0.5';
            checkoutForm.style.pointerEvents = 'none';
        }
        
        return;
    }
    
    // Display cart items
    orderSummary.innerHTML = cart.map(item => `
        <div class="summary__item">
            <img src="${item.image}" alt="${item.name}" class="summary__item-image">
            <div class="summary__item-info">
                <div class="summary__item-name">${utils.sanitizeHTML(item.name)}</div>
                <div class="summary__item-details">Qty: ${item.quantity} | ${item.volume}</div>
                <div class="summary__item-price">${utils.formatPrice(item.price * item.quantity)}</div>
            </div>
        </div>
    `).join('');
    
    // Update totals
    updateOrderTotals();
}

// Update order totals
function updateOrderTotals() {
    const cart = cartManager.getCart();
    const subtotal = cartManager.getTotalPrice();
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Update total displays
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = utils.formatPrice(subtotal);
    if (shippingEl) {
        shippingEl.textContent = shipping === 0 ? 'FREE' : utils.formatPrice(shipping);
    }
    if (taxEl) taxEl.textContent = utils.formatPrice(tax);
    if (totalEl) totalEl.textContent = utils.formatPrice(total);
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Real-time validation on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    field.classList.remove('error', 'valid');
    const errorEl = document.getElementById(`${field.id}-error`);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (field.name === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // ZIP code validation
    else if (field.name === 'zip' && value) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid ZIP code';
        }
    }
    
    // Card number validation
    else if (field.name === 'cardNumber' && value) {
        const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        if (!cardRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid card number';
        }
    }
    
    // Expiry date validation
    else if (field.name === 'expiry' && value) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid expiry date (MM/YY)';
        } else {
            // Check if date is in the future
            const [month, year] = value.split('/');
            const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const currentDate = new Date();
            currentDate.setDate(1); // Set to first day of current month
            
            if (expiryDate < currentDate) {
                isValid = false;
                errorMessage = 'Card has expired';
            }
        }
    }
    
    // CVV validation
    else if (field.name === 'cvv' && value) {
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid CVV';
        }
    }
    
    // Apply validation styles
    if (isValid) {
        field.classList.add('valid');
    } else {
        field.classList.add('error');
    }
    
    // Show/hide error message
    if (errorEl) {
        errorEl.textContent = errorMessage;
    }
    
    return isValid;
}

// Initialize payment methods
function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('card-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit') {
                if (cardDetails) cardDetails.style.display = 'block';
            } else {
                if (cardDetails) cardDetails.style.display = 'none';
            }
        });
    });
}

// Initialize input formatting
function initializeInputFormatting() {
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    
    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            this.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    // CVV number only
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/gi, '');
        });
    }
}

// Initialize form submission
function initializeFormSubmission() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        // Special validation for payment method
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedPaymentMethod && selectedPaymentMethod.value === 'credit') {
            const cardInputs = form.querySelectorAll('#card-details input');
            cardInputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
        }
        
        if (isFormValid) {
            processCheckout();
        } else {
            showCheckoutError('Please fix the errors above and try again.');
        }
    });
}

// Process checkout
function processCheckout() {
    const form = document.getElementById('checkout-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        utils.showLoading(submitBtn, 'Processing...');
        
        // Simulate processing time
        setTimeout(() => {
            // Get form data
            const formData = new FormData(form);
            const orderData = {
                customer: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone')
                },
                shipping: {
                    address: formData.get('address'),
                    city: formData.get('city'),
                    state: formData.get('state'),
                    zip: formData.get('zip')
                },
                payment: {
                    method: formData.get('paymentMethod'),
                    ...(formData.get('paymentMethod') === 'credit' && {
                        cardNumber: formData.get('cardNumber'),
                        expiry: formData.get('expiry'),
                        cvv: formData.get('cvv'),
                        cardholderName: formData.get('cardholderName')
                    })
                },
                items: cartManager.getCart(),
                totals: {
                    subtotal: cartManager.getTotalPrice(),
                    shipping: cartManager.getTotalPrice() > 100 ? 0 : 9.99,
                    tax: cartManager.getTotalPrice() * 0.08,
                    total: cartManager.getTotalPrice() + (cartManager.getTotalPrice() > 100 ? 0 : 9.99) + (cartManager.getTotalPrice() * 0.08)
                }
            };
            
            // Simulate successful checkout
            completeCheckout(orderData);
            utils.hideLoading(submitBtn, originalText);
            
        }, 2000);
    }
}

// Complete checkout process
function completeCheckout(orderData) {
    // Clear the cart
    cartManager.clearCart();
    
    // Show success message
    showCheckoutSuccess();
    
    // In a real application, you would:
    // 1. Send order data to backend
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Redirect to order confirmation page
    
    console.log('Order completed:', orderData);
}

// Show checkout success
function showCheckoutSuccess() {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'checkout__success show';
    successModal.innerHTML = `
        <div class="success__content">
            <div class="success__icon">✓</div>
            <h2 class="success__title">Order Placed Successfully!</h2>
            <p class="success__message">
                Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <div class="success__actions">
                <a href="shop.html" class="btn btn--primary">Continue Shopping</a>
                <a href="index.html" class="btn btn--secondary">Back to Home</a>
            </div>
        </div>
    `;
    
    // Add styles for success actions
    const style = document.createElement('style');
    style.textContent = `
        .success__actions {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .success__actions .btn {
            min-width: 140px;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successModal);
    
    // Auto-redirect after 10 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 10000);
}

// Show checkout error
function showCheckoutError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'notification notification--error';
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">✕</span>
            <span class="notification__message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #DC2626;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        max-width: 400px;
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
    }, 5000);
}

// Initialize clear cart button
function initializeClearCartButton() {
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (!clearCartBtn) return;

    clearCartBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
            cartManager.clearCart();
            updateCartCount();
            displayOrderSummary();
            
            // Show success message
            if (typeof showNotification === 'function') {
                showNotification('Your cart has been cleared', 'success');
            } else {
                alert('Your cart has been cleared');
            }
        }
    });
}

// Update cart count in real-time
setInterval(() => {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        const totalItems = cartManager.getTotalItems();
        cartCountEl.textContent = totalItems;
        cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}, 1000);

// Handle page visibility change (update cart when user returns)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        displayOrderSummary();
    }
});