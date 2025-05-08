const express = require('express');
const {
  getTopUsers,
  getTrendingPosts,
  getLatestFeed,
  clearCache
} = require('../controllers/analyticsController');

const router = express.Router();

router.get('/top-users', getTopUsers);
router.get('/trending-posts', getTrendingPosts);
router.get('/feed', getLatestFeed);
router.post('/clear-cache', clearCache);

module.exports = router;
