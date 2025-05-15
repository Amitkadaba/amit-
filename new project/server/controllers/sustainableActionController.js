const SustainableAction = require('../models/SustainableAction');

// Create a new sustainable action log
exports.createAction = async (req, res) => {
  try {
    const { 
      energySaved, 
      waterSaved, 
      recycledItems, 
      transportation, 
      notes 
    } = req.body;

    const newAction = new SustainableAction({
      user: req.user.id,
      energySaved,
      waterSaved,
      recycledItems,
      transportation,
      notes
    });

    const savedAction = await newAction.save();
    res.status(201).json(savedAction);
  } catch (error) {
    console.error('Create action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all actions for the logged-in user
exports.getUserActions = async (req, res) => {
  try {
    const actions = await SustainableAction.find({ user: req.user.id })
      .sort({ date: -1 });
    
    res.json(actions);
  } catch (error) {
    console.error('Get user actions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user actions within a date range
exports.getActionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const actions = await SustainableAction.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    res.json(actions);
  } catch (error) {
    console.error('Get actions by date range error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get summary statistics for the logged-in user
exports.getUserStats = async (req, res) => {
  try {
    const { period } = req.query; // 'week', 'month', 'year'
    
    let startDate;
    const endDate = new Date();
    
    if (period === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      // Default to all time
      startDate = new Date(0);
    }

    const actions = await SustainableAction.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });

    // Calculate totals
    const stats = actions.reduce((acc, action) => {
      acc.totalEnergySaved += action.energySaved || 0;
      acc.totalWaterSaved += action.waterSaved || 0;
      
      // Recycled items
      acc.totalPlasticRecycled += action.recycledItems?.plastic || 0;
      acc.totalPaperRecycled += action.recycledItems?.paper || 0;
      acc.totalMetalRecycled += action.recycledItems?.metal || 0;
      
      // Transportation
      if (action.transportation?.biking) acc.bikingDays += 1;
      if (action.transportation?.publicTransport) acc.publicTransportDays += 1;
      if (action.transportation?.carpooling) acc.carpoolingDays += 1;
      acc.totalWalkingDistance += action.transportation?.walkingDistance || 0;
      
      return acc;
    }, {
      totalEnergySaved: 0,
      totalWaterSaved: 0,
      totalPlasticRecycled: 0,
      totalPaperRecycled: 0,
      totalMetalRecycled: 0,
      bikingDays: 0,
      publicTransportDays: 0,
      carpoolingDays: 0,
      totalWalkingDistance: 0,
      totalLogs: actions.length
    });

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an action
exports.updateAction = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Find action and check ownership
    const action = await SustainableAction.findById(id);
    
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    
    // Check if the action belongs to the logged-in user
    if (action.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update the action
    const updatedAction = await SustainableAction.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    res.json(updatedAction);
  } catch (error) {
    console.error('Update action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an action
exports.deleteAction = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find action and check ownership
    const action = await SustainableAction.findById(id);
    
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    
    // Check if the action belongs to the logged-in user
    if (action.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Delete the action
    await SustainableAction.findByIdAndDelete(id);
    
    res.json({ message: 'Action deleted successfully' });
  } catch (error) {
    console.error('Delete action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 