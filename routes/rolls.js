const express = require('express');
const router = express.Router();
const rollController = require('../controllers/rolls');

// Add New Roll
router.post('/', rollController.addRoll);
//Search Roll
router.get('/search', rollController.searchRolls);
//Search by ID
router.get('/:id', rollController.getRollById);

module.exports = router;