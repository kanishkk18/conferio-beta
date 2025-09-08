'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Clock, EllipsisIcon, User, Video, X } from 'lucide-react';
import { format } from 'date-fns';
import { ArrowRight, Search } from 'lucide-react';
import Mainsidebar from '@/components/ui/mainSideBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Fragment } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Loader } from '@/components/loader';
import { MapPin, MessageSquare, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from '@/components/ui/expandable';
import {
  BoltIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  FilesIcon,
  Layers2Icon,
  TrashIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';

export default function Meetings() {
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
    <div className="flex flex-col !gap-3">
      <div className="flex w-full h-full dark:bg-black ">
        <Mainsidebar />
        <div className="flex flex-col w-full h-full p-6 px-12">
          <Tabs
            defaultValue="modern"
            className=" h-full w-full "
          >
            <div className=" py-3  flex justify-between w-full ">
              <div className="flex flex-col">
                <div className="text-2xl font-semibold">Schedule</div>
                <div className="text-sm font-medium">
                  <p>
                    Here are your bookings to scheduled by the people on your
                    calendar.
                  </p>
                </div>
              </div>
              <TabsList>
                <TabsTrigger value="modern">
                  Modern View
                </TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>
            <div className="w-full py-6 flex justify-between items-center ">
              <div className="w-[20%]">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      className="peer pe-9 ps-9"
                      placeholder="Search..."
                      type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Search size={16} strokeWidth={2} />
                    </div>
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Submit search"
                      type="submit"
                    >
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'UPCOMING' ? 'default' : 'outline'}
                  onClick={() => setFilter('UPCOMING')}
                >
                  Upcoming
                </Button>
                <Button
                  variant={filter === 'PAST' ? 'default' : 'outline'}
                  onClick={() => setFilter('PAST')}
                >
                  Past
                </Button>
                <Button
                  variant={filter === 'CANCELLED' ? 'default' : 'outline'}
                  onClick={() => setFilter('CANCELLED')}
                >
                  Cancelled
                </Button>
              </div>
            </div>

            <TabsContent
              value="modern"
              className="w-full flex flex-wrap justify-start items-center"
            >
              {meetings.meetings.map((meeting: any) => (
                <Expandable
                  expandDirection="both"
                  expandBehavior="push"
                  initialDelay={0.2}
                  onExpandStart={() => console.log('Expanding meeting card...')}
                  onExpandEnd={() => console.log('Meeting card expanded!')}
                  key={meeting.id}
                >
                  {({ isExpanded }) => (
                    <ExpandableTrigger>
                      <ExpandableCard
                        className="w-full"
                        collapsedSize={{ width: 305, height: 240 }}
                        expandedSize={{ width: 420, height: 480 }}
                        hoverToExpand={false}
                        expandDelay={200}
                        collapseDelay={500}
                      >
                        <ExpandableCardHeader>
                          <div className="flex justify-between items-start w-full">
                            <div>
                              <Badge
                                variant="secondary"
                                className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 mb-2"
                              >
                                {meeting.event.duration} min{' '}
                              </Badge>
                              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                                {meeting.event.title.slice(0, 12)}
                              </h3>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                  >
                                    <Calendar className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add to Calendar</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </ExpandableCardHeader>

                        <ExpandableCardContent>
                          <div className="flex flex-col items-start justify-between mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <Clock className="h-4 w-4 mr-1" />
                              {format(meeting.startTime, 'h:mm a')} -{' '}
                              {format(meeting.endTime, 'h:mm a')}
                            </div>

                            <ExpandableContent preset="blur-md">
                              <div className="flex items-center pt-1 text-sm text-gray-600 dark:text-gray-300">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="flex">
                                  <>
                                    {/* <Image 
                            height={1000}
                            width={1000}
                              src={locationOption?.logo as string}
                              alt={locationOption?.label}
                              className="w-5 h-5 mr-2"
                            /> */}
                                    <span className=" font-normal text-xs">
                                      {meeting.event.locationType}
                                    </span>
                                  </>
                                </span>
                              </div>
                            </ExpandableContent>
                          </div>
                          <ExpandableContent
                            preset="blur-md"
                            stagger
                            staggerChildren={0.2}
                          >
                            <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                              {meeting.additionalInfo ? (
                                meeting.additionalInfo
                              ) : (
                                <Fragment>
                                  <span className="block font-light text-sm mb-1 dark:text-white text-[rgba(26,26,26,0.61)]">
                                    Nothing to share about the meeting.
                                  </span>
                                </Fragment>
                              )}
                            </p>
                            <div className="mb-4">
                              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                Attendees:
                              </h4>
                              <div className="flex -space-x-2">
                                <div
                                  className="group relative -mr-4 z-50"
                                  key={meeting.guestName}
                                  onMouseEnter={() =>
                                    setHoveredIndex(meeting.id)
                                  }
                                  onMouseLeave={() => setHoveredIndex(null)}
                                >
                                  <AnimatePresence mode="popLayout">
                                    {hoveredIndex === meeting.id && (
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          y: 20,
                                          scale: 0.6,
                                        }}
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
                                        className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2  text-xs shadow-xl"
                                      >
                                        <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                        <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                        <div className="relative z-50 text-base font-bold text-white">
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
                            <div className="space-y-2">
                              {meeting.meetLink && filter === 'UPCOMING' && (
                                <Button
                                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() =>
                                    window.open(meeting.meetLink, '_blank')
                                  }
                                >
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Meeting
                                </Button>
                              )}

                              <div className="flex items-center justify-center gap-2 w-full">
                                {isExpanded && (
                                  <Link href="/chat" className="w-full">
                                    <Button
                                      variant="outline"
                                      className="w-full dark:text-black dark:bg-white"
                                    >
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Open Chat
                                    </Button>
                                  </Link>
                                )}

                                {filter === 'UPCOMING' && (
                                  <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full dark:text-black dark:bg-white"
                                    onClick={() =>
                                      cancelMeetingMutation.mutate(meeting.id)
                                    }
                                    disabled={cancelMeetingMutation.isPending}
                                  >
                                    {meeting.isPending ? (
                                      <Loader color="black" />
                                    ) : (
                                      <Fragment>
                                        <Trash2Icon />
                                        <span>Cancel</span>
                                      </Fragment>
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </ExpandableContent>
                        </ExpandableCardContent>
                        <ExpandableCardFooter>
                          <div className="flex items-center gap-5 justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                            <span
                              className={` px-2 py-1 rounded-full text-xs ${
                                meeting.status === 'SCHEDULED'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {meeting.status}
                            </span>
                            <span>
                              Next :{' '}
                              {format(meeting.startTime, 'EE, d MMM yyyy')}
                            </span>
                          </div>
                        </ExpandableCardFooter>
                      </ExpandableCard>
                    </ExpandableTrigger>
                  )}
                </Expandable>
              ))}
            </TabsContent>

            <TabsContent value="table">
              <div className="w-full py-4">
                {meetings?.meetings?.length > 0 ? (
                  <div className="flex flex-col divide-y divide-border dark:hover:bg-black/40 rounded-lg border dark:border-neutral-800 w-full shadow-sm">
                    <div className="p-3 rounded-t-lg bg-gray-200 dark:bg-neutral-900 px-5 uppercase font-semibold text-sm">
                      Next
                    </div>
                    {meetings.meetings.map((meeting: any) => (
                      <Card
                        key={meeting.id}
                        className="rounded-lg flex w-full justify-between items-center bg-transparent border-none shadow-none dark:hover:bg-black/40 transition"
                      >
                        <div className="flex justify-start gap-20 items-center flex-grow">
                          <CardHeader className="space-y-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              {format(
                                new Date(meeting.startTime),
                                'EEE, dd MMM '
                              )}
                            </CardTitle>
                            <CardDescription className=" flex flex-col sm:flex-row sm:items-center gap-3">
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                {format(meeting.startTime, 'h:mm a')} -{' '}
                                {format(meeting.endTime, 'h:mm a')}
                              </span>
                            </CardDescription>
                            <Button
                              className="bg-transparent"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(meeting.meetLink, '_blank')
                              }
                            >
                              <Video className="w-4 h-4 mr-1" />
                              Join Meeting
                            </Button>
                          </CardHeader>

                          <CardContent className="px-4 ">
                            <div className="space-y-2">
                              <h1 className="text-md font-semibold dark:text-white">
                                {meeting.event.title} between{' '}
                                {session?.user.name} and {meeting.guestName}
                              </h1>

                              {meeting.additionalInfo && (
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {meeting.additionalInfo}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </div>
                        <CardFooter className="flex flex-grow justify-end items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="bg-transparent hover:bg-muted/30 p-1 px-2.5 dark:border-neutral-600 rounded-lg"
                              >
                                <EllipsisIcon
                                  className=" opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-6">
                              <DropdownMenuLabel>Label</DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <CopyPlusIcon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                  />
                                  Copy
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BoltIcon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                  />
                                  Edit
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Label</DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <Layers2Icon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                  />
                                  Group
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    cancelMeetingMutation.mutate(meeting.id)
                                  }
                                  disabled={cancelMeetingMutation.isPending}
                                >
                                  <TrashIcon size={16} aria-hidden="true" />
                                  Cancel
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
