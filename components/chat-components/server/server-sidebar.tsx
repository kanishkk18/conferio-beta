// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import React from "react";
// import { ChannelType, MemberRole } from "@prisma/client";
// import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

// import { ServerHeader } from "@/components/server/server-header";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ServerSearch } from "@/components/server/server-search";
// import { Separator } from "@/components/ui/separator";
// import { ServerSection } from "@/components/server/server-section";
// import { ServerChannel } from "@/components/server/server-channel";
// import { ServerMember } from "@/components/server/server-member";

// const iconMap = {
//   [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
//   [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
//   [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
// };

// const roleIconMap = {
//   [MemberRole.GUEST]: null,
//   [MemberRole.MODERATOR]: (
//     <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
//   ),
//   [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
// };

// export function ServerSidebar({ serverId }: { serverId: string }) {
//   const { data: session } = useSession();
//   const [server, setServer] = useState<any>(null);
//   const [role, setRole] = useState<MemberRole | undefined>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServerData = async () => {
//       if (!session?.user?.id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/servers/${serverId}/data`);
//         if (response.ok) {
//           const data = await response.json();
//           setServer(data.server);
//           setRole(data.role);
//         }
//       } catch (error) {
//         console.error('Failed to fetch server data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServerData();
//   }, [serverId, session]);

//   if (!session?.user) return null;
//   if (loading) return <div>Loading...</div>;
//   if (!server) return null;

//   const textChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.AUDIO
//   );
//   const videoChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.VIDEO
//   );

//   const members = server?.members.filter(
//     (member) => member.profileId !== session.user.id
//   );

//   return (
//     <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
//       <ServerHeader server={server} role={role} />
//       <ScrollArea className="flex-1 px-3">
//         <div className="mt-2">
//           <ServerSearch
//             data={[
//               {
//                 label: "Text Channels",
//                 type: "channel",
//                 data: textChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Voice Channels",
//                 type: "channel",
//                 data: audioChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Video Channels",
//                 type: "channel",
//                 data: videoChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Members",
//                 type: "member",
//                 data: members?.map((member) => ({
//                   id: member.id,
//                   name: member.profile.name,
//                   icon: roleIconMap[member.role]
//                 }))
//               }
//             ]}
//           />
//         </div>
//         <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
//         {!!textChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.TEXT}
//               role={role}
//               label="Text Channels"
//             />
//             <div className="space-y-[2px]">
//               {textChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!audioChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.AUDIO}
//               role={role}
//               label="Voice Channels"
//             />
//             <div className="space-y-[2px]">
//               {audioChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!videoChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.VIDEO}
//               role={role}
//               label="Video Channels"
//             />
//             <div className="space-y-[2px]">
//               {videoChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!members?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="members"
//               role={role}
//               label="Members"
//               server={server}
//             />
//             <div className="space-y-[2px]">
//               {members.map((member) => (
//                 <ServerMember key={member.id} member={member} server={server} />
//               ))}
//             </div>
//           </div>
//         )}
//       </ScrollArea>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import React from "react";
// import { ChannelType, MemberRole } from "@prisma/client";
// import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

// import { ServerHeader } from "@/components/server/server-header";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ServerSearch } from "@/components/server/server-search";
// import { Separator } from "@/components/ui/separator";
// import { ServerSection } from "@/components/server/server-section";
// import { ServerChannel } from "@/components/server/server-channel";
// import { ServerMember } from "@/components/server/server-member";

// const iconMap = {
//   [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
//   [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
//   [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
// };

// const roleIconMap = {
//   [MemberRole.GUEST]: null,
//   [MemberRole.MODERATOR]: (
//     <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
//   ),
//   [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
// };

// interface ServerSidebarProps {
//   serverId: string;
// }

// export function ServerSidebar({ serverId }: ServerSidebarProps) {
//   const { data: session } = useSession();
//   const [server, setServer] = useState<any>(null);
//   const [role, setRole] = useState<MemberRole | undefined>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServerData = async () => {
//       if (!session?.user?.id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/servers/${serverId}/data`);
//         if (response.ok) {
//           const data = await response.json();
//           setServer(data.server);
//           setRole(data.role);
//         }
//       } catch (error) {
//         console.error("Failed to fetch server data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServerData();
//   }, [serverId, session]);

//   if (!session?.user) return null;
//   if (loading) return <div>Loading...</div>;
//   if (!server) return null;

//   const textChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.AUDIO
//   );
//   const videoChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.VIDEO
//   );

//   const members = server?.members.filter(
//     (member) => member.profileId !== session.user.id
//   );

//   return (
//     <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
//       <ServerHeader server={server} role={role} />
//       <ScrollArea className="flex-1 px-3">
//         <div className="mt-2">
//           <ServerSearch
//             data={[
//               {
//                 label: "Text Channels",
//                 type: "channel",
//                 data: textChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Voice Channels",
//                 type: "channel",
//                 data: audioChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Video Channels",
//                 type: "channel",
//                 data: videoChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Members",
//                 type: "member",
//                 data: members?.map((member) => ({
//                   id: member.id,
//                   name: member.profile.name,
//                   icon: roleIconMap[member.role]
//                 }))
//               }
//             ]}
//           />
//         </div>

//         <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

