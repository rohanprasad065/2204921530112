const { getData, cache } = require('../services/apiService');

const API_URL = process.env.API_URL;

const getTopUsers = async (req, res) => {
  try {
    const usersData = await getData(`${API_URL}/users`, 'users');
    const users = usersData.users;

    const userPostCounts = {};

    for (const userId in users) {
      try {
        const postsData = await getData(`${API_URL}/users/${userId}/posts`, `user-${userId}-posts`);
        const postCount = postsData.posts?.length || 0;

        userPostCounts[userId] = {
          id: userId,
          name: users[userId],
          postCount
        };
      } catch {
        userPostCounts[userId] = {
          id: userId,
          name: users[userId],
          postCount: 0
        };
      }
    }

    const topUsers = Object.values(userPostCounts)
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    res.json({ topUsers });
  } catch (err) {
    res.status(500).json({ error: 'Server error getting top users' });
  }
};

const getTrendingPosts = async (req, res) => {
  try {
    const usersData = await getData(`${API_URL}/users`, 'users');
    const users = usersData.users;
    const allPosts = [];

    for (const userId in users) {
      try {
        const postsData = await getData(`${API_URL}/users/${userId}/posts`, `user-${userId}-posts`);
        if (!postsData.posts) continue;

        for (const post of postsData.posts) {
          try {
            const commentsData = await getData(`${API_URL}/posts/${post.id}/comments`, `post-${post.id}-comments`);
            const commentCount = commentsData.comments?.length || 0;

            allPosts.push({
              id: post.id,
              userId: post.userId,
              userName: users[post.userId],
              content: post.content,
              commentCount
            });
          } catch {
            allPosts.push({
              id: post.id,
              userId: post.userId,
              userName: users[post.userId],
              content: post.content,
              commentCount: 0
            });
          }
        }
      } catch {}
    }

    allPosts.sort((a, b) => b.commentCount - a.commentCount);
    const maxComments = allPosts[0]?.commentCount || 0;
    const trendingPosts = allPosts.filter(p => p.commentCount === maxComments);

    res.json({ trendingPosts });
  } catch (err) {
    res.status(500).json({ error: 'Server error getting trending posts' });
  }
};

const getLatestFeed = async (req, res) => {
  try {
    const usersData = await getData(`${API_URL}/users`, 'users');
    const users = usersData.users;
    let allPosts = [];

    for (const userId in users) {
      try {
        const postsData = await getData(`${API_URL}/users/${userId}/posts`, `user-${userId}-posts`);
        if (!postsData.posts) continue;

        const posts = postsData.posts.map(post => ({
          id: post.id,
          userId: post.userId,
          userName: users[post.userId],
          content: post.content,
          timestamp: post.id
        }));

        allPosts = [...allPosts, ...posts];
      } catch {}
    }

    allPosts.sort((a, b) => b.timestamp - a.timestamp);
    const latestPosts = allPosts.slice(0, 5);

    res.json({ latestPosts });
  } catch (err) {
    res.status(500).json({ error: 'Server error getting feed' });
  }
};

const clearCache = (req, res) => {
  cache.flushAll();
  res.json({ message: 'Cache cleared' });
};

module.exports = {
  getTopUsers,
  getTrendingPosts,
  getLatestFeed,
  clearCache
};
