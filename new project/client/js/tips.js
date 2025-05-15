// Tips module
const tips = {
  // Tips database
  database: [
    {
      category: 'energy',
      tips: [
        "Switch to LED light bulbs to save up to 80% of energy compared to traditional bulbs.",
        "Unplug electronic devices when not in use to prevent 'vampire energy' drainage.",
        "Use natural light during the day instead of artificial lighting.",
        "Wash clothes in cold water to save energy from water heating.",
        "Set your thermostat 2 degrees lower in winter and higher in summer to reduce energy consumption.",
        "Install a programmable thermostat to automatically reduce heating and cooling when you're away.",
        "Use a laptop instead of a desktop computer, as laptops use up to 80% less electricity.",
        "Air-dry clothes instead of using a dryer when possible."
      ]
    },
    {
      category: 'water',
      tips: [
        "Take shorter showers to save up to 150 gallons per month.",
        "Install low-flow shower heads and faucet aerators to reduce water usage.",
        "Fix leaky faucets immediately - one drop per second wastes 3,000 gallons per year.",
        "Turn off the tap while brushing your teeth to save up to 4 gallons per minute.",
        "Collect rainwater for watering plants and gardens.",
        "Run dishwashers and washing machines only when full.",
        "Water plants in the early morning or evening to reduce evaporation.",
        "Install a dual-flush toilet to save water with each flush."
      ]
    },
    {
      category: 'recycling',
      tips: [
        "Rinse containers before recycling to improve recyclability and prevent contamination.",
        "Learn your local recycling guidelines - not all plastics are recyclable everywhere.",
        "Use reusable shopping bags instead of disposable plastic bags.",
        "Compost food scraps and yard waste to reduce landfill waste.",
        "Buy products with minimal packaging or packaging made from recycled materials.",
        "Repurpose glass jars and containers instead of recycling them immediately.",
        "Recycle electronics through proper e-waste programs to prevent harmful materials from entering landfills.",
        "Set up clearly labeled recycling stations in your home to make sorting easier."
      ]
    },
    {
      category: 'transportation',
      tips: [
        "Combine multiple errands into one trip to save fuel and reduce emissions.",
        "Keep your tires properly inflated to improve fuel efficiency by up to 3%.",
        "Use public transportation at least once a week to reduce your carbon footprint.",
        "Try carpooling to work or school to share the environmental impact of commuting.",
        "Choose walking or biking for short trips under 2 miles.",
        "Remove excess weight from your car to improve fuel efficiency.",
        "Consider purchasing a hybrid or electric vehicle for your next car.",
        "Avoid excessive idling - turn off your engine if you'll be stopped for more than 30 seconds."
      ]
    },
    {
      category: 'general',
      tips: [
        "Set specific, measurable sustainability goals for yourself each month.",
        "Share your sustainable practices with friends and family to spread awareness.",
        "Support local businesses to reduce the carbon footprint of shipping goods.",
        "Choose products with environmental certifications like Energy Star, WaterSense, or USDA Organic.",
        "Repair items instead of replacing them whenever possible.",
        "Eat less meat, especially red meat, to reduce your environmental impact.",
        "Grow some of your own food, even if it's just herbs on a windowsill.",
        "Choose reusable alternatives to disposable products like water bottles, coffee cups, and food containers."
      ]
    }
  ],
  
  // Get random tips from a specific category
  getRandomTipsByCategory(category, count = 1) {
    const categoryTips = this.database.find(item => item.category === category)?.tips || [];
    
    if (categoryTips.length === 0) {
      return this.getRandomTips(count); // Fallback to random tips
    }
    
    // Shuffle and get the required number of tips
    return this.shuffleArray([...categoryTips]).slice(0, count);
  },
  
  // Get random tips from any category
  getRandomTips(count = 3) {
    // Flatten all tips into a single array
    const allTips = this.database.reduce((acc, category) => {
      return [...acc, ...category.tips];
    }, []);
    
    // Shuffle and get the required number of tips
    return this.shuffleArray([...allTips]).slice(0, count);
  },
  
  // Generate smart tips based on user stats
  getSmartTips(stats, count = 3) {
    const tipsList = [];
    
    // Check energy saving habits
    if (stats.totalEnergySaved < 10) {
      tipsList.push(...this.getRandomTipsByCategory('energy', 2));
    }
    
    // Check water saving habits
    if (stats.totalWaterSaved < 50) {
      tipsList.push(...this.getRandomTipsByCategory('water', 2));
    }
    
    // Check recycling habits
    const totalRecycled = stats.totalPlasticRecycled + stats.totalPaperRecycled + stats.totalMetalRecycled;
    if (totalRecycled < 10) {
      tipsList.push(...this.getRandomTipsByCategory('recycling', 2));
    }
    
    // Check transportation habits
    if (stats.bikingDays < 3 && stats.publicTransportDays < 3) {
      tipsList.push(...this.getRandomTipsByCategory('transportation', 2));
    }
    
    // If we don't have enough tips yet, add some general ones
    if (tipsList.length < count) {
      tipsList.push(...this.getRandomTipsByCategory('general', count - tipsList.length));
    }
    
    // Shuffle the tips and return the requested count
    return this.shuffleArray(tipsList).slice(0, count);
  },
  
  // Helper function to shuffle an array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}; 