import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright Text */}
          <div className="text-sm text-gray-600">
            © {currentYear} ShopWave. All rights reserved.
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/terms-of-service"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/cookies-settings"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
