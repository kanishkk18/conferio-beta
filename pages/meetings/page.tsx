'use client';

import Navigation from '@/components/ui/overviewNavigation';
import StatsCard from '@/components/ui/StatsCard';
import CircularProgress from '@/components/ui/CircularProgress';
import { Calendar } from '@/components/ui/OverviewCalendar';
import ChartCard from '@/components/ui/ChartCard';
import {
  ArrowRightIcon,
  ArrowUpRight,
  ArrowUpRightIcon,
  Edit2,
} from 'lucide-react';
import Mainsidebar from '@/components/ui/mainSideBar';
import Link from 'next/link';
import Image from 'next/image';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format, parseISO } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const Meetings = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('UPCOMING');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const defaultClassNames = getDefaultClassNames();

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const { data: meetings, isLoading } = useQuery({
    queryKey: ['meetings', filter],
    queryFn: async () => {
      const response = await fetch(`/api/meeting/user/all?filter=${filter}`);
      if (!response.ok) throw new Error('Failed to fetch meetings');
      return response.json();
    },
    enabled: !!session,
  });

  const cancelMeetingMutation = useMutation({
    mutationFn: async (meetingId: string) => {
      const response = await fetch(`/api/meeting/cancel/${meetingId}`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to cancel meeting');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen flex dark:bg-black">
      <Mainsidebar />

      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full w-full md:min-w-[450px]"
      >
        <div className="absolute w-full max-w-[96%] mx-auto py-1 px-6">
          <Navigation />
        </div>
        <ResizablePanel
          defaultSize={50}
          className="pt-28 p-4 dark:bg-[#060606]"
        >
          <div className="flex w-full gap-4 mt-8">
            <div className="">
              <div className=" w-fit flex gap-4 ">
                <div className="col-span-2">
                  <div className="bg-neutral-900 px-6 p-6 rounded-xl flex items-center justify-center h-full">
                    <CircularProgress percentage={70} />
                  </div>
                </div>
                <div className="col-span-2">
                  <StatsCard
                    title="Currently Book"
                    value={meetings?.meetings?.length || 0}
                    color="purple"
                  />
                </div>
              </div>

              <div className=" gap-4 mt-3 min-h-full">
                <div className="col-span-4 ">
                  <div className="green-card p-5 h-[158px] relative overflow-hidden ">
                    <div className="absolute inset-0">
                      <svg width="100%" height="100%" className="opacity-10">
                        <pattern
                          id="pattern-zigzag"
                          width="30"
                          height="30"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0 15 L15 0 L30 15 L15 30 Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                          />
                        </pattern>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#pattern-zigzag)"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10 ">
                      <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-semibold text-white -mt-2 mb-2 z-50 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.6)]">
                          Schedule <br /> a meeting
                        </h3>
                        <img
                          className="rounded-t-[2.9rem] absolute -right-24"
                          src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1747576462/CONFERIO/evmztakxitrunclugusx.png"
                          alt=""
                        />
                      </div>
                      <Link href="/calendar/page">
                        <Button
                          variant="secondary"
                          className="text-sm px-2 py-1 mt-2"
                        >
                          Do it now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ChartCard />

            <div className="flex w-[22%] flex-col gap-4">
              <div className=" h-full ">
                <div className="px-4 py-2 flex bg-red-500 justify-between rounded-xl h-full flex-col">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold [text-shadow:_2px_2px_4px_rgba(0,0,0,0.6)]">
                      My recordings
                    </h1>
                    <span className="text-sm text-white bg-black/70 rounded-full p-1">
                      <ArrowUpRight className="h-5 w-5" />{' '}
                    </span>
                  </div>
                  <div className="flex text-center justify-between  items-center">
                    <div className="font-bold text-2xl text-white">10</div>
                    <div className="overflow-hidden h-12 w-12 flex justify-center items-center rounded-full ">
                      <Image
                        height={1000}
                        width={1000}
                        className="h-full w-full object-cover"
                        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1747587960/CONFERIO/i8p54hqyfxgndcw2lkbt.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" h-full ">
                {meetings?.meetings?.length > 0 ? (
                  <div className="px-4 py-2 gap-4 flex bg-blue-500 rounded-xl h-full flex-col">
                    {meetings.meetings.slice(0, 1).map((meeting: any) => (
                      <div className="space-y-4">
                        <div className="flex flex-col justify-start items-start">
                          <h1 className="text-lg font-semibold [text-shadow:_1px_1px_4px_rgba(0,0,0,0.6)]">
                            {meeting.event.title.slice(0, 12)}
                          </h1>
                          <p className="text-sm font-semibold text-white">
                            {(() => {
                              const now = new Date();
                              const diffMs =
                                parseISO(meeting.startTime).getTime() -
                                now.getTime();
                              if (diffMs > 0) {
                                const diffSec = Math.ceil(diffMs / 1000);
                                const diffMin = Math.ceil(diffSec / 60);
                                const diffHour = Math.ceil(diffMin / 60);
                                const diffDay = Math.ceil(diffHour / 24);
                                if (diffDay > 1) {
                                  return `${diffDay} Days left`;
                                } else if (diffHour > 1) {
                                  return `${diffHour} Hours left`;
                                } else if (diffMin > 1) {
                                  return `${diffMin} Min left`;
                                } else {
                                  return `${diffSec} Sec left`;
                                }
                              } else if (diffMs > -60000) {
                                return 'Now';
                              } else {
                                return 'Started';
                              }
                            })()}
                          </p>
                        </div>
                        <Separator className=" bg-white w-[5vw]" />

                        <div className="flex text-center justify-between w-full items-end">
                          <div
                            className="group relative"
                            key={meeting.guestName}
                            onMouseEnter={() => setHoveredIndex(meeting.id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <AnimatePresence mode="popLayout">
                              {hoveredIndex === meeting.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                      type: 'spring',
                                      stiffness: 260,
                                      damping: 10,
                                    },
                                  }}
                                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                  style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: 'nowrap',
                                  }}
                                  className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                                >
                                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                  <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                  <div className="relative z-30 text-base font-bold text-white">
                                    {meeting.guestName}
                                  </div>
                                  <div className="text-xs text-white">
                                    {meeting.guestEmail}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <Image
                              onMouseMove={handleMouseMove}
                              height={100}
                              width={100}
                              src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=3534&q=80"
                              alt={meeting.guestName}
                              className="relative !m-0 h-10 w-10 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
                            />
                          </div>

                          <div
                            onClick={() =>
                              window.open(meeting.meetLink, '_blank')
                            }
                            className="text-sm text-white bg-black/70 rounded-full"
                          >
                            <ArrowUpRight className="h-7 w-7 p-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      No {filter.toLowerCase()} meetings
                    </h2>
                    <p className="text-muted-foreground">
                      {filter === 'UPCOMING'
                        ? "You don't have any upcoming meetings scheduled."
                        : `No ${filter.toLowerCase()} meetings found.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="min-w-full w-full gap-6 mt-2">
            <div className="flex justify-between items-center py-4 px-2">
              <h3 className="text-2xl font-semibold ">Active Bookings</h3>

              <Link
                href="/bookings/page"
                className="flex justify-center items-center gap-2"
              >
                <Button
                  variant="link"
                  className="text-sm text-blue-500 hover:underline p-0"
                >
                  View All
                </Button>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {meetings?.meetings?.length > 0 ? (
              <div className="flex gap-4 h-full w-full">
                {meetings.meetings.slice(0, 2).map((meeting: any) => (
                  <div className=" flex  space-x-2 w-full h-full justify-center">
                    <div className="p-4  flex-grow bg-[#F4F4F5] dark:bg-[#101012] rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="dark:text-white font-semibold text-md mb-2">
                            {meeting.event.title}
                          </h4>
                          <p className="dark:text-gray-400 text-xs">
                            {format(meeting.startTime, 'h:mm a')} -{' '}
                            {format(meeting.endTime, 'h:mm a')}
                          </p>
                        </div>
                        {filter === 'UPCOMING' && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Switch
                                onClick={() =>
                                  cancelMeetingMutation.mutate(meeting.id)
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent className="">
                              <p>Click to Cancel </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      <div className="mt-3 flex justify-between">
                        <div className="gap-2 flex flex-col justify-start items-start">
                          <div className="text-xs text-yellow-500 bg-black/20 p-2 px-3 rounded-xl">
                            Team
                          </div>
                          <div className="flex flex-row items-start justify-start w-full">
                            <div
                              className="group relative -mr-4"
                              key={meeting.guestName}
                              onMouseEnter={() => setHoveredIndex(meeting.id)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            >
                              <AnimatePresence mode="popLayout">
                                {hoveredIndex === meeting.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                      scale: 1,
                                      transition: {
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 10,
                                      },
                                    }}
                                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                    style={{
                                      translateX: translateX,
                                      rotate: rotate,
                                      whiteSpace: 'nowrap',
                                    }}
                                    className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                                  >
                                    <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                    <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                    <div className="relative z-30 text-base font-bold text-white">
                                      {meeting.guestName}
                                    </div>
                                    <div className="text-xs text-white">
                                      {meeting.guestEmail}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <Image
                                onMouseMove={handleMouseMove}
                                height={100}
                                width={100}
                                src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=3534&q=80"
                                alt={meeting.guestName}
                                className="relative !m-0 h-10 w-10 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center items-end gap-2">
                          <div className=" p-2 bg-black/75 dark:bg-white rounded-full">
                            <Edit2 className="h-4 text-white dark:text-black w-4" />
                          </div>

                          <Tooltip>
                            <TooltipTrigger className=" p-2 bg-yellow-400 dark:bg-blue-500 rounded-full">
                              <div
                                onClick={() =>
                                  window.open(meeting.meetLink, '_blank')
                                }
                              >
                                <ArrowUpRightIcon className="h-4 font-bold text-white w-4" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-white">
                                click to join meeting{' '}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  No {filter.toLowerCase()} meetings
                </h2>
                <p className="text-muted-foreground">
                  {filter === 'UPCOMING'
                    ? "You don't have any upcoming meetings scheduled."
                    : `No ${filter.toLowerCase()} meetings found.`}
                </p>
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle className="dark:bg-neutral-900 h-screen w-[1px]" />
        <ResizablePanel defaultSize={27} className='mx-auto'>
              <Calendar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};



export default Meetings;
