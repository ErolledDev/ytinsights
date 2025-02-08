import React from 'react';
import { motion } from 'framer-motion';
import { Key, Youtube, Brain, Download, ChevronRight } from 'lucide-react';

export const Features = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Features & Setup Guide</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn how to get started with YT Analytics AI and make the most of its
          features.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Youtube className="w-6 h-6 mr-2 text-red-500" />
            Getting YouTube API Key
          </h2>
          <ol className="space-y-4 text-gray-500">
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>
                Go to the{' '}
                <a
                  href="https://console.cloud.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline"
                >
                  Google Cloud Console
                </a>
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>Create a new project or select an existing one</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>Enable the YouTube Data API v3</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>Create credentials (API key)</span>
            </li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-red-500" />
            Getting Gemini API Key
          </h2>
          <ol className="space-y-4 text-gray-500">
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>
                Visit the{' '}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline"
                >
                  Google AI Studio
                </a>
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>Sign in with your Google account</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 text-red-500" />
              <span>Get your API key from the API keys section</span>
            </li>
          </ol>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Channel Analytics</h3>
            <p className="text-gray-500">
              Comprehensive metrics including subscribers, views, engagement
              rates, and estimated earnings.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">AI Analysis</h3>
            <p className="text-gray-500">
              In-depth AI-powered analysis of content strategy, growth
              potential, and recommendations.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">PDF Reports</h3>
            <p className="text-gray-400">
              Downloadable reports with detailed insights and visualizations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
