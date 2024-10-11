import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ConfigurationModal } from './components/ConfigurationModal';
import { DashboardProvider } from './contexts/DashboardContext';

function App() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <DashboardProvider>
      <Layout>
        <Dashboard />
        <button
          onClick={() => setIsConfigOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Configure Accounts
        </button>
        {isConfigOpen && <ConfigurationModal onClose={() => setIsConfigOpen(false)} />}
      </Layout>
    </DashboardProvider>
  );
}

export default App;