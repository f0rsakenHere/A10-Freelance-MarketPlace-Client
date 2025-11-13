import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    summary: "",
    coverImage: "",
  });

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphics Design",
    "Video Editing",
    "Content Writing",
    "SEO Services",
    "Mobile Development",
    "UI/UX Design",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Prepare job data according to MongoDB structure
      const jobData = {
        title: formData.title,
        postedBy: user.displayName || user.email,
        category: formData.category,
        summary: formData.summary,
        coverImage: formData.coverImage,
        userEmail: user.email,
      };

      // Add job to database
      await jobAPI.addJob(jobData);

      setSuccess(true);

      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate("/myAddedJobs");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add job. Please try again."
      );
      console.error("Error adding job:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Job</h1>
          <p className="text-gray-600">
            Post a new job opportunity for talented freelancers.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              ✓ Job posted successfully! Redirecting to your jobs...
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Build a responsive website"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary/Description */}
            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                required
                value={formData.summary}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe the job requirements, skills needed, and project details..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 50 characters recommended
              </p>
            </div>

            {/* Cover Image URL */}
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                required
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide a valid image URL for the job cover
              </p>
            </div>

            {/* Posted By (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posted By
              </label>
              <input
                type="text"
                value={user?.displayName || user?.email || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            {/* User Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Posting Job..." : success ? "Posted!" : "Post Job"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddJob;
