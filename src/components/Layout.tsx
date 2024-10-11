import React, { ReactNode } from 'react';
import { LayoutGrid, Facebook, Instagram, DollarSign } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900">
      <nav className="w-64 bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <LayoutGrid className="mr-2" /> Dashboard
          </h1>
        </div>
        <ul className="mt-4">
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#facebook" className="flex items-center text-gray-300">
              <Facebook className="mr-2" /> Facebook
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#instagram" className="flex items-center text-gray-300">
              <Instagram className="mr-2" /> Instagram
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#paid-ads" className="flex items-center text-gray-300">
              <DollarSign className="mr-2" /> Paid Ads
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};