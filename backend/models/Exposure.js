const mongoose = require('mongoose');

const exposureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  intervals: [
    {
      start: { type: String, required: true },
      end: { type: String, required: true }
    }
  ],
  location: { type: String, required: true },
  uvEstimated: { type: Number },
  minutesExposed: { type: Number }
});

module.exports = mongoose.model('Exposure', exposureSchema); 