import React from 'react';
import { AdPlatformData } from '../types';
import { DollarSign, Users, MousePointer, BarChart } from 'lucide-react';

interface AdPlatformCardProps {
  platform: string;
  data: AdPlatformData;
}

export const AdPlatformCard: React.FC<AdPlatformCardProps> = ({ platform, data }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">{platform}</h3>
      <div className="grid grid-cols-2 gap-4">
        <MetricItem icon={DollarSign} label="Spend" value={`$${data.spend.toFixed(2)}`} />
        <MetricItem icon={Users} label="Impressions" value={data.impressions.toLocaleString()} />
        <MetricItem icon={MousePointer} label="Clicks" value={data.clicks.toLocaleString()} />
        <MetricItem icon={BarChart} label="CTR" value={`${(data.ctr * 100).toFixed(2)}%`} />
      </div>
    </div>
  );
};

const MetricItem: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex flex-col items-center">
    <Icon className="mb-1 w-6 h-6 text-gray-300" />
    <span className="text-sm text-gray-400">{label}</span>
    <span className="font-semibold text-gray-100">{value}</span>
  </div>
);