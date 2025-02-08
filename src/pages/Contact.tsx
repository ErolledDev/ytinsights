import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-500">
          Have questions about YT Analytics AI? Want to use it for commercial
          purposes? We'd love to hear from you!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 space-y-6"
      >
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <a
              href="mailto:erolledph@gmail.com?subject=YouTube%20Analytics%20Project"
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              erolledph@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Github className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold">GitHub</h2>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              View project repository
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Linkedin className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold">LinkedIn</h2>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              Connect with us
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Usage Terms</h2>
        <ul className="space-y-2 text-gray-500">
          <li>• Free for personal use</li>
          <li>• Commercial use requires prior permission</li>
          <li>• Modifications need approval</li>
          <li>• Contact us for licensing details</li>
        </ul>
      </motion.div>
    </div>
  );
};
