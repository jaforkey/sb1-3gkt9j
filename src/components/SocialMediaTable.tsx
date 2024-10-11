import React from 'react';
import { SocialMediaAccount } from '../types';
import { CSVLink } from 'react-csv';

interface SocialMediaTableProps {
  platform: 'Facebook' | 'Instagram';
  accounts: SocialMediaAccount[];
  startDate: Date;
  endDate: Date;
}

export const SocialMediaTable: React.FC<SocialMediaTableProps> = ({
  platform,
  accounts,
  startDate,
  endDate,
}) => {
  const headers = [
    { label: 'Account Name', key: 'name' },
    { label: 'Followers', key: 'followers' },
    { label: 'Likes', key: 'likes' },
    { label: 'Comments', key: 'comments' },
    { label: 'Views', key: 'views' },
  ];

  const csvData = accounts.map((account) => ({
    ...account,
    platform,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }));

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-100">{platform} Accounts</h2>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`${platform.toLowerCase()}_accounts_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}.csv`}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Export to CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{account.followers.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{account.likes.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{account.comments.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{account.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};