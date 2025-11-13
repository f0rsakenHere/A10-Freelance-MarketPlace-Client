import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LatestOpportunities = () => {
  const [filter, setFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest jobs from MongoDB
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/jobs/latest?limit=6"
        );
        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-500",
      "Graphics Design": "bg-purple-500",
      "Digital Marketing": "bg-green-500",
      "Video Editing": "bg-red-500",
    };
    return colors[category] || "bg-gray-500";
  };

  // Helper function to format date
  const getTimeAgo = (date) => {
    const posted = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  // Sample fallback jobs for when no data exists
  const sampleJobs = [
    {
      id: 1,
      category: "Web Dev",
      categoryColor: "bg-blue-500",
      title: "Build a Responsive E-commerce Website",
      summary:
        "Looking for an experienced developer to create a modern, responsive e-commerce platform with payment integration and admin dashboard.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      postedBy: "Sarah Johnson",
      deadline: "5 days left",
      price: "$1,200",
    },
    {
      id: 2,
      category: "Graphics Design",
      categoryColor: "bg-purple-500",
      title: "Design Modern Logo and Brand Identity",
      summary:
        "Need a creative designer to develop a unique logo and complete brand identity package including color palette and typography.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      postedBy: "Michael Chen",
      deadline: "3 days left",
      price: "$450",
    },
    {
      id: 3,
      category: "Digital Marketing",
      categoryColor: "bg-green-500",
      title: "SEO Optimization for SaaS Website",
      summary:
        "Seeking an SEO expert to improve search rankings and organic traffic for our SaaS platform. Experience with B2B required.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      postedBy: "Emily Rodriguez",
      deadline: "7 days left",
      price: "$800",
    },
    {
      id: 4,
      category: "Video Editing",
      categoryColor: "bg-red-500",
      title: "Edit YouTube Videos for Tech Channel",
      summary:
        "Looking for a skilled video editor to create engaging content for our tech YouTube channel with 100K+ subscribers.",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop",
      postedBy: "David Park",
      deadline: "4 days left",
      price: "$350",
    },
    {
      id: 5,
      category: "Web Dev",
      categoryColor: "bg-blue-500",
      title: "React Native Mobile App Development",
      summary:
        "Need an experienced React Native developer to build a cross-platform mobile app for food delivery service.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
      postedBy: "Lisa Anderson",
      deadline: "10 days left",
      price: "$2,500",
    },
    {
      id: 6,
      category: "Graphics Design",
      categoryColor: "bg-purple-500",
      title: "UI/UX Design for Mobile Banking App",
      summary:
        "Seeking a talented UI/UX designer to create intuitive and modern interfaces for our mobile banking application.",
      image:
        "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=500&h=300&fit=crop",
      postedBy: "James Wilson",
      deadline: "6 days left",
      price: "$950",
    },
  ];

  // Use sample jobs if no jobs from database
  const displayJobs = jobs.length > 0 ? jobs : sampleJobs;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Filter */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Latest Opportunities
            </h2>
            <p className="text-gray-600 mt-2">
              Discover the newest freelance jobs posted today
            </p>
          </motion.div>

          {/* Filter Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="web-dev">Web Development</option>
              <option value="graphics">Graphics Design</option>
              <option value="marketing">Digital Marketing</option>
              <option value="video">Video Editing</option>
            </select>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {displayJobs.map((job) => (
              <motion.div
                key={job._id || job.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Category Badge */}
                  <div className="relative">
                    <img
                      src={
                        job.coverImage ||
                        job.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop"
                      }
                      alt={job.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`${
                          job.categoryColor || getCategoryColor(job.category)
                        } text-white text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        {job.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {job.summary && job.summary.length > 100
                        ? `${job.summary.substring(0, 100)}...`
                        : job.summary}
                    </p>

                    {/* Posted By and Details */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Posted by</p>
                        <p className="font-semibold text-gray-700">
                          {job.postedBy}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">
                          {job.deadline ||
                            (job.postedDate && getTimeAgo(job.postedDate))}
                        </p>
                        <p className="font-bold text-blue-600 text-lg">
                          {job.price || "Negotiable"}
                        </p>
                      </div>
                    </div>

                    {/* Full Width Button */}
                    <Link
                      to={`/allJobs/${job._id || job.id}`}
                      className="block w-full text-center px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/allJobs"
            className="inline-block px-8 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            View All Jobs
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestOpportunities;
