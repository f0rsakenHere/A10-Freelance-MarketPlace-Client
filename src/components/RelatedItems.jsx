import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RelatedItems = ({ currentJobId, category, allJobs = [] }) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter related jobs by category, excluding current job
  const relatedJobs = allJobs
    .filter((job) => job.category === category && job._id !== currentJobId)
    .slice(0, 6);

  // Mock data if no related jobs found
  const jobs = relatedJobs.length > 0 ? relatedJobs : [
    {
      _id: "mock1",
      title: "Professional Logo Design",
      category: category,
      coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
      postedBy: "Sarah Johnson",
      price: "$150"
    },
    {
      _id: "mock2",
      title: "React Website Development",
      category: category,
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
      postedBy: "Mike Chen",
      price: "$500"
    },
    {
      _id: "mock3",
      title: "SEO Optimization Package",
      category: category,
      coverImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400",
      postedBy: "Emma Davis",
      price: "$300"
    }
  ];

  const getCategoryColor = (cat) => {
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
    return colors[cat] || "bg-gray-100 text-gray-700";
  };

  const scroll = (direction) => {
    const container = document.getElementById("related-scroll");
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Related Opportunities
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="related-scroll"
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {jobs.map((job, index) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
            onClick={() => {
              if (!job._id.startsWith("mock")) {
                navigate(`/job-preview/${job._id}`);
                window.scrollTo(0, 0);
              }
            }}
          >
            <div className="bg-white/60 backdrop-blur-lg rounded-xl overflow-hidden border border-white/50 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(
                    job.category
                  )}`}
                >
                  {job.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="truncate">{job.postedBy}</span>
                </div>

                {job.price && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Budget</span>
                    <span className="text-lg font-bold text-gray-900">{job.price}</span>
                  </div>
                )}

                <button className="mt-3 w-full py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RelatedItems;
