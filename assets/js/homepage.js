// Homepage specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeAnimations();
});

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation rules
            const validationRules = {
                'Your Name': ['required', 'minLength:2'],
                'Your Email': ['required', 'email'],
                'Your Message': ['required', 'minLength:10']
            };
            
            // Get form data
            const formData = new FormData(contactForm);
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            // Simple validation
            inputs.forEach(input => {
                const value = input.value.trim();
                
                // Clear previous errors
                input.classList.remove('error');
                
                // Validate required fields
                if (input.hasAttribute('required') && !value) {
                    input.classList.add('error');
                    isValid = false;
                    return;
                }
                
                // Validate email
                if (input.type === 'email' && value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        input.classList.add('error');
                        isValid = false;
                        return;
                    }
                }
                
                // Validate message length
                if (input.tagName.toLowerCase() === 'textarea' && value && value.length < 10) {
                    input.classList.add('error');
                    isValid = false;
                    return;
                }
            });
            
            if (isValid) {
                // Show success message
                showContactSuccess();
                contactForm.reset();
                
                // Remove error classes
                inputs.forEach(input => {
                    input.classList.remove('error');
                });
            } else {
                // Show error message
                showContactError('Please fill in all required fields correctly.');
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateContactField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateContactField(this);
                }
            });
        });
    }
}

// Validate individual contact form field
function validateContactField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Clear error state
    field.classList.remove('error');
    
    // Validate required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Validate email
    if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
        }
    }
    
    // Validate message length
    if (field.tagName.toLowerCase() === 'textarea' && value && value.length < 10) {
        isValid = false;
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

// Show contact form success message
function showContactSuccess() {
    showNotification('Thank you! Your message has been sent successfully.', 'success');
}

// Show contact form error message
function showContactError(message) {
    showNotification(message, 'error');
}

// Generic notification function
function showNotification(message, type = 'info') {
    // Create notification element
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
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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
        width: 24px;
        height: 24px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.featured__card, .about__feature, .contact__item'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Hero section parallax effect (subtle)
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero__img');
    
    if (hero && heroImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroImg.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initializeParallax);

// Add hover effects to featured cards
document.addEventListener('DOMContentLoaded', function() {
    const featuredCards = document.querySelectorAll('.featured__card');
    
    featuredCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
});

// Smooth reveal animation for sections
function initializeSectionReveal() {
    const sections = document.querySelectorAll('.featured, .about, .contact');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section reveal
document.addEventListener('DOMContentLoaded', initializeSectionReveal);