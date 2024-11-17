import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-purple-600">
                NutriWealth®
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  location.pathname === '/'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>

              <Link
                to="/forum"
                className={`${
                  location.pathname === '/forum'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Forum
              </Link>

              <Link
                to="/journal"
                className={`${
                  location.pathname === '/journal'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                My Journal
              </Link>

              <Link
                to="/support"
                className={`${
                  location.pathname === '/support'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Support
              </Link>

              <Link
                to="/analysis"
                className={`${
                  location.pathname === '/analysis'
                    ? 'border-purple-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Analysis
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } sm:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3`}
      >
        <Link
          to="/"
          className={`${
            location.pathname === '/'
              ? 'border-purple-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } block px-3 py-2 rounded-md text-base font-medium`}
        >
          Home
        </Link>

        <Link
          to="/forum"
          className={`${
            location.pathname === '/forum'
              ? 'border-purple-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } block px-3 py-2 rounded-md text-base font-medium`}
        >
          Forum
        </Link>

        <Link
          to="/journal"
          className={`${
            location.pathname === '/journal'
              ? 'border-purple-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } block px-3 py-2 rounded-md text-base font-medium`}
        >
          My Journal
        </Link>

        <Link
          to="/support"
          className={`${
            location.pathname === '/support'
              ? 'border-purple-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } block px-3 py-2 rounded-md text-base font-medium`}
        >
          Support
        </Link>

        <Link
          to="/analysis"
          className={`${
            location.pathname === '/analysis'
              ? 'border-purple-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } block px-3 py-2 rounded-md text-base font-medium`}
        >
          Analysis
        </Link>
      </div>

      {/* User Profile and Logout */}
      <div className="hidden sm:flex sm:items-center sm:ml-6">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to='/profile'>
              <span className="text-sm text-purple-700">
                {user.displayName || user.email}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
