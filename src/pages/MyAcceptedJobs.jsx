import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAcceptedJobs = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingTaskId, setRemovingTaskId] = useState(null);

  useEffect(() => {
    fetchAcceptedTasks();
  }, [user]);

  const fetchAcceptedTasks = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    try {
      const response = await jobAPI.getMyAcceptedTasks(user.email);
      const tasksData = response.data?.data || [];

      const tasksWithDetails = await Promise.all(
        tasksData.map(async (task) => {
          try {
            const jobResponse = await jobAPI.getJobById(task.jobId);
            const jobData = jobResponse.data?.data || {};
            return {
              acceptedTaskId: task._id,
              acceptedByEmail: task.acceptedByEmail,
              userEmail: task.userEmail,
              ...jobData,
              jobId: task.jobId,
              acceptedDate: task.acceptedDate || task.createdAt,
            };
          } catch {
            return {
              ...task,
              acceptedTaskId: task._id,
            };
          }
        })
      );

      setTasks(tasksWithDetails);
    } catch (err) {
      setError("Failed to load your accepted tasks. Please try again.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-700",
      "Graphics Design": "bg-purple-100 text-purple-700",
      "Digital Marketing": "bg-green-100 text-green-700",
      "Video Editing": "bg-red-100 text-red-700",
      "Content Writing": "bg-yellow-100 text-yellow-700",
      "SEO Services": "bg-indigo-100 text-indigo-700",
      "Mobile Development": "bg-cyan-100 text-cyan-700",
      "UI/UX Design": "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getTimeAgo = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const accepted = new Date(date);
    const diffMs = now - accepted;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleRemoveTask = async (acceptedTaskId, action) => {
    if (!user?.email) return;

    const actionText = action === "done" ? "mark as done" : "cancel";
    const confirmMessage = `Are you sure you want to ${actionText} this task?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setRemovingTaskId(acceptedTaskId);

    try {
      const task = tasks.find((t) => t.acceptedTaskId === acceptedTaskId);
      if (!task) {
        throw new Error("Task not found");
      }

      console.log("Removing task with ID:", acceptedTaskId);
      console.log("Task object:", task);

      if (!acceptedTaskId) {
        throw new Error("Accepted task ID is missing");
      }

      await jobAPI.removeAcceptedJob(acceptedTaskId, user.email);

      const acceptedJobs = JSON.parse(
        localStorage.getItem("acceptedJobs") || "{}"
      );

      if (task.jobId && acceptedJobs[task.jobId]) {
        delete acceptedJobs[task.jobId];
        localStorage.setItem("acceptedJobs", JSON.stringify(acceptedJobs));
      }

      setTasks(tasks.filter((t) => t.acceptedTaskId !== acceptedTaskId));

      const message =
        action === "done"
          ? "Task marked as completed!"
          : "Task cancelled successfully!";

      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Failed to ${actionText} task. Please try again.`;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
      console.log("Error details:", {
        acceptedTaskId,
        userEmail: user.email,
        error: err.response?.data || err.message,
      });
    } finally {
      setRemovingTaskId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6 relative overflow-hidden">
      <ToastContainer />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-white/40 backdrop-blur-lg rounded-2xl p-4 md:p-8 border border-white/50 shadow-md"
        >
          <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            My Accepted Tasks
          </h1>
          <p className="text-gray-700 text-sm md:text-lg">
            View and manage tasks you have accepted to work on
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
        {!loading && !error && tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-white/50"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Accepted Tasks Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start browsing jobs and accept tasks that match your skills.
            </p>
            <Link
              to="/allJobs"
              className="inline-block px-6 py-3 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Available Jobs
            </Link>
          </motion.div>
        )}

        {/* Tasks Grid */}
        {!loading && !error && tasks.length > 0 && (
          <div className="space-y-6">
            {tasks.map((task, index) => (
              <motion.div
                key={task.acceptedTaskId || task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group bg-white/50 backdrop-blur-xl rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-white/60"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover Image */}
                  <Link
                    to={`/job/${task.jobId}`}
                    className="w-full md:w-72 h-40 md:h-auto overflow-hidden shrink-0 relative block cursor-pointer"
                  >
                    <img
                      src={task.coverImage}
                      alt={task.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Job+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col h-full">
                      {/* Top Section */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <div className="flex flex-col md:flex-row md:items-start gap-3 mb-3">
                            <Link
                              to={`/job/${task.jobId}`}
                              className="flex-1 min-w-0"
                            >
                              <h3 className="text-lg md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                                {task.title}
                              </h3>
                            </Link>
                            <span
                              className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs font-bold backdrop-blur-sm whitespace-nowrap shrink-0 ${getCategoryColor(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-700 mb-3">
                            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full w-fit">
                              <svg
                                className="w-3 md:w-4 h-3 md:h-4 text-blue-500 shrink-0"
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
                              <span className="font-semibold truncate">
                                {task.postedBy}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full w-fit">
                              <svg
                                className="w-3 md:w-4 h-3 md:h-4 text-green-500 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="font-medium text-green-600">
                                Accepted {getTimeAgo(task.acceptedDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed line-clamp-2 mb-4 text-sm md:text-base">
                          {task.summary}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200/50">
                        <button
                          onClick={() =>
                            handleRemoveTask(task.acceptedTaskId, "done")
                          }
                          disabled={removingTaskId === task.acceptedTaskId}
                          className="flex items-center justify-center gap-1 px-2 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                          title="Mark as Done"
                        >
                          <span>✅</span>
                          <span>Done</span>
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveTask(task.acceptedTaskId, "cancel")
                          }
                          disabled={removingTaskId === task.acceptedTaskId}
                          className="flex items-center justify-center gap-1 px-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                          title="Cancel Task"
                        >
                          <span>❌</span>
                          <span>Cancel</span>
                        </button>
                        <Link
                          to={`/job/${task.jobId}`}
                          className="flex items-center justify-center px-2 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-bold text-xs"
                        >
                          View →
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

export default MyAcceptedJobs;
