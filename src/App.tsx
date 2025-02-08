import React from 'react';
import { PWAPrompt } from './components/PWAPrompt';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <p className="text-lg text-gray-600 font-medium">Start prompting (or editing) to see magic happen :)</p>
      <PWAPrompt />
    </div>
  );
}

export default App;