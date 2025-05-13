
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-library-navy text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-library-gold mb-4">
              LibraryHub
            </h3>
            <p className="text-sm text-gray-300">
              A modern library management system for the digital age.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-library-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-library-gold mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-library-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} LibraryHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
