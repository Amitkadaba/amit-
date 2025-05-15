const mongoose = require('mongoose');

const sustainableActionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  energySaved: {
    type: Number,
    default: 0,
    min: 0
  },
  waterSaved: {
    type: Number,
    default: 0,
    min: 0
  },
  recycledItems: {
    plastic: {
      type: Number,
      default: 0,
      min: 0
    },
    paper: {
      type: Number,
      default: 0,
      min: 0
    },
    metal: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  transportation: {
    biking: {
      type: Boolean,
      default: false
    },
    publicTransport: {
      type: Boolean,
      default: false
    },
    carpooling: {
      type: Boolean,
      default: false
    },
    walkingDistance: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
});

// Create indexes for efficient querying
sustainableActionSchema.index({ user: 1, date: -1 });

const SustainableAction = mongoose.model('SustainableAction', sustainableActionSchema);

module.exports = SustainableAction; 