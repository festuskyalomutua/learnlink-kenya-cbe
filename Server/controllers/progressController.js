const Progress = require('../models/Progress');

const getProgress = async (req, res) => {
  const progress = await Progress.find({ student: req.user._id })
    .populate('assessment', 'title description');
  res.json(progress);
};

const updateProgress = async (req, res) => {
  const { assessmentId, score } = req.body;
  let record = await Progress.findOne({ student: req.user._id, assessment: assessmentId });
  if (!record) {
    record = await Progress.create({ student: req.user._id, assessment: assessmentId, score });
  } else {
    record.score = score;
    await record.save();
  }
  res.json(record);
};

module.exports = { getProgress, updateProgress };
