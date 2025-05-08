import { useState, useEffect } from 'react';
import { User } from '../types';

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch top users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/top-users');
        
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await res.json();
        setUsers(data.topUsers || []);
      } catch (err) {
        setError('Error loading users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
    
    // Refresh data every 30 seconds
    const interval = setInterval(getUsers, 30000);
    return () => clearInterval(interval);
  }, []);

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
      <h1 className="text-2xl font-bold mb-2">Top Users</h1>
      <p className="text-gray-600 mb-6">Users with the most posts on the platform</p>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {users.map((user, index) => (
            <div key={user.id} className={`px-6 py-4 ${index < users.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-700' : 'bg-blue-500'
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">User ID: {user.id}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-lg text-blue-500">{user.postCount}</span>
                </div>
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user, index) => (
            <div key={user.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-700' : 'bg-blue-500'
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-3 text-lg font-medium">{user.name}</div>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-lg text-blue-500">{user.postCount} posts</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {users.length === 0 && (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsers;