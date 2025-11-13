import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accepting, setAccepting] = useState(false);
  const [acceptSuccess, setAcceptSuccess] = useState(false);
  const [isAlreadyAccepted, setIsAlreadyAccepted] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await jobAPI.getJobById(id);
      // API returns { success, data: {...job} }
      const jobData = response.data?.data || null;
      setJob(jobData);

      // Check localStorage for accepted jobs
      const acceptedJobs = JSON.parse(
        localStorage.getItem("acceptedJobs") || "{}"
      );

      // Check if this job is already accepted
      if (acceptedJobs[jobData?._id]) {
        setIsAlreadyAccepted(true);
        // Don't show success message on page load, only after accepting
      }
    } catch (err) {
      setError("Failed to load job details. Please try again.");
      console.error("Error fetching job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async () => {
    if (!user?.email) {
      toast.error("Please log in to accept jobs", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (isAlreadyAccepted) {
      toast.warning("This job has already been accepted", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setAccepting(true);

    try {
      // Accept job with required fields: jobId, userEmail, userName
      await jobAPI.acceptJob({
        jobId: job._id,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
      });

      // Save to localStorage
      const acceptedJobs = JSON.parse(
        localStorage.getItem("acceptedJobs") || "{}"
      );
      acceptedJobs[job._id] = {
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        acceptedAt: new Date().toISOString(),
        jobTitle: job.title,
      };
      localStorage.setItem("acceptedJobs", JSON.stringify(acceptedJobs));

      setAcceptSuccess(true);
      setIsAlreadyAccepted(true);
      toast.success("Job accepted successfully! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate("/my-accepted-tasks");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to accept job. Please try again.",
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
      console.error("Error accepting job:", err);
    } finally {
      setAccepting(false);
    }
  };

  const getCategoryColor = (category) => {
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
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-300";
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            {error || "Job not found"}
          </div>
          <button
            onClick={() => navigate("/allJobs")}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            ← Back to All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6 relative overflow-hidden">
      <ToastContainer />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/allJobs")}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
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
          Back to All Jobs
        </motion.button>

        {/* Success Message */}
        {acceptSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl"
          >
            ✓ Job accepted successfully! Redirecting to your accepted tasks...
          </motion.div>
        )}

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x400?text=Job+Cover+Image";
            }}
          />
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-white/50"
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 flex-1">
                {job.title}
              </h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getCategoryColor(
                  job.category
                )} ml-4`}
              >
                {job.category}
              </span>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
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
                <span className="font-semibold">Posted by: {job.postedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-500"
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
                <span>{getTimeAgo(job.postedDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-pink-500"
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
                <span className="text-sm">{job.userEmail}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {job.summary}
            </p>
          </div>

          {/* Accept Button */}
          <div className="flex justify-end">
            {isAlreadyAccepted && !acceptSuccess ? (
              <div className="text-center">
                <div className="px-10 py-4 bg-gray-400 text-white rounded-xl font-bold text-lg cursor-not-allowed opacity-70">
                  Already Accepted
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {(() => {
                    const acceptedJobs = JSON.parse(
                      localStorage.getItem("acceptedJobs") || "{}"
                    );
                    const acceptedBy = acceptedJobs[job._id];
                    return acceptedBy?.userEmail === user?.email
                      ? "You have already accepted this job"
                      : `This job has been accepted by ${
                          acceptedBy?.userName || "another user"
                        }`;
                  })()}
                </p>
              </div>
            ) : (
              <button
                onClick={handleAcceptJob}
                disabled={accepting || acceptSuccess || isAlreadyAccepted}
                className="px-10 py-4 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {accepting
                  ? "Accepting..."
                  : acceptSuccess
                  ? "Accepted! ✓"
                  : "Accept Job"}
              </button>
            )}
          </div>
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 bg-white/40 backdrop-blur-lg rounded-2xl shadow-md p-6 border border-white/50"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="flex items-center gap-3 text-gray-700">
            <svg
              className="w-5 h-5 text-blue-500"
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
            <a
              href={`mailto:${job.userEmail}`}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              {job.userEmail}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
