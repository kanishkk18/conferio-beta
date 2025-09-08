import React from 'react';
import { ArrowUpRight} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { MeetingType, PeriodType } from "types/api.type";
import { format, parseISO } from "date-fns";
  import Link from "next/link";
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';


const UpcomingMeeting = (props: {
  meeting: MeetingType;
  period: PeriodType;
  isPending: boolean;
  onCancel: () => void;
}) => {
   const { meeting } = props;
  
    // Format the date and time
    const startTime = parseISO(meeting.startTime);
    const endTime = parseISO(meeting.endTime);
    // const formattedDate = format(startTime, "EE, d MMMM yyyy"); // e.g., "Wednesday, 19 March 2025"
    // const formattedTime = `${format(startTime, "h:mm a")} – ${format(
    //   endTime,
    //   "h:mm a"
    // )}`;

  
    const people = [
  {
    id: Number (meeting.id),
    name: meeting.guestName,
    designation: meeting.guestEmail,
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
  
  return (
          <div className=" h-full ">
                  <div className="px-4 py-2 gap-4 flex bg-blue-500 rounded-xl h-full flex-col">
                        <div className="flex flex-col justify-start items-start">
                          <h1 className="text-lg font-semibold [text-shadow:_1px_1px_4px_rgba(0,0,0,0.6)]">{meeting.event.title}</h1>
                          <p className="text-sm font-semibold text-white">
                            {(() => {
                            const now = new Date();
                            const diffMs = parseISO(meeting.startTime).getTime() - now.getTime();

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
                              return "Now";
                            } else {
                              return "Started";
                            }
                          })()}</p>
                        </div>
                        <div className="h-[2px] bg-white w-[3vw]"></div>
                        <div className="flex text-center justify-between w-full items-center">
 <div className="flex flex-row items-start justify-start w-full">
      <AnimatedTooltip items={people} />
    </div>
    <Link href={meeting.meetLink} className="text-sm text-white bg-black/70 rounded-full p-1"><ArrowUpRight className="h-5 w-5"/> </Link>

                        </div>
                      </div>
                </div>
  );
};

export default UpcomingMeeting;
