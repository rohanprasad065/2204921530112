import { useState, useEffect } from 'react';
import { Post } from '../types';

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trending posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/trending-posts');
        
        if (!res.ok) {
          throw new Error('Failed to fetch trending posts');
        }
        
        const data = await res.json();
        setPosts(data.trendingPosts || []);
      } catch (err) {
        setError('Error loading trending posts. Please try again.');
        console.error('Error fetching trending posts:', err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
    
    // Refresh data every 30 seconds
    const interval = setInterval(getPosts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get random color for user avatar
  const getAvatarColor = (userId: string): string => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'
    ];
    
    return colors[parseInt(userId) % colors.length];
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Trending Posts</h1>
      <p className="text-gray-600 mb-6">Posts with the most comments</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getAvatarColor(post.userId)}`}>
                  {post.userName.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="text-lg font-medium">{post.userName}</div>
                  <div className="text-sm text-gray-500">Post ID: {post.id}</div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">{post.content}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-end">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {post.commentCount} comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No trending posts found
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;