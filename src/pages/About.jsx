import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          FreelanceHub connects talented freelancers with meaningful projects —
          we make hiring and collaboration simple, fast, and fair.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Empower independent professionals and businesses by providing a
            trusted platform for finding great work and great talent.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Trust, transparency, and quality drive everything we do. We
            prioritize fair terms for freelancers and reliable outcomes for
            clients.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Our Community</h2>
          <p className="text-gray-600 dark:text-gray-300">
            From designers to developers, our community spans many skills and
            industries—bringing expertise to every project.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Meet the Team</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-white font-semibold mb-3">
              AH
            </div>
            <p className="font-medium">Alex H.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Founder</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <div className="w-20 h-20 rounded-full bg-green-500 mx-auto flex items-center justify-center text-white font-semibold mb-3">
              ME
            </div>
            <p className="font-medium">Maya E.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <div className="w-20 h-20 rounded-full bg-purple-500 mx-auto flex items-center justify-center text-white font-semibold mb-3">
              RK
            </div>
            <p className="font-medium">Ravi K.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Engineering
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <div className="w-20 h-20 rounded-full bg-yellow-500 mx-auto flex items-center justify-center text-white font-semibold mb-3">
              LS
            </div>
            <p className="font-medium">Lina S.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Community
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <h4 className="text-xl font-semibold mb-3">Ready to get started?</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Browse current opportunities or create an account to post work.
        </p>
        <Link
          to="/allJobs"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Explore Jobs
        </Link>
      </section>
    </main>
  );
};

export default About;
