import React from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "utils/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { NavigationSidebar } from "@/components/chat-components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/chat-components/server/server-sidebar";
import { ChatHeader } from "@/components/chat-components/chat/chat-header";
import { ChatMessages } from "@/components/chat-components/chat/chat-messages";
import { ChatInput } from "@/components/chat-components/chat/chat-input";
import { MediaRoom } from "@/components/chat-components/media-room";
import Mainsidebar from "@/components/ui/mainSideBar";

interface MemberIdPageProps {
  serverId: string;
  memberId: string;
  conversation: any;
  currentMember: any;
  otherMember: any;
  video?: boolean;
}

export default function MemberIdPage({
  serverId,
  memberId,
  conversation,
  currentMember,
  otherMember,
  video
}: MemberIdPageProps) {
  return (
    <div className="h-full flex">
      <Mainsidebar/>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="hidden md:flex h-full w-60 z-20 flex-col  inset-y-0 ml-[72px]">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-[332px]">
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
          <ChatHeader
            image={otherMember.user.image}
            name={otherMember.user.name}
            serverId={serverId}
            type="conversation"
          />
          {video && <MediaRoom chatId={conversation.id} video audio />}
          {!video && (
            <>
              <ChatMessages
                member={currentMember}
                name={otherMember.user.name}
                chatId={conversation.id}
                type="conversation"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={conversation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                  conversationId: conversation.id
                }}
              />
              <ChatInput
                name={otherMember.user.name}
                type="conversation"
                apiUrl="/api/socket/direct-messages"
                query={{
                  conversationId: conversation.id
                }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverId, memberId } = context.params!;
  const { video } = context.query;
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

  const currentMember = await prisma.member.findFirst({
    where: {
      serverId: serverId as string,
      userId: user.id
    },
    include: {
      user: true
    }
  });

  if (!currentMember) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId as string
  );

  if (!conversation) {
    return {
      redirect: {
        destination: `/servers/${serverId}`,
        permanent: false,
      },
    };
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;

  return {
    props: {
      serverId: serverId as string,
      memberId: memberId as string,
      conversation: JSON.parse(JSON.stringify(conversation)),
      currentMember: JSON.parse(JSON.stringify(currentMember)),
      otherMember: JSON.parse(JSON.stringify(otherMember)),
      video: video === "true" || false,
    },
  };
};