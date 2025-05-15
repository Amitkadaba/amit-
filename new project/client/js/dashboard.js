// Dashboard functionality
const dashboard = {
  // Keep track of current data
  data: {
    actions: [],
    stats: null,
    selectedPeriod: 'week'
  },
  
  // Initialize dashboard
  init() {
    // Get references to elements
    this.elements = {
      periodSelector: document.getElementById('period-selector'),
      logsContainer: document.getElementById('logs-container'),
      actionForm: document.getElementById('log-action-form')
    };
    
    // Add event listeners
    this.elements.periodSelector.addEventListener('change', () => {
      this.data.selectedPeriod = this.elements.periodSelector.value;
      this.loadStats();
    });
    
    this.elements.actionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleActionSubmit();
    });
    
    // Load initial data
    this.loadActions();
    this.loadStats();
  },
  
  // Load user actions
  async loadActions() {
    try {
      const actions = await api.actions.getAll();
      this.data.actions = actions;
      this.renderLogs();
    } catch (error) {
      notifications.show('Failed to load actions: ' + error.message, 'error');
    }
  },
  
  // Load stats for the selected period
  async loadStats() {
    try {
      const stats = await api.actions.getStats(this.data.selectedPeriod);
      this.data.stats = stats;
      charts.renderCharts(stats);
      this.generateTips(stats);
    } catch (error) {
      notifications.show('Failed to load statistics: ' + error.message, 'error');
    }
  },
  
  // Render user logs
  renderLogs() {
    const container = this.elements.logsContainer;
    container.innerHTML = '';
    
    if (this.data.actions.length === 0) {
      container.innerHTML = '<p>No sustainable actions logged yet. Start tracking your impact today!</p>';
      return;
    }
    
    // Take just the most recent 5 actions
    const recentActions = this.data.actions.slice(0, 5);
    
    recentActions.forEach(action => {
      const logItem = document.createElement('div');
      logItem.classList.add('log-item');
      
      // Format date
      const date = new Date(action.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      // Create log content
      logItem.innerHTML = `
        <div class="log-date">${formattedDate}</div>
        <div class="log-details">
          ${action.energySaved ? `<div class="log-detail"><i class="fas fa-bolt"></i> ${action.energySaved} kWh</div>` : ''}
          ${action.waterSaved ? `<div class="log-detail"><i class="fas fa-tint"></i> ${action.waterSaved} liters</div>` : ''}
          ${action.recycledItems?.plastic ? `<div class="log-detail"><i class="fas fa-recycle"></i> ${action.recycledItems.plastic} plastic</div>` : ''}
          ${action.recycledItems?.paper ? `<div class="log-detail"><i class="fas fa-newspaper"></i> ${action.recycledItems.paper} paper</div>` : ''}
          ${action.recycledItems?.metal ? `<div class="log-detail"><i class="fas fa-trash-alt"></i> ${action.recycledItems.metal} metal</div>` : ''}
          ${action.transportation?.biking ? `<div class="log-detail"><i class="fas fa-bicycle"></i> Biking</div>` : ''}
          ${action.transportation?.publicTransport ? `<div class="log-detail"><i class="fas fa-bus"></i> Public Transport</div>` : ''}
          ${action.transportation?.carpooling ? `<div class="log-detail"><i class="fas fa-car-side"></i> Carpooling</div>` : ''}
          ${action.transportation?.walkingDistance ? `<div class="log-detail"><i class="fas fa-walking"></i> ${action.transportation.walkingDistance} km</div>` : ''}
        </div>
        ${action.notes ? `<div class="log-notes">${action.notes}</div>` : ''}
        <div class="log-actions">
          <button class="btn btn-sm delete-log" data-id="${action._id}">Delete</button>
        </div>
      `;
      
      // Add event listener for delete button
      const deleteBtn = logItem.querySelector('.delete-log');
      deleteBtn.addEventListener('click', () => this.handleDeleteAction(action._id));
      
      container.appendChild(logItem);
    });
  },
  
  // Generate tips based on user data
  generateTips(stats) {
    const tipsContainer = document.getElementById('tips-content');
    tipsContainer.innerHTML = '';
    
    // Generate dynamic tips based on user's data
    const tipsList = [];
    
    // Check for low energy saving
    if (stats.totalEnergySaved < 10) {
      tipsList.push("Try unplugging devices when not in use to reduce standby power consumption.");
      tipsList.push("Switch to LED bulbs to significantly reduce your energy consumption.");
    }
    
    // Check for low water saving
    if (stats.totalWaterSaved < 50) {
      tipsList.push("Take shorter showers to save water. Even reducing by 2 minutes can save 5 gallons.");
      tipsList.push("Fix leaky faucets - a dripping tap can waste more than 3,000 gallons per year.");
    }
    
    // Check recycling habits
    const totalRecycled = stats.totalPlasticRecycled + stats.totalPaperRecycled + stats.totalMetalRecycled;
    if (totalRecycled < 10) {
      tipsList.push("Set up separate bins for different recyclables to make sorting easier.");
      tipsList.push("Remember to rinse containers before recycling them to improve quality.");
    }
    
    // Check transportation habits
    if (stats.bikingDays < 3 && stats.publicTransportDays < 3) {
      tipsList.push("Try biking or using public transport at least 3 times a week to reduce emissions.");
      tipsList.push("Consider carpooling with colleagues for your daily commute.");
    }
    
    // Add general tips if user is just starting
    if (stats.totalLogs < 5) {
      tipsList.push("Track your actions regularly to build sustainable habits over time.");
      tipsList.push("Set weekly goals for energy and water conservation.");
    }
    
    // Display tips
    if (tipsList.length === 0) {
      tipsList.push("You're doing great! Keep up your sustainable lifestyle.");
    }
    
    // Randomly select up to 3 tips
    const selectedTips = tipsList.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    selectedTips.forEach(tip => {
      const tipItem = document.createElement('div');
      tipItem.classList.add('tip-item');
      tipItem.innerHTML = `
        <div class="tip-content">
          <i class="fas fa-lightbulb"></i> ${tip}
        </div>
      `;
      tipsContainer.appendChild(tipItem);
    });
  },
  
  // Handle action form submission
  async handleActionSubmit() {
    try {
      const actionData = {
        energySaved: parseFloat(document.getElementById('energy-saved').value) || 0,
        waterSaved: parseFloat(document.getElementById('water-saved').value) || 0,
        recycledItems: {
          plastic: parseInt(document.getElementById('plastic-recycled').value) || 0,
          paper: parseInt(document.getElementById('paper-recycled').value) || 0,
          metal: parseInt(document.getElementById('metal-recycled').value) || 0
        },
        transportation: {
          biking: document.getElementById('biking').checked,
          publicTransport: document.getElementById('public-transport').checked,
          carpooling: document.getElementById('carpooling').checked,
          walkingDistance: parseFloat(document.getElementById('walking-distance').value) || 0
        },
        notes: document.getElementById('action-notes').value
      };
      
      // Submit to API
      await api.actions.create(actionData);
      
      // Show success message
      notifications.show('Sustainable action logged successfully!', 'success');
      
      // Reset form
      this.elements.actionForm.reset();
      
      // Reload data
      this.loadActions();
      this.loadStats();
      
    } catch (error) {
      notifications.show('Failed to log action: ' + error.message, 'error');
    }
  },
  
  // Handle action deletion
  async handleDeleteAction(id) {
    if (!confirm('Are you sure you want to delete this action?')) {
      return;
    }
    
    try {
      await api.actions.delete(id);
      notifications.show('Action deleted successfully', 'success');
      
      // Reload data
      this.loadActions();
      this.loadStats();
    } catch (error) {
      notifications.show('Failed to delete action: ' + error.message, 'error');
    }
  }
}; 