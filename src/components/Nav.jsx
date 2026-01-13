import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";

const Nav = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector("nav");
      const mobileMenuDropdown = document.querySelector(
        ".mobile-menu-dropdown"
      );

      if (isUserMenuOpen && !event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }

      if (isMobileOpen && nav && mobileMenuDropdown) {
        if (
          !nav.contains(event.target) &&
          !mobileMenuDropdown.contains(event.target)
        ) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen, isMobileOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
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
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                FreelanceHub
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Home
              </Link>

              <Link
                to="/allJobs"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                All Jobs
              </Link>

              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Contact
              </Link>

              {/* Dashboard Link - Only visible when logged in */}
              {user && (
                <Link
                  to={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}

              {/* My Jobs Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                  onMouseEnter={() => setIsFeaturesOpen(true)}
                >
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
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                  >
                    <Link
                      to="/addJob"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      Add Job
                    </Link>
                    <Link
                      to="/myAddedJobs"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      My Posted Jobs
                    </Link>
                    <Link
                      to="/my-accepted-tasks"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      My Accepted Tasks
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {user ? (
                <div className="relative user-menu-container">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {user.displayName || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
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

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="mobile-menu-dropdown md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg max-h-screen overflow-y-auto z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/allJobs"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              All Jobs
            </Link>

            <Link
              to="/about"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              About
            </Link>

            <Link
              to="/contact"
              className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Contact
            </Link>

            {/* Dashboard Link - Only visible when logged in */}
            {user && (
              <Link
                to={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {/* My Jobs Accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              >
                <span>My Jobs</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
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

              {isFeaturesOpen && (
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg mt-1 overflow-hidden">
                  <Link
                    to="/addJob"
                    className="block px-4 py-3 pl-8 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    Add Job
                  </Link>
                  <Link
                    to="/myAddedJobs"
                    className="block px-4 py-3 pl-8 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    My Posted Jobs
                  </Link>
                  <Link
                    to="/my-accepted-tasks"
                    className="block px-4 py-3 pl-8 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    My Accepted Tasks
                  </Link>
                </div>
              )}
            </div>

            <hr className="my-3 border-gray-200 dark:border-gray-700" />

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <hr className="my-3 border-gray-200 dark:border-gray-700" />

            {/* Auth Section */}
            {user ? (
              <>
                <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  className="flex-1 px-4 py-3 text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 px-4 py-3 text-center bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-medium transition-colors shadow-sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
