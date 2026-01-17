const express = require('express');
const router = express.Router();
const { getProfile, getProjects } = require('../controllers/profileController');

router.get('/profile', getProfile);
router.get('/projects', getProjects);
router.get('/health', (req, res) => res.send('API is healthy'));

module.exports = router;