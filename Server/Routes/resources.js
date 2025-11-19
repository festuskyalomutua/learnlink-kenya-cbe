const express = require('express');
const router = express.Router();
const { createResource, getAllResources, getResourceById } = require('../controllers/resourceController');

// Routes
router.post('/', createResource);          // Create a resource
router.get('/', getAllResources);         // Get all resources
router.get('/:id', getResourceById);      // Get a resource by ID

module.exports = router;
