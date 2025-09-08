import React from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "utils/db";
import { ChannelType } from "@prisma/client";
import { NavigationSidebar } from "@/components/chat-components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/chat-components/server/server-sidebar";
import { ChatHeader } from "@/components/chat-components/chat/chat-header";
import { ChatInput } from "@/components/chat-components/chat/chat-input";
import { ChatMessages } from "@/components/chat-components/chat/chat-messages";
import { MediaRoom } from "@/components/chat-components/media-room";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface ChannelIdPageProps {
  serverId: string;
  channelId: string;
  channel: {
    id: string;
    name: string;
    type: ChannelType;
    serverId: string;
  };
  member: {
    id: string;
    role: string;
    userId: string;
    serverId: string;
    user: {
      id: string;
      name: string;
      imageUrl: string;
      email: string;
    };
  };
}

export default function ChannelIdPage({
  serverId,
  channelId,
  channel,
  member
}: ChannelIdPageProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-screen min-h-screen w-screen dark:bg-black">
       <ResizablePanel defaultSize={5} minSize={0} maxSize={4.5}>
        <NavigationSidebar />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent " />

      <ResizablePanel defaultSize={22} className="rounded-tl-2xl border dark:border-neutral-800 mt-6">
        <div className="flex h-full items-center justify-center">
          <ServerSidebar serverId={serverId} />
        </div>
      </ResizablePanel>
      
      <ResizableHandle className="bg-transparent" />
      
      <ResizablePanel defaultSize={75} className="border-t dark:border-neutral-800 mt-6">
        
          <div className="bg-white dark:bg-[#070709] flex flex-col h-full ">
          <ChatHeader
            name={channel.name}
            serverId={channel.serverId}
            type="channel"
          /> 
          {channel.type === ChannelType.TEXT && (
            <>
              <ChatMessages
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                  channelId: channel.id,
                  serverId: channel.serverId
                }}
                paramKey="channelId"
                paramValue={channel.id}
              />
              <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  serverId: channel.serverId
                }}
              />
            </>
          )}
          {channel.type === ChannelType.AUDIO && (
            <MediaRoom chatId={channel.id} video={false} audio={true} />
          )}
          {channel.type === ChannelType.VIDEO && (
            <MediaRoom chatId={channel.id} video={true} audio={true} />
          )}
        </div>
      </ResizablePanel>
    
  </ResizablePanelGroup>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverId, channelId } = context.params!;
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.id) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const channel = await prisma.channel.findUnique({
    where: { id: channelId as string }
  });

  const member = await prisma.member.findFirst({
    where: { 
      serverId: serverId as string, 
      userId: user.id 
    },
    include: {
      user: true
    }
  });

  if (!channel || !member) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      serverId: serverId as string,
      channelId: channelId as string,
      channel: JSON.parse(JSON.stringify(channel)),
      member: JSON.parse(JSON.stringify(member)),
    },
  };
};