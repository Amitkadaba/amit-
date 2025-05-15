// Notifications utility
const notifications = {
  show(message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    
    // Add content
    notification.innerHTML = `
      <div class="notification-message">${message}</div>
      <button class="notification-close">&times;</button>
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    // Add to container
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
};

// Mobile menu toggle
const toggleMenu = () => {
  const navContainer = document.getElementById('nav-container');
  navContainer.classList.toggle('show');
};

// Initialize the application
const initApp = () => {
  // Set up menu toggle for mobile
  document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
  
  // Initialize application modules
  auth.init();
  
  // Update copyright year
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('.footer p');
  footerText.textContent = footerText.textContent.replace('2023', currentYear);
  
  // Initialize weather map module when dashboard is shown
  const dashboardLink = document.getElementById('dashboard-link');
  if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      auth.elements.authContainer.style.display = 'none';
      auth.elements.dashboardContainer.style.display = 'block';
      
      // Initialize weather map if not already
      if (!weather.map) {
        weather.init();
      }
    });
  }
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', initApp); 