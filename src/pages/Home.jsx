import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import IntegrationsSection from "../components/IntegrationsSection";

const Home = () => {
  // Smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoothness
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            Find the Perfect Freelance Services for Your Business
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Connect with top talent in web development, design, and marketing.
            Secure, fast, and reliable.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            {/* Primary Button - Find Work */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/allJobs"
                className="inline-block px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg"
              >
                Find Work
              </Link>
            </motion.div>

            {/* Secondary Button - Post a Job */}
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/addJob"
                className="inline-block px-8 py-4 bg-transparent text-blue-500 text-lg font-semibold rounded-lg border-2 border-blue-500"
              >
                Post a Job
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Integrations Section */}
      <IntegrationsSection />
    </div>
  );
};

export default Home;
