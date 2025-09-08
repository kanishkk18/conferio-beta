import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSession } from "next-auth/react";


interface DashboardHeaderProps {
  name: string;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  const session = useSession();

  return (
    <div className={cn("flex flex-col gap-1")}>
      <h1 className="text-3xl font-bold">Hello! {session.data?.user?.name ?? ''}</h1>
      <div className="flex space-x-6 mt-2">
        <Link href="/maindashboard">
          <button className="text-white border-b-2 border-white font-medium">Dashboard</button>
        </Link>
        <Link href="/calendar/page">
          <button className="text-gray-400">Calendar</button>
        </Link>
        <Link href="/board/index">
          <button className="text-gray-400">Scrumboard</button>
        </Link>
        <Link href="/chat">
          <button className="text-gray-400">Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
