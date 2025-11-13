import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "All",
    "Web Development",
    "Digital Marketing",
    "Graphics Design",
    "Video Editing",
    "Content Writing",
    "SEO Services",
    "Mobile Development",
    "UI/UX Design",
  ];

  const fetchAllJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const sortOrder = sortBy === "newest" ? "desc" : "asc";
      const response = await jobAPI.getAllJobs("postedDate", sortOrder);
      const jobsData = response.data?.data || [];
      setJobs(jobsData);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-700 border-blue-200",
      "Graphics Design": "bg-purple-100 text-purple-700 border-purple-200",
      "Digital Marketing": "bg-green-100 text-green-700 border-green-200",
      "Video Editing": "bg-red-100 text-red-700 border-red-200",
      "Content Writing": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "SEO Services": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "Mobile Development": "bg-cyan-100 text-cyan-700 border-cyan-200",
      "UI/UX Design": "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getTimeAgo = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now - posted;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Filter jobs based on search and category
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.postedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6 relative overflow-hidden transition-colors">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Glassmorphism */}

        {/* Search and Filter Bar with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-md p-6 mb-8 border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input with Glassmorphism */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs by title, description, or poster..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <svg
                  className="w-5 h-5 text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter with Glassmorphism */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by Date with Glassmorphism */}
            <div className="md:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
              Showing{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {filteredJobs.length}
              </span>{" "}
              of{" "}
              <span className="text-purple-600 dark:text-purple-400 font-bold">
                {jobs.length}
              </span>{" "}
              jobs
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filters"
                : "No jobs available at the moment"}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Jobs Grid with Glassmorphism */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-white/60 dark:border-gray-700/60"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover Image */}
                  <Link
                    to={`/job/${job._id}`}
                    className="md:w-72 h-56 md:h-auto overflow-hidden shrink-0 relative block cursor-pointer"
                  >
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Job+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      {/* Top Section */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <Link to={`/job/${job._id}`}>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                                {job.title}
                              </h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-gray-300 mb-3">
                              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <svg
                                  className="w-4 h-4 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <span className="font-semibold">
                                  {job.postedBy}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <svg
                                  className="w-4 h-4 text-purple-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="font-medium">
                                  {getTimeAgo(job.postedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-sm whitespace-nowrap ml-4 ${getCategoryColor(
                              job.category
                            )}`}
                          >
                            {job.category}
                          </span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 mb-4">
                          {job.summary}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <svg
                            className="w-4 h-4 text-pink-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-xs font-medium">
                            {job.userEmail}
                          </span>
                        </div>

                        <Link
                          to={`/job/${job._id}`}
                          className="px-8 py-3 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
