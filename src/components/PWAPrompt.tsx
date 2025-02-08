import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 z-50 border border-gray-200/50"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Install App</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get quick access to YouTube analytics on your device with our installable app
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Now
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="ml-4 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};