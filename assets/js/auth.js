// Authentication utility
const Auth = {
    // Check if user is logged in
    isAuthenticated: function() {
        return localStorage.getItem('isAuthenticated') === 'true';
    },
    
    // Set authentication status
    setAuthenticated: function(status) {
        localStorage.setItem('isAuthenticated', status);
    },
    
    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    
    // Set current user
    setCurrentUser: function(user) {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.setAuthenticated(true);
        } else {
            localStorage.removeItem('currentUser');
            this.setAuthenticated(false);
        }
    },
    
    // Logout
    logout: function() {
        this.setAuthenticated(false);
        localStorage.removeItem('currentUser');
    },
    
    // Check if user can add to cart
    canAddToCart: function() {
        if (!this.isAuthenticated()) {
            // Show login/register modal or redirect
            if (window.location.pathname !== '/register.html') {
                window.location.href = 'register.html';
            }
            return false;
        }
        return true;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
