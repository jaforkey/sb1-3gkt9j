import React from 'react';
import { SocialMediaAccount } from '../types';
import { Facebook, Instagram, Users, ThumbsUp, MessageCircle, Eye } from 'lucide-react';

interface AccountCardProps {
  account: SocialMediaAccount;
  platform: 'Facebook' | 'Instagram';
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, platform }) => {
  const PlatformIcon = platform === 'Facebook' ? Facebook : Instagram;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-2">
        <PlatformIcon className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">{account.name}</h3>
      </div>
      <div className="space-y-2">
        <MetricItem icon={Users} label="Followers" value={account.followers} />
        <MetricItem icon={ThumbsUp} label="Likes" value={account.likes} />
        <MetricItem icon={MessageCircle} label="Comments" value={account.comments} />
        <MetricItem icon={Eye} label="Views" value={account.views} />
      </div>
    </div>
  );
};

const MetricItem: React.FC<{ icon: React.ElementType; label: string; value: number }> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Icon className="mr-1 w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="font-semibold">{value.toLocaleString()}</span>
  </div>
);