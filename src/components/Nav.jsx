import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              FreelanceHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/allJobs"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              All Jobs
            </Link>

            {/* My Jobs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                My Jobs
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isFeaturesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isFeaturesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/addJob"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Add Job
                  </Link>
                  <Link
                    to="/myAddedJobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Posted Jobs
                  </Link>
                  <Link
                    to="/my-accepted-tasks"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Accepted Tasks
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-700 hover:text-gray-900">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
