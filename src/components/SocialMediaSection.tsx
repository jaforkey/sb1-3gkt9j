import React from 'react';
import { AccountCard } from './AccountCard';
import { SocialMediaAccount } from '../types';

interface SocialMediaSectionProps {
  id: string;
  platform: 'Facebook' | 'Instagram';
  accounts: SocialMediaAccount[];
}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  id,
  platform,
  accounts,
}) => {
  return (
    <section id={id} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">{platform} Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} platform={platform} />
        ))}
      </div>
    </section>
  );
};