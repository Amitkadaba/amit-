const express = require('express');
const router = express.Router();
const sustainableActionController = require('../controllers/sustainableActionController');
const { authenticate } = require('../utils/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new sustainable action log
router.post('/', sustainableActionController.createAction);

// Get all actions for the current user
router.get('/', sustainableActionController.getUserActions);

// Get actions by date range
router.get('/date-range', sustainableActionController.getActionsByDateRange);

// Get user statistics
router.get('/stats', sustainableActionController.getUserStats);

// Update an action
router.put('/:id', sustainableActionController.updateAction);

// Delete an action
router.delete('/:id', sustainableActionController.deleteAction);

module.exports = router; 