'use client';

import * as React from 'react';
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavSecondary } from './nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const datas = {
  
  navMain: [
    {
      title: 'Documents',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Image',
          url: '#',
        },
        {
          title: 'Video',
          url: '#',
        },
        {
          title: 'Audio',
          url: '#',
        },
      ],
    },
    {
      title: 'Archives',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
  ],

  projects: [
    {
      name: 'Dashboard',
      url: '/maindashboard',
      icon: Frame,
    },
    {
      name: 'Meetings',
      url: '/meetings/page',
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/user');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
  });

  const analytics = data || {};
  const storage = analytics.storageUsageSummary || {};
  const usagePercentage =
    storage.quota > 0 ? (storage.totalUsage / storage.quota) * 100 : 0;

  return (
    <Sidebar variant="inset" className="bg-transparent h-full" {...props}>
      <SidebarHeader className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-0">
        <NavProjects projects={datas.projects} />
        <NavMain items={datas.navMain} />
        
      </SidebarContent>
      <SidebarFooter className="px-0 ">
         <Badge className='w-fit dark:bg-[#0C0A09] -mb-2 rounded-b-none p-0 px-4 dark:text-neutral-500 text-md text-black shadow hover:bg-[#ffffff] bg-[#ffffff] '>
          {analytics.totaluploadFilesForPeriod || 0}
        </Badge>
         <Card className='dark:bg-[#404040] bg-[#E5E5E5] rounded-xl shadow-none border-none px-0 h-fit'>
          
        <Card className=" border-none rounded-tl-none w-full z-50">
          <CardContent className="w-full dark:bg-[#0C0A09] space-y-3 py-3 px-3 rounded-lg ">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">
                Storage Used
              </CardTitle>
              <p className="text-sm text-neutral-400 font-medium">
                {usagePercentage.toFixed(1)}% Used
              </p>
            </div>

            <div className="">
              <Progress value={usagePercentage} className="h-2 max-w-full dark:bg-[#383635]" />
            </div>
          </CardContent>
        </Card>
       <CardContent className='w-full p-1.5 px-3 flex light:text-[#737373]'>
             <div className="text-sm font-semibold ">
              {storage.formattedTotalUsage || '0B'}  of  {storage.formattedQuota || '4GB'}
            </div>
           
          </CardContent>
        </Card>
        <NavSecondary  className="px-0" />
        
      </SidebarFooter>
    </Sidebar>
  );
}
