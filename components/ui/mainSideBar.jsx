'use client';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './sidebarMain';
import {
  // IconArrowLeft,
  // IconBrandBooking,
  IconBrandTabler,
  IconCalendar,
  IconCalendarEvent,
  IconMusicBolt,
  IconSettings,
  // IconUserBolt,
} from '@tabler/icons-react';
import Link from 'next/link';
// import { motion } from "framer-motion";
// import Image from "next/image";
import { cn } from '@/lib/utils';
import { MdTask } from 'react-icons/md';
import TeamDropdown from '../shared/TeamDropdown';
import Image from 'next/image';


export default function Mainsidebar() {
  const links = [
    {
      label: 'Dashboard',
      href: '/maindashboard',
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Meetings',
      href: '/meetings/page',
      icon: (
        <IconMusicBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
   
    {
      label: "Create Events",
      href: "/events/page",
      icon: (
        <IconMusicBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
 {
      label: 'Calendar',
      href: '/calendar/page',
      icon: (
        <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Srumboard',
      href: '/board/index',
      icon: (
        <MdTask className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Chat",
      href: "/chat",
      icon: (
        <MdTask className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Task',
      href: '/task/layout',
      icon: (
        <IconMusicBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Drive',
      href: '/drive/page',
      icon: (
        <MdTask className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'AI',
      href: 'https://conferio-ai.vercel.app',
      icon: (
        <IconMusicBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Music',
      href: '/music/page',
      icon: (
        <IconMusicBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

     {
      label: "Docs",
      href: "/maindashboard",
      icon: (
        <MdTask  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
// {
//       label: "Members",
//       href: "/members/page",
//       icon: (
//         <MdTask  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
    // {
    //   label: "Contacts",
    //   href: "/contact/page",
    //   icon: (
    //     <MdTask  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Mail",
      href: "https://conferio-mail.vercel.app",
      icon: (
        <MdTask  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: '/settings/page',
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-950 overflow-hidden',
        'h-screen w-fit'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <TeamDropdown />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png"
        alt="logo"
        className="text-black bg-black p-1 rounded-md h-8 w-8"
        height={1000}
        width={1000}
      />
      <span className="dark:text-white text-black font-normal text-lg">
        Conferio
      </span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
    >
      <img
        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png"
        alt="logo"
        className="text-black p-1 bg-black rounded-md h-6 w-auto"
      />{' '}
    </Link>
  );
};
