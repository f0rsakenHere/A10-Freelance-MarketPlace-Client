import { motion } from "motion/react";
import { useState } from "react";

const ReviewCard = ({ review, index }) => {
  const [helpful, setHelpful] = useState(review.helpful || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 md:w-5 md:h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ));
  };

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1);
      setHasVoted(true);
    }
  };

  const getTimeAgo = (date) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white/60 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/50 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* User Info */}
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          {review.verified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-900 text-sm md:text-base">{review.userName}</h4>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Verified Client
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">{renderStars(review.rating)}</div>
            <span className="text-xs md:text-sm text-gray-500">{getTimeAgo(review.date)}</span>
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
        {review.comment}
      </p>

      {/* Project Details (if applicable) */}
      {review.projectTitle && (
        <div className="mb-4 p-3 bg-gray-50/80 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Project</p>
          <p className="text-sm font-medium text-gray-900">{review.projectTitle}</p>
        </div>
      )}

      {/* Helpful Button */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`flex items-center gap-2 text-sm transition-all duration-200 ${
            hasVoted
              ? "text-blue-600 font-medium cursor-default"
              : "text-gray-600 hover:text-blue-600 hover:scale-105"
          }`}
        >
          <svg
            className={`w-5 h-5 ${hasVoted ? "fill-current" : ""}`}
            fill={hasVoted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span>Helpful ({helpful})</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
