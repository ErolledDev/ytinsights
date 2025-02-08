import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <div className="flex justify-center mb-8">
            <Shield className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <div className="prose prose-red max-w-none">
          <h2>1. Terms</h2>
          <p>
            By accessing YT Analytics AI, you agree to be bound by these terms of service and agree that
            you are responsible for compliance with any applicable local laws.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use YT Analytics AI for personal, non-commercial
            purposes only. This is the grant of a license, not a transfer of title, and under this
            license you may not:
          </p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose</li>
            <li>attempt to decompile or reverse engineer any software contained in YT Analytics AI</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on YT Analytics AI are provided on an 'as is' basis. We make no warranties,
            expressed or implied, and hereby disclaim and negate all other warranties including, without
            limitation, implied warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall YT Analytics AI or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use YT Analytics AI.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on YT Analytics AI could include technical, typographical, or
            photographic errors. We do not warrant that any of the materials on the website are
            accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            We have not reviewed all of the sites linked to YT Analytics AI and are not responsible
            for the contents of any such linked site. The inclusion of any link does not imply
            endorsement by us of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>7. Modifications</h2>
          <p>
            We may revise these terms of service at any time without notice. By using YT Analytics AI,
            you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>8. Contact</h2>
          <p>
            For any questions regarding these terms, please contact us at{' '}
            <a href="mailto:erolledph@gmail.com">erolledph@gmail.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};