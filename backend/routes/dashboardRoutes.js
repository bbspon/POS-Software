// /backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET /api/dashboard to retrieve all dashboard metrics and insights
router.get('/', dashboardController.getDashboardData);

module.exports = router;
