document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize password strength meter
    initializePasswordStrengthMeter();
    
    // Initialize location services
    initializeLocationServices();
    
    // Toggle password visibility
    initializePasswordToggles();
    
    // Update cart count
    updateCartCount();
});

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('register-form');
    if (!form) return;
    
    // Real-time validation on input
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error');
    
    // Required field validation
    if (field.required && !value) {
        showError(field, 'This field is required', errorElement);
        return false;
    }
    
    // Field-specific validation
    switch(fieldName) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(field, 'Please enter a valid email address', errorElement);
                return false;
            }
            break;
            
        case 'password':
            if (value.length < 8) {
                showError(field, 'Password must be at least 8 characters', errorElement);
                return false;
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (value !== password) {
                showError(field, 'Passwords do not match', errorElement);
                return false;
            }
            break;
            
        case 'phone':
            if (!isValidPhoneNumber(value)) {
                showError(field, 'Please enter a valid phone number', errorElement);
                return false;
            }
            break;
            
        case 'zip':
            if (!isValidZipCode(value)) {
                showError(field, 'Please enter a valid ZIP/Postal code', errorElement);
                return false;
            }
            break;
    }
    
    return true;
}

// Show error message
function showError(field, message, errorElement) {
    if (!errorElement) return;
    
    field.classList.add('error');
    errorElement.textContent = message;
    
    // Scroll to the error
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Clear error message
function clearError(e) {
    const field = e.target;
    const errorId = `${field.name}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    field.classList.remove('error');
}

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Validate phone number format
function isValidPhoneNumber(phone) {
    const re = /^\+?[\d\s-()]{10,}$/;
    return re.test(phone);
}

// Validate ZIP/Postal code format
function isValidZipCode(zip) {
    const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return re.test(zip);
}

// Format phone number as (123) 456-7890
function formatPhoneNumber(e) {
    let number = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (number.length > 0) {
        formatted = '(' + number.substring(0, 3);
    }
    if (number.length > 3) {
        formatted += ') ' + number.substring(3, 6);
    }
    if (number.length > 6) {
        formatted += '-' + number.substring(6, 10);
    }
    
    e.target.value = formatted;
}

// Initialize password strength meter
function initializePasswordStrengthMeter() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthText = document.getElementById('strength-text');
        const strengthMeter = document.querySelector('.password-strength');
        const segments = document.querySelectorAll('.strength-segment');
        
        if (!password) {
            strengthText.textContent = 'Password strength';
            strengthMeter.className = 'password-strength';
            segments.forEach(seg => seg.style.width = '0%');
            return;
        }
        
        // Reset styles
        strengthMeter.className = 'password-strength';
        segments.forEach(seg => seg.style.backgroundColor = '#e0e0e0');
        
        // Calculate strength
        let strength = 0;
        let feedback = '';
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 1;
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Contains number
        if (/[0-9]/.test(password)) strength += 1;
        
        // Contains special character
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update UI based on strength
        let strengthClass = '';
        
        if (strength <= 1) {
            feedback = 'Very Weak';
            strengthClass = 'password-very-weak';
        } else if (strength <= 2) {
            feedback = 'Weak';
            strengthClass = 'password-weak';
        } else if (strength <= 3) {
            feedback = 'Moderate';
            strengthClass = 'password-moderate';
        } else if (strength <= 4) {
            feedback = 'Strong';
            strengthClass = 'password-strong';
        } else {
            feedback = 'Very Strong';
            strengthClass = 'password-very-strong';
        }
        
        // Update the strength meter
        strengthMeter.classList.add(strengthClass);
        strengthText.textContent = `Password strength: ${feedback}`;
        
        // Update the visual indicator
        const activeSegments = Math.ceil((strength / 5) * 4);
        segments.forEach((seg, index) => {
            seg.style.width = index < activeSegments ? '100%' : '0%';
        });
    });
}

// Toggle password visibility
function initializePasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle eye icon
            this.textContent = type === 'password' ? '👁️' : '👁️';
            this.setAttribute('aria-label', 
                type === 'password' ? 'Show password' : 'Hide password');
        });
    });
}

// Initialize location services
function initializeLocationServices() {
    const locationCheckbox = document.getElementById('allow-location');
    const locationDetails = document.getElementById('location-details');
    const refreshButton = document.getElementById('refresh-location');
    
    if (!locationCheckbox || !locationDetails) return;
    
    // Toggle location details based on checkbox
    locationCheckbox.addEventListener('change', function() {
        if (this.checked) {
            locationDetails.style.display = 'block';
            getLocation();
        } else {
            locationDetails.style.display = 'none';
        }
    });
    
    // Refresh location
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            getLocation();
        });
    }
}

// Get user's current location
function getLocation() {
    const locationText = document.getElementById('location-text');
    
    if (!navigator.geolocation) {
        locationText.textContent = 'Geolocation is not supported by your browser';
        return;
    }
    
    locationText.textContent = 'Detecting your location...';
    
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position) {
            const latitude = position.coords.latitude.toFixed(6);
            const longitude = position.coords.longitude.toFixed(6);
            
            // Use a geocoding service to get address from coordinates
            // Note: In a real app, you would use a proper geocoding service
            locationText.innerHTML = `
                <strong>Approximate Location:</strong><br>
                Latitude: ${latitude}, Longitude: ${longitude}<br>
                <small>(Note: This is a demo. In a real app, we would show the full address.)</small>
            `;
            
            // Store location in a hidden field or variable for form submission
            const locationData = {
                latitude: latitude,
                longitude: longitude,
                accuracy: position.coords.accuracy
            };
            
            // You can store this in a hidden field or use it as needed
            console.log('Location data:', locationData);
        },
        // Error callback
        function(error) {
            let errorMessage = 'Unable to retrieve your location';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access was denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'The request to get location timed out';
                    break;
            }
            
            locationText.textContent = errorMessage;
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    let isValid = true;
    
    // Validate all fields
    form.querySelectorAll('input[required], select[required]').forEach(field => {
        const event = new Event('blur');
        field.dispatchEvent(event);
        
        if (field.classList.contains('error')) {
            isValid = false;
        }
    });
    
    // Check terms and conditions
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('terms-error');
    
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'You must accept the terms and conditions', termsError);
        isValid = false;
    }
    
    // Check age verification
    const ageCheckbox = document.getElementById('age-verification');
    const ageError = document.getElementById('age-error');
    
    if (!ageCheckbox.checked) {
        showError(ageCheckbox, 'You must be at least 18 years old to register', ageError);
        isValid = false;
    }
    
    // If form is valid, submit it
    if (isValid) {
        // In a real app, you would send this data to your server
        const formData = new FormData(form);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        console.log('Form data:', formObject);
        
        // Simulate successful registration
        const userData = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            firstName: formObject.firstName,
            lastName: formObject.lastName,
            email: formObject.email,
            phone: formObject.phone,
            address: {
                street: formObject.address,
                city: formObject.city,
                state: formObject.state,
                zip: formObject.zip,
                country: formObject.country
            },
            preferences: {
                emailOffers: formObject.emailOffers === 'on',
                smsOffers: formObject.smsOffers === 'on'
            }
        };
        
        // Save user data and set as authenticated
        if (window.Auth) {
            window.Auth.setCurrentUser(userData);
        } else {
            // Fallback to localStorage if Auth is not available
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');
        }
        
        // Show success message and handle redirect
        showSuccessMessage();
    }
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('register-form');
    if (!form) return;
    
    // Check if there's a redirect URL in localStorage
    const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'shop.html';
    const email = document.getElementById('email').value;
    
    // Create success message
    const successHTML = `
        <div class="form__success">
            <div class="form__success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for creating an account with Luxe Parfum.</p>
            <p>We've sent a confirmation email to <strong>${email}</strong>.</p>
            <div class="form__success-actions">
                <a href="${redirectUrl}" class="btn btn--primary">Continue Shopping</a>
                <a href="account.html" class="btn btn--outline">Go to My Account</a>
            </div>
        </div>
    `;
    
    // Replace form with success message
    form.innerHTML = successHTML;
    
    // Remove the redirect URL from storage
    localStorage.removeItem('redirectAfterLogin');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-redirect after 5 seconds
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 5000);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    // In a real app, you would get this from your cart manager
    const count = localStorage.getItem('cartCount') || 0;
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}
