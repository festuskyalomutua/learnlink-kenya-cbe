const express = require('express');
const router = express.Router();

// Placeholder controller
router.get('/', (req, res) => {
  res.json({ message: "Notifications route works!" });
});

module.exports = router;
