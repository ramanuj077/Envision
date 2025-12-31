
// Valid login credentials (hardcoded for demo purposes)
const VALID_CREDENTIALS = {
    username: 'admin',
    password: '1234'
};

// LocalStorage key for storing username
const STORAGE_KEY = 'loggedInUser';

/**
 * Store username in localStorage
 * @param {string} username - The username to store
 */
function storeUsername(username) {
    try {
        localStorage.setItem(STORAGE_KEY, username);
        console.log('✓ Username stored successfully');
    } catch (error) {
        console.error('Error storing username:', error);
    }
}

/**
 * Retrieve username from localStorage
 * @returns {string|null} - The stored username or null if not found
 */
function getStoredUsername() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error retrieving username:', error);
        return null;
    }
}

/**
 * Clear stored username from localStorage
 */
function clearStoredUsername() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✓ Username cleared successfully');
    } catch (error) {
        console.error('Error clearing username:', error);
    }
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is logged in, false otherwise
 */
function isAuthenticated() {
    return getStoredUsername() !== null;
}

/**
 * Redirect to a specific page
 * @param {string} page - The page to redirect to
 */
function redirectTo(page) {
    window.location.href = page;
}

// ========================================
// LOGIN PAGE FUNCTIONALITY
// ========================================

/**
 * Handle login form submission
 * @param {Event} event - The form submit event
 */
function handleLogin(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get form input values
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs are not empty
    if (!username || !password) {
        alert('⚠️ Please enter both username and password');
        return;
    }

    // Check credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        // Successful login
        storeUsername(username);

        // Show success feedback (optional smooth transition)
        console.log('✓ Login successful! Redirecting...');

        // Redirect to dashboard
        redirectTo('dashboard.html');
    } else {
        // Failed login
        alert('❌ Invalid credentials');

        // Clear password field for security
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * Initialize login page
 */
function initLoginPage() {
    // Check if user is already logged in
    if (isAuthenticated()) {
        console.log('User already logged in, redirecting to dashboard...');
        redirectTo('dashboard.html');
        return;
    }

    // Attach login form submit handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('✓ Login form initialized');
    }
}

// ========================================
// DASHBOARD PAGE FUNCTIONALITY
// ========================================

/**
 * Display welcome message with username
 */
function displayWelcomeMessage() {
    const username = getStoredUsername();
    const welcomeElement = document.getElementById('welcomeMessage');

    if (welcomeElement && username) {
        welcomeElement.textContent = `Welcome, ${username}!`;
        console.log(`✓ Welcome message displayed for ${username}`);
    }
}

/**
 * Handle logout functionality
 */
function handleLogout() {
    // Clear stored username
    clearStoredUsername();

    // Show logout confirmation (optional)
    console.log('✓ Logged out successfully');

    // Redirect to login page
    redirectTo('index.html');
}

/**
 * Initialize dashboard page
 */
function initDashboardPage() {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        console.log('User not authenticated, redirecting to login...');
        redirectTo('index.html');
        return;
    }

    // Display welcome message
    displayWelcomeMessage();

    // Attach logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        console.log('✓ Logout button initialized');
    }
}

// ========================================
// PROFILE PAGE FUNCTIONALITY
// ========================================

/**
 * Display username in profile page
 */
function displayProfileUsername() {
    const username = getStoredUsername();
    const profileUsernameElement = document.getElementById('profileUsername');

    if (profileUsernameElement && username) {
        profileUsernameElement.textContent = username;
        console.log(`✓ Profile username displayed: ${username}`);
    }
}

/**
 * Initialize profile page
 */
function initProfilePage() {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        console.log('User not authenticated, redirecting to login...');
        redirectTo('index.html');
        return;
    }

    // Display profile username
    displayProfileUsername();

    // Attach logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        console.log('✓ Logout button initialized');
    }
}

// ========================================
// PAGE INITIALIZATION
// ========================================

/**
 * Determine current page and initialize accordingly
 */
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    console.log(`Initializing page: ${currentPage}`);

    // Initialize based on current page
    switch (currentPage) {
        case 'index.html':
        case '':
            initLoginPage();
            break;
        case 'dashboard.html':
            initDashboardPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        default:
            console.log('Unknown page');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // DOM is already loaded
    initializePage();
}

// ========================================
// ADDITIONAL FEATURES (OPTIONAL)
// ========================================

/**
 * Add smooth page transitions (optional enhancement)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';

    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });
});

/**
 * Handle Enter key press on input fields (improved UX)
 */
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;

        // If focused on an input field in the login form
        if (activeElement && (activeElement.id === 'username' || activeElement.id === 'password')) {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    }
});
