import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Youtube, Home, Info, MessageSquare, Menu, X, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <Youtube className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">ErolledDev</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 ease-in-out">
                  <Home className="inline-block w-5 h-5 mr-1" />
                  Home
                </Link>
                <Link to="/features" className="px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 ease-in-out">
                  <Info className="inline-block w-5 h-5 mr-1" />
                  Features
                </Link>
                <Link to="/contact" className="px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 ease-in-out">
                  <MessageSquare className="inline-block w-5 h-5 mr-1" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/80 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="inline-block w-5 h-5 mr-2" />
                Home
              </Link>
              <Link 
                to="/features" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="inline-block w-5 h-5 mr-2" />
                Features
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="inline-block w-5 h-5 mr-2" />
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 py-8">
        <Outlet />
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-red-600 transition-colors duration-300">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    YouTube API Docs
                  </a>
                </li>
                <li>
                  <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    Google AI Platform
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Tools</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://socialblade.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    Social Blade
                  </a>
                </li>
                <li>
                  <a href="https://vidiq.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    VidIQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:erolledph@gmail.com" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="https://github.com/erolled" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">© {currentYear} <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent font-semibold">ErolledDev</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};