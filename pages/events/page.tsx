'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { Clock, Ellipsis } from 'lucide-react';
// import { toast } from 'sonner';
import { ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from 'react-daisyui';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Mainsidebar from '@/components/ui/mainSideBar';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import UserAvatar from '@/components/ui/comp-377';
import CreateEvent from './create/page';
import {
  BoltIcon,
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
import EditEvent from './update/index';
import { Separator } from '@/components/ui/separator';
import UsernameSetup from '@/components/UsernameSetup';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Events() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const {
    data: events,
    isLoading,
    data,
  } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/event/all');
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
    enabled: !!session,
  });

  const togglePrivacyMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await fetch('/api/event/toggle-privacy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });
      if (!response.ok) throw new Error('Failed to toggle privacy');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
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

  const handleCopy = async (event: any) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${events?.data?.username}/${event.slug}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleUserNameCopy = async (event: any) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${events?.data?.username}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex w-full full max-h-screen dark:bg-[#0F0F0F] !overflow-hidden">
      <Mainsidebar />
      <ScrollArea className="flex w-full flex-col px-8 py-2 gap-8 overflow-auto">
        <div className="w-full flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-between w-full p-[12px_0_8px] gap-3">
            <div className="flex flex-col">
              <div className="flex">
                <span className="block max-w-[340px] capitalize whitespace-nowrap overflow-hidden truncate line-clamp-1 text-xl font-semibold">
                  Event Types
                </span>
              </div>
              <div className="font-normal text-sm pt-1">
                Create events to share for people to book on your calendar.
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex justify-end items-end flex-col">
                <div className="flex">
                  <span className="block text-end max-w-[340px] capitalize whitespace-nowrap overflow-hidden truncate line-clamp-1 text-sm font-normal">
                    {session?.user?.name}
                  </span>
                </div>
                <div className="flex">
                  <div className="flex justify-center items-center gap-1">
                    <Link
                      href={`${window.location.origin}/${events.data.username}`}
                      className="text-[#004eba] flex justify-center gap-1 items-center text-center whitespace-nowrap 
                   overflow-hidden hover:underline truncate font-sans line-clamp-1 text-sm dark:text-gray-300 font-medium"
                    >
                      <span className="">View Booking Page</span>
                      <ExternalLink className="h-5 w-5 dark:text-blue-500" />
                    </Link>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="disabled:opacity-100 shadow-none p-0 border-none bg-transparent overflow-hidden"
                            onClick={handleUserNameCopy}
                            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                            disabled={copied}
                          >
                            <div
                              className={cn(
                                ' absolute transition-all',
                                copied
                                  ? 'scale-100 opacity-100 p-0'
                                  : 'scale-0 opacity-0'
                              )}
                            >
                              <CheckIcon
                                className="stroke-emerald-500"
                                size={16}
                                aria-hidden="true"
                              />
                            </div>
                            <div
                              className={cn(
                                'transition-all',
                                copied
                                  ? 'scale-0 opacity-0 p-0'
                                  : 'scale-100 opacity-100'
                              )}
                            >
                              <CopyIcon size={16} aria-hidden="true" />
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="px-2 py-1 text-xs">
                          Click to copy
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <UsernameSetup />
                  </div>
                </div>
              </div>
              <div className="w-[54px] h-[54px] flex items-center justify-center">
                <UserAvatar />
              </div>
            </div>
          </div>

          {/* Create Event */}
          <div className="flex items-center justify-between w-full py-4 ">
            <div className="relative">
              <Input
                className="peer pe-20 ps-9 dark:border-neutral-700"
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
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <CreateEvent />
          </div>
        </div>

        <div className="w-full rounded-md overflow-hidden shadow-none border-none dark:border-neutral-700">
          {events?.data?.events?.length > 0 ? (
            <div className="">
              {events.data.events.map((event: any) => (
                <Card
                  key={event.id}
                  className={cn(
                    `rounded-none bg-transparent shadow-none border-b-[0px] dark:border-neutral-700 p-3 px-5 flex items-center justify-between`,
                    event.isPrivate && 'bg-transparent'
                  )}
                >
                  <CardContent className="relative flex p-0 shadow-none">
                    <div
                      className={cn(
                        ` `,
                        event.isPrivate && 'bg-[rgb(178,178,178)]'
                      )}
                    ></div>

                    {/* {Event details} */}
                    <div className="w-full gap-2 flex flex-col">
                      <div className="flex justify-end items-end text-end">
                        <h2
                          className={cn(
                            `text-md flex justify-center items-center font-semibold dark:text-neutral-300`,
                            event.isPrivate && 'text-[rgba(109,107,107,0.61)]'
                          )}
                        >
                          {event.title}/
                          <p className="text-xs text-gray-500">
                            {event.slug.replace(/-([a-z])/g, (_, c) =>
                              c.toUpperCase()
                            )}{' '}
                            • {event._count.meetings} bookings
                          </p>
                        </h2>
                      </div>
                      <p className="dark:text-[#ffffff] text-xs flex justify-center text-center items-center px-1 gap-1 rounded-sm w-fit dark:bg-neutral-600">
                        <Clock className="h-3 w-3" /> {event.duration}m
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex p-0 gap-4 items-center justify-center">
                    <Badge className="dark:bg-neutral-600 text-xs font-semibold">
                      {event.isPending ? (
                        <Loader size="sm" color="black" />
                      ) : (
                        <span className="">
                          {event.isPrivate ? 'Hidden' : ''}
                        </span>
                      )}
                    </Badge>

                    <Switch
                      className=""
                      checked={event.isPrivate}
                      onCheckedChange={() =>
                        togglePrivacyMutation.mutate(event.id)
                      }
                      disabled={togglePrivacyMutation.isPending}
                    />
                    <div className="flex justify-center items-center rounded-md border dark:border-neutral-600">
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="">
                              <Link
                                href={`${window.location.origin}/${events.data.username}/${event.slug}`}
                                className={cn(
                                  `p-0`,
                                  event.isPrivate &&
                                    'pointer-events-none opacity-60'
                                )}
                              >
                                <ExternalLink className="h-4 w-4 text-neutral-500" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-1 text-xs">
                            {' '}
                            View booking page{' '}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="dark:bg-neutral-600 bg-neutral-300 h-5 min-h-full w-[1px]"></div>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              className="disabled:opacity-100 text-neutral-500"
                              onClick={() => handleCopy(event)}
                              aria-label={
                                copied ? 'Copied' : 'Copy to clipboard'
                              }
                              disabled={event.isPrivate}
                              variant="ghost"
                            >
                              <div
                                className={cn(
                                  'absolute transition-all',
                                  copied
                                    ? 'scale-100 opacity-100'
                                    : 'scale-0 opacity-0'
                                )}
                              >
                                <CheckIcon
                                  className="stroke-emerald-500"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </div>
                              <div
                                className={cn(
                                  ' transition-all',
                                  copied
                                    ? 'scale-0 opacity-0'
                                    : 'scale-100 opacity-100'
                                )}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="lucide lucide-link-icon lucide-link"
                                >
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                              </div>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-1 text-xs">
                            Click to copy
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="dark:bg-neutral-600 bg-neutral-300 h-5 min-h-full w-[1px]"></div>

                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label=""
                                >
                                  <Ellipsis className="text-neutral-500" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Label</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() => handleCopy(event)}
                                  >
                                    <CopyPlusIcon
                                      size={16}
                                      className="opacity-60"
                                      aria-hidden="true"
                                    />
                                    Copy
                                  </DropdownMenuItem>
                                  <Dialog>
                                    <DialogTrigger>
                                      <BoltIcon
                                        size={16}
                                        className="opacity-60"
                                        aria-hidden="true"
                                      />
                                    </DialogTrigger>
                                    <DialogContent>
                                      <EditEvent event={event} />
                                    </DialogContent>
                                  </Dialog>
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
                                  <DropdownMenuItem>
                                    <FilesIcon
                                      size={16}
                                      className="opacity-60"
                                      aria-hidden="true"
                                    />
                                    Clone
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      deleteEventMutation.mutate(event.id)
                                    }
                                    disabled={deleteEventMutation.isPending}
                                  >
                                    <TrashIcon size={16} aria-hidden="true" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TooltipTrigger>
                          <TooltipContent className="px-2 py-1 text-xs">
                            {' '}
                            View booking page{' '}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {/* <EditEvent event={event} /> */}
                  </CardFooter>
                </Card>
              ))}
              <Separator />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen max-h-[70%] w-full">
              <div
                className="flex flex-col items-center justify-center
               h-full w-full text-center"
              >
                <img
                  src="https://img.freepik.com/free-vector/date-picker-concept-illustration_114360-4495.jpg?t=st=1751978834~exp=1751982434~hmac=59e640f90ce63422b604bc75a4903ea45721e72af87ae5bfa38bf15b4dd016d3&w=2000"
                  alt={'Create events'}
                  className="w-[200px] rounded-md h-[200px] mb-3"
                />
                <h3 className="text-xl mb-[3px] font-semibold">
                  Create scheduling links with event types
                </h3>
                <p className="font-light">
                  Create event for schedule meetings with teams or collegues.
                </p>

                <div className="mt-5">
                  {/* <NewEventDialog btnVariant="default" /> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
