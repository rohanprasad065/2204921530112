import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-semibold text-xl">Social Analytics</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "py-1 border-b-2 border-white font-medium" : "py-1 hover:text-blue-100"
                  }
                  end
                >
                  Top Users
                </NavLink>
                <NavLink 
                  to="/trending" 
                  className={({ isActive }) => 
                    isActive ? "py-1 border-b-2 border-white font-medium" : "py-1 hover:text-blue-100"
                  }
                >
                  Trending Posts
                </NavLink>
                <NavLink 
                  to="/feed" 
                  className={({ isActive }) => 
                    isActive ? "py-1 border-b-2 border-white font-medium" : "py-1 hover:text-blue-100"
                  }
                >
                  Feed
                </NavLink>