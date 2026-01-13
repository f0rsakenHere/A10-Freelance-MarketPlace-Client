import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobAPI } from "../api/jobAPI";
import { motion } from "motion/react";
import ImageGallery from "../components/ImageGallery";
import ReviewCard from "../components/ReviewCard";
import RelatedItems from "../components/RelatedItems";

const EnhancedJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
    fetchAllJobs();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await jobAPI.getJobById(id);
      const jobData = response.data?.data || null;
      setJob(jobData);
    } catch (err) {
      setError("Failed to load job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllJobs = async () => {
    try {
      const response = await jobAPI.getAllJobs();
      setAllJobs(response.data?.data || []);
    } catch (err) {
      console.error("Failed to load related jobs");
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

  // Mock reviews data for demonstration
  const mockReviews = [
    {
      id: 1,
      userName: "Jessica Martinez",
      rating: 5,
      date: new Date("2024-01-05"),
      comment: "Absolutely fantastic work! The deliverables exceeded my expectations. Professional communication throughout the project and delivered ahead of schedule.",
      projectTitle: "E-commerce Website Redesign",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      userName: "David Thompson",
      rating: 5,
      date: new Date("2024-01-10"),
      comment: "Outstanding quality and attention to detail. Would definitely work with this freelancer again!",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      rating: 4,
      date: new Date("2024-01-12"),
      comment: "Great work overall. Minor revisions needed but they were handled quickly and professionally.",
      projectTitle: "Mobile App UI Design",
      verified: false,
      helpful: 5
    }
  ];

  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  // Mock multiple images for gallery
  const jobImages = job?.coverImage 
    ? [
        job.coverImage,
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800",
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"
      ]
    : [];

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 font-bold">
                <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 text-red-600 px-8 py-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">Error</span>
            </div>
            <p>{error || "Job not found"}</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/allJobs")}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            ← Browse All Jobs
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 md:py-12 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/allJobs")}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Jobs
        </motion.button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ImageGallery images={jobImages} />
            </motion.div>

            {/* Overview/Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-white/50"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex-1">
                  {job.title}
                </h1>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 whitespace-nowrap ${getCategoryColor(job.category)}`}>
                  {job.category}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {job.postedBy.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.postedBy}</p>
                    <p className="text-sm text-gray-600">{job.userEmail}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {job.summary}
                </p>
              </div>
            </motion.div>

            {/* Key Information/Specs/Rules Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-white/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Key Information & Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Category</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{job.category}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Posted</h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {new Date(job.postedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Status</h3>
                  </div>
                  <p className="text-gray-700 font-medium">Open for Applications</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl p-5 border border-pink-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Contact</h3>
                  </div>
                  <p className="text-gray-700 font-medium truncate">{job.userEmail}</p>
                </div>
              </div>

              {/* Rules & Requirements */}
              <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Important Guidelines
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Please review all requirements carefully before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Submit portfolio samples relevant to this project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Communicate professionally and meet all deadlines</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Reviews/Ratings Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 md:p-8 border border-white/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Reviews & Ratings
              </h2>

              {/* Rating Summary */}
              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-8 h-8 ${i < Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium">Based on {mockReviews.length} reviews</p>
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {mockReviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 sticky top-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-600 mb-6 text-sm">
                This opportunity is publicly available. Login to apply and start your freelancing journey!
              </p>
              
              <button
                onClick={() => navigate(`/job/${id}`)}
                className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-3"
              >
                Apply Now
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >
                Login to Continue
              </button>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Posted Date</span>
                  <span className="font-bold text-gray-900">
                    {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-bold text-gray-900">{job.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Views</span>
                  <span className="font-bold text-gray-900">{Math.floor(Math.random() * 500) + 100}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <RelatedItems currentJobId={id} category={job.category} allJobs={allJobs} />
        </motion.div>
      </div>

      {/* Blob Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EnhancedJobDetails;
