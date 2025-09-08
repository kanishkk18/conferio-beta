import React from 'react';
import UserAvatar from "@/components/ui/comp-377"
import DashboardHeader from './overviewHeader';
import { ThemeToggle } from './ThemeToggle';
import DynamicIslandDemo from './DynamicIslandDemo';

const Navigation: React.FC = () => {
  return (
    <div className="flex items-start justify-between py-4 px-2">
      <div className="flex items-center">
      <DashboardHeader name="" />

      </div>
      
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Reports"
          className="bg-dashboard-darkcard text-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-sm w-40 focus:outline-none"
        />
        <svg
          className="absolute top-2 left-3 w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* <DynamicIslandDemo/> */}
      
      {/* User info */}
      {/* <ThemeToggle/> */}

        <UserAvatar />
        
     
    </div>
  );
};

export default Navigation;
