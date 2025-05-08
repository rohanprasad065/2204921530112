import { useState, useEffect } from 'react';
import { Post } from '../types';

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch feed posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/feed');
        
        if (!res.ok) {
          throw new Error('Failed to fetch feed');
        }
        
        const data = await res.json();
        setPosts(data.latestPosts || []);
      } catch (err) {
        setError('Error loading feed. Please try again.');
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
    
    // Refresh data every 30 seconds
    const interval = setInterval(getPosts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get avatar color based on user ID
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
      <h1 className="text-2xl font-bold mb-2">Latest Posts</h1>
      <p className="text-gray-600 mb-6">Real-time feed of new posts</p>
      
      <div className="space-y-4">
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
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No posts found
        </div>
      )}
    </div>
  );
};

export default Feed;