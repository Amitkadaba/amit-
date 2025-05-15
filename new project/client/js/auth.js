// Authentication related functionality
const auth = {
  // Elements
  elements: {
    authContainer: document.getElementById('auth-container'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    dashboardContainer: document.getElementById('dashboard-container'),
    userLoginForm: document.getElementById('user-login-form'),
    userRegisterForm: document.getElementById('user-register-form'),
    switchToRegister: document.getElementById('switch-to-register'),
    switchToLogin: document.getElementById('switch-to-login'),
    authLinks: document.getElementById('auth-links'),
    userLinks: document.getElementById('user-links'),
    logoutLink: document.getElementById('logout-link')
  },
  
  // Initialize auth functionality
  init() {
    // Event listeners for form switching
    this.elements.switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      this.showRegisterForm();
    });
    
    this.elements.switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      this.showLoginForm();
    });
    
    // Event listeners for form submission
    this.elements.userLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });
    
    this.elements.userRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleRegister();
    });
    
    // Event listener for logout
    this.elements.logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogout();
    });
    
    // Check if user is already logged in
    this.checkAuth();
  },
  
  // Show login form
  showLoginForm() {
    this.elements.registerForm.style.display = 'none';
    this.elements.loginForm.style.display = 'block';
  },
  
  // Show register form
  showRegisterForm() {
    this.elements.loginForm.style.display = 'none';
    this.elements.registerForm.style.display = 'block';
  },
  
  // Handle login form submission
  async handleLogin() {
    try {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (!email || !password) {
        notifications.show('Please fill in all fields', 'error');
        return;
      }
      
      const response = await api.auth.login({ email, password });
      
      // Save token to localStorage
      api.setToken(response.token);
      
      // Show success message
      notifications.show('Login successful', 'success');
      
      // Reset form
      this.elements.userLoginForm.reset();
      
      // Update UI to show logged in state
      this.updateUIAfterLogin();
      
      // Load dashboard data
      dashboard.init();
    } catch (error) {
      notifications.show(error.message || 'Login failed', 'error');
    }
  },
  
  // Handle register form submission
  async handleRegister() {
    try {
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      
      if (!username || !email || !password || !confirmPassword) {
        notifications.show('Please fill in all fields', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        notifications.show('Passwords do not match', 'error');
        return;
      }
      
      if (password.length < 6) {
        notifications.show('Password must be at least 6 characters', 'error');
        return;
      }
      
      const response = await api.auth.register({ username, email, password });
      
      // Save token to localStorage
      api.setToken(response.token);
      
      // Show success message
      notifications.show('Registration successful', 'success');
      
      // Reset form
      this.elements.userRegisterForm.reset();
      
      // Update UI to show logged in state
      this.updateUIAfterLogin();
      
      // Load dashboard data
      dashboard.init();
    } catch (error) {
      notifications.show(error.message || 'Registration failed', 'error');
    }
  },
  
  // Handle logout
  handleLogout() {
    // Clear token
    api.removeToken();
    
    // Update UI
    this.updateUIAfterLogout();
    
    // Show message
    notifications.show('Logged out successfully', 'info');
  },
  
  // Check if user is authenticated
  checkAuth() {
    const token = api.getToken();
    
    if (token) {
      // If token exists, validate it by getting user profile
      api.auth.getProfile()
        .then(() => {
          this.updateUIAfterLogin();
          dashboard.init();
        })
        .catch(() => {
          // If token is invalid, clear it
          api.removeToken();
          this.updateUIAfterLogout();
        });
    } else {
      this.updateUIAfterLogout();
    }
  },
  
  // Update UI after successful login
  updateUIAfterLogin() {
    // Hide auth container, show dashboard
    this.elements.authContainer.style.display = 'none';
    this.elements.dashboardContainer.style.display = 'block';
    
    // Update navigation
    this.elements.authLinks.style.display = 'none';
    this.elements.userLinks.style.display = 'flex';
  },
  
  // Update UI after logout
  updateUIAfterLogout() {
    // Show auth container, hide dashboard
    this.elements.authContainer.style.display = 'block';
    this.elements.dashboardContainer.style.display = 'none';
    
    // Show login form
    this.showLoginForm();
    
    // Update navigation
    this.elements.authLinks.style.display = 'flex';
    this.elements.userLinks.style.display = 'none';
  }
}; 