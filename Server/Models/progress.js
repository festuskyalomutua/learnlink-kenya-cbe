const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  score: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
