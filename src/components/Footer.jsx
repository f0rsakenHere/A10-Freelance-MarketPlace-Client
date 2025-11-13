import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          © {currentYear} ProgrammingHero Student. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
