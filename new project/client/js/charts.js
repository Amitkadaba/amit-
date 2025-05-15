// Charts functionality
const charts = {
  // Chart instances
  resourcesChart: null,
  recyclingChart: null,
  transportationChart: null,
  
  // Render all charts
  renderCharts(stats) {
    this.renderResourcesChart(stats);
    this.renderRecyclingChart(stats);
    this.renderTransportationChart(stats);
  },
  
  // Render resources (energy and water) chart
  renderResourcesChart(stats) {
    const ctx = document.getElementById('resources-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (this.resourcesChart) {
      this.resourcesChart.destroy();
    }
    
    const data = {
      labels: ['Energy (kWh)', 'Water (liters)'],
      datasets: [{
        label: 'Resource Saving',
        data: [
          stats.totalEnergySaved,
          stats.totalWaterSaved
        ],
        backgroundColor: [
          config.charts.backgroundColor[0],
          config.charts.backgroundColor[1]
        ],
        borderColor: [
          config.charts.borderColor[0],
          config.charts.borderColor[1]
        ],
        borderWidth: 1
      }]
    };
    
    this.resourcesChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Resource Saving'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                  if (context.label === 'Energy (kWh)') {
                    label += ' kWh';
                  } else if (context.label === 'Water (liters)') {
                    label += ' liters';
                  }
                }
                return label;
              }
            }
          }
        }
      }
    });
  },
  
  // Render recycling chart
  renderRecyclingChart(stats) {
    const ctx = document.getElementById('recycling-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (this.recyclingChart) {
      this.recyclingChart.destroy();
    }
    
    const data = {
      labels: ['Plastic', 'Paper', 'Metal'],
      datasets: [{
        label: 'Items Recycled',
        data: [
          stats.totalPlasticRecycled,
          stats.totalPaperRecycled,
          stats.totalMetalRecycled
        ],
        backgroundColor: [
          config.charts.backgroundColor[0],
          config.charts.backgroundColor[1],
          config.charts.backgroundColor[2]
        ],
        borderColor: [
          config.charts.borderColor[0],
          config.charts.borderColor[1],
          config.charts.borderColor[2]
        ],
        borderWidth: 1
      }]
    };
    
    this.recyclingChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Recycling Distribution'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} items (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  },
  
  // Render transportation chart
  renderTransportationChart(stats) {
    const ctx = document.getElementById('transportation-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (this.transportationChart) {
      this.transportationChart.destroy();
    }
    
    const data = {
      labels: ['Biking', 'Public Transport', 'Carpooling'],
      datasets: [{
        label: 'Days Used',
        data: [
          stats.bikingDays,
          stats.publicTransportDays,
          stats.carpoolingDays
        ],
        backgroundColor: [
          config.charts.backgroundColor[0],
          config.charts.backgroundColor[1],
          config.charts.backgroundColor[2]
        ],
        borderColor: [
          config.charts.borderColor[0],
          config.charts.borderColor[1],
          config.charts.borderColor[2]
        ],
        borderWidth: 1
      }]
    };
    
    this.transportationChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Sustainable Transportation Usage'
          }
        }
      }
    });
  }
}; 