import React from 'react';
import { AdPlatformCard } from './AdPlatformCard';
import { useDashboard } from '../contexts/DashboardContext';
import { CSVLink } from 'react-csv';

interface PaidAdsSectionProps {
  id: string;
  startDate: Date;
  endDate: Date;
}

export const PaidAdsSection: React.FC<PaidAdsSectionProps> = ({ id, startDate, endDate }) => {
  const { googleAds, metaAds } = useDashboard();

  const csvData = [
    { ...googleAds, platform: 'Google Ads', startDate: startDate.toISOString(), endDate: endDate.toISOString() },
    { ...metaAds, platform: 'Meta Ads', startDate: startDate.toISOString(), endDate: endDate.toISOString() },
  ];

  const headers = [
    { label: 'Platform', key: 'platform' },
    { label: 'Spend', key: 'spend' },
    { label: 'Impressions', key: 'impressions' },
    { label: 'Clicks', key: 'clicks' },
    { label: 'CTR', key: 'ctr' },
    { label: 'Start Date', key: 'startDate' },
    { label: 'End Date', key: 'endDate' },
  ];

  return (
    <section id={id} className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-100">Paid Ad Campaigns</h2>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`paid_ads_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}.csv`}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Export to CSV
        </CSVLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdPlatformCard platform="Google Ads" data={googleAds} />
        <AdPlatformCard platform="Meta Ads" data={metaAds} />
      </div>
    </section>
  );
};