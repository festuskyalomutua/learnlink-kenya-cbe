const Resource = require('../models/Resource'); // Make sure this exists

// CREATE a new resource
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
