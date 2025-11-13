import axios from "axios";

// Base API URL - change this in production
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Job API endpoints
export const jobAPI = {
  // Get all jobs with optional sorting
  getAllJobs: (sortBy = "postedDate", sortOrder = "desc") =>
    api.get(`/api/jobs?sortBy=${sortBy}&sortOrder=${sortOrder}`),

  // Get latest jobs (for homepage)
  getLatestJobs: (limit = 6) => api.get(`/api/jobs/latest?limit=${limit}`),

  // Get jobs by category
  getJobsByCategory: (category) => api.get(`/api/jobs/category/${category}`),

  // Get single job by ID
  getJobById: (id) => api.get(`/api/jobs/${id}`),

  // Get my added jobs
  getMyJobs: (email) => api.get(`/api/jobs/my-jobs/${email}`),

  // Add new job
  addJob: (jobData) => api.post("/api/jobs", jobData),

  // Update job
  updateJob: (id, jobData) => api.put(`/api/jobs/${id}`, jobData),

  // Delete job
  deleteJob: (id, userEmail) =>
    api.delete(`/api/jobs/${id}`, { data: { userEmail } }),

  // Accept a job
  acceptJob: (jobData) => api.post("/api/jobs/accept", jobData),

  // Get my accepted tasks
  getMyAcceptedTasks: (email) => api.get(`/api/jobs/accepted/${email}`),

  // Remove accepted job
  removeAcceptedJob: (id, userEmail) =>
    api.delete(`/api/jobs/accepted/${id}`, { data: { userEmail } }),

  // Get statistics (optional)
  getStats: () => api.get("/api/jobs/stats/all"),
};

export default api;
