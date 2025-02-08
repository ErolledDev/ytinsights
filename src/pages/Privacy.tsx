import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <div className="flex justify-center mb-8">
            <Lock className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <div className="prose prose-red max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            When using YT Analytics AI, we collect and process the following information:
          </p>
          <ul>
            <li>YouTube channel data through the YouTube Data API v3</li>
            <li>Analysis results generated through the Google Gemini API</li>
            <li>API keys provided by users (not stored)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Generate analytics reports</li>
            <li>Provide AI-powered insights</li>
            <li>Improve our services</li>
            <li>Generate downloadable PDF reports</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            We implement security measures to maintain the safety of your information:
          </p>
          <ul>
            <li>API keys are never stored</li>
            <li>Data is processed in real-time</li>
            <li>No personal information is retained</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            We use the following third-party services:
          </p>
          <ul>
            <li>YouTube Data API v3</li>
            <li>Google Gemini API</li>
          </ul>
          <p>
            Each service has its own Privacy Policy and Terms of Service that you should review.
          </p>

          <h2>5. Your Data Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your data</li>
            <li>Delete your data</li>
            <li>Object to data processing</li>
            <li>Export your data</li>
          </ul>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:erolledph@gmail.com">erolledph@gmail.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};