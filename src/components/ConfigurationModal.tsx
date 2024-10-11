import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';

interface ConfigurationModalProps {
  onClose: () => void;
}

export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ onClose }) => {
  const { updateConfiguration } = useDashboard();
  const [config, setConfig] = useState({
    facebookAccessToken: '',
    instagramAccessToken: '',
    googleAdsClientId: '',
    googleAdsClientSecret: '',
    metaAdsAccessToken: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfiguration(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Configure Accounts</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="Facebook Access Token"
              name="facebookAccessToken"
              value={config.facebookAccessToken}
              onChange={handleChange}
            />
            <InputField
              label="Instagram Access Token"
              name="instagramAccessToken"
              value={config.instagramAccessToken}
              onChange={handleChange}
            />
            <InputField
              label="Google Ads Client ID"
              name="googleAdsClientId"
              value={config.googleAdsClientId}
              onChange={handleChange}
            />
            <InputField
              label="Google Ads Client Secret"
              name="googleAdsClientSecret"
              value={config.googleAdsClientSecret}
              onChange={handleChange}
            />
            <InputField
              label="Meta Ads Access Token"
              name="metaAdsAccessToken"
              value={config.metaAdsAccessToken}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);