//         {!!textChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.TEXT}
//               role={role}
//               label="Text Channels"
//             />
//             <div className="space-y-[2px]">
//               {textChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {!!audioChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.AUDIO}
//               role={role}
//               label="Voice Channels"
//             />
//             <div className="space-y-[2px]">
//               {audioChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {!!videoChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.VIDEO}
//               role={role}
//               label="Video Channels"
//             />
//             <div className="space-y-[2px]">
//               {videoChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {!!members?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="members"
//               role={role}
//               label="Members"
//               server={server}
//             />
//             <div className="space-y-[2px]">
//               {members.map((member) => (
//                 <ServerMember key={member.id} member={member} server={server} />
//               ))}
//             </div>
//           </div>
//         )}
//       </ScrollArea>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import React from "react";
// import { ChannelType, MemberRole } from "@prisma/client";
// import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

// import { ServerHeader } from "@/components/server/server-header";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ServerSearch } from "@/components/server/server-search";
// import { Separator } from "@/components/ui/separator";
// import { ServerSection } from "@/components/server/server-section";
// import { ServerChannel } from "@/components/server/server-channel";
// import { ServerMember } from "@/components/server/server-member";

// const iconMap = {
//   [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
//   [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
//   [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
// };

// const roleIconMap = {
//   [MemberRole.GUEST]: null,
//   [MemberRole.MODERATOR]: (
//     <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
//   ),
//   [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
// };

// export function ServerSidebar({ serverId }: { serverId: string }) {
//   const { data: session } = useSession();
//   const [server, setServer] = useState<any>(null);
//   const [role, setRole] = useState<MemberRole | undefined>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServerData = async () => {
//       if (!session?.user?.id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/servers/${serverId}/data`);
//         if (response.ok) {
//           const data = await response.json();
//           setServer(data.server);
//           setRole(data.role);
//         }
//       } catch (error) {
//         console.error('Failed to fetch server data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServerData();
//   }, [serverId, session]);

//   if (!session?.user) return null;
//   if (loading) return <div>Loading...</div>;
//   if (!server) return null;

//   const textChannels = server?.channels.filter(
//     (channel : any) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server?.channels.filter(
//     (channel : any) => channel.type === ChannelType.AUDIO
//   );
//   const videoChannels = server?.channels.filter(
//     (channel : any) => channel.type === ChannelType.VIDEO
//   );

//   const members = server?.members.filter(
//     (member : any) => member.profileId !== session.user.id
//   );

//   return (
//     <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
//       <ServerHeader server={server} role={role} />
//       <ScrollArea className="flex-1 px-3">
//         <div className="mt-2">
//           <ServerSearch
//             data={[
//               {
//                 label: "Text Channels",
//                 type: "channel",
//                 data: textChannels?.map((channel : any) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Voice Channels",
//                 type: "channel",
//                 data: audioChannels?.map((channel : any) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Video Channels",
//                 type: "channel",
//                 data: videoChannels?.map((channel : any) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Members",
//                 type: "member",
//                 data: members?.map((member : any) => ({
//                   id: member.id,
//                   name: member.profile.name,
//                   icon: roleIconMap[member.role]
//                 }))
//               }
//             ]}
//           />
//         </div>
//         <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
//         {!!textChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.TEXT}
//               role={role}
//               label="Text Channels"
//             />
//             <div className="space-y-[2px]">
//               {textChannels.map((channel : any) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!audioChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.AUDIO}
//               role={role}
//               label="Voice Channels"
//             />
//             <div className="space-y-[2px]">
//               {audioChannels.map((channel : any) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!videoChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.VIDEO}
//               role={role}
//               label="Video Channels"
//             />
//             <div className="space-y-[2px]">
//               {videoChannels.map((channel : any) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!members?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="members"
//               role={role}
//               label="Members"
//               server={server}
//             />
//             <div className="space-y-[2px]">
//               {members.map((member : any) => (
//                 <ServerMember key={member.id} member={member} server={server} />
//               ))}
//             </div>
//           </div>
//         )}
//       </ScrollArea>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerHeader } from "@/components/chat-components/server/server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "@/components/chat-components/server/server-search";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "@/components/chat-components/server/server-section";
import { ServerChannel } from "@/components/chat-components/server/server-channel";
import { ServerMember } from "@/components/chat-components/server/server-member";
import Image from "next/image";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
};

interface ServerSidebarProps {
  serverId: string;
}

export function ServerSidebar({ serverId }: ServerSidebarProps) {
  const { data: session } = useSession();
  const [server, setServer] = useState<any>(null);
  const [role, setRole] = useState<MemberRole | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/servers/${serverId}/data`);
        if (response.ok) {
          const data = await response.json();
          setServer(data.server);
          setRole(data.role);
        }
      } catch (error) {
        console.error("Failed to fetch server data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, [serverId, session]);

  if (!session?.user) return null;
  if (loading) return <div>Loading...</div>;
  if (!server) return null;

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.userId !== session.user.id
  );

  return (
    <div className="flex flex-col h-full text-primary w-full min-w-full ">
      <ServerHeader server={server} role={role} />
      <div className="h-32 w-full -mt-12">
      <Image height={1000} width={1000} src={server.imageUrl} alt="" className="h-full w-full object-cover"/>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.user.name,
                  icon: roleIconMap[member.role]
                }))
              }
            ]}
          />
        </div>

        <Separator className="bg-zinc-200 dark:bg-neutral-800 my-2" />

        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
