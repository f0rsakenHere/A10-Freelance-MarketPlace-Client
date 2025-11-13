import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";

const CategoryJobs = () => {
  const { category } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert URL category back to proper format (e.g., "web-development" -> "Web Development")
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    // Scroll to top when component mounts or category changes
    window.scrollTo(0, 0);
    fetchCategoryJobs();
  }, [category]);

  const fetchCategoryJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await jobAPI.getJobsByCategory(categoryName);
      // API returns { success, count, data: [...jobs] }
      const jobsData = response.data?.data || [];
      setJobs(jobsData);
    } catch (err) {
      setError("Failed to load jobs for this category. Please try again.");
      console.error("Error fetching category jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (cat) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-700 border-blue-300",
      "Graphics Design": "bg-purple-100 text-purple-700 border-purple-300",
      "Digital Marketing": "bg-green-100 text-green-700 border-green-300",
      "Video Editing": "bg-red-100 text-red-700 border-red-300",
      "Content Writing": "bg-yellow-100 text-yellow-700 border-yellow-300",
      "SEO Services": "bg-indigo-100 text-indigo-700 border-indigo-300",
      "Mobile Development": "bg-cyan-100 text-cyan-700 border-cyan-300",
      "UI/UX Design": "bg-pink-100 text-pink-700 border-pink-300",
    };
    return colors[cat] || "bg-gray-100 text-gray-700 border-gray-300";
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {categoryName} Jobs
          </h1>
          <p className="text-gray-600">
            {loading
              ? "Loading jobs..."
              : `Found ${jobs.length} job${
                  jobs.length !== 1 ? "s" : ""
                } in this category`}
          </p>
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
        {!loading && !error && jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-600 mb-6">
              There are currently no jobs available in the {categoryName}{" "}
              category.
            </p>
            <Link
              to="/allJobs"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              Browse All Jobs
            </Link>
          </motion.div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-white/50"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Job+Image";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getCategoryColor(
                        job.category
                      )}`}
                    >
                      {job.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-4 h-4"
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
                      <span className="truncate max-w-[120px]">
                        {job.postedBy}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {getTimeAgo(job.postedDate)}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/job/${job._id}`}
                    className="block w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg font-semibold text-center hover:bg-blue-600 transition-all group-hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryJobs;
