"use client";

import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export function MediaRoom({ chatId, video, audio }: MediaRoomProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={chatId}
        configOverwrite={{
          startWithAudioMuted: !audio,
          startWithVideoMuted: !video,
          enableWelcomePage: true,
        }}
        interfaceConfigOverwrite={{
          DEFAULT_BACKGROUND: '#000000',
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_POWERED_BY: false,
        }}
        userInfo={{
          displayName: session?.user.name || "Guest",
          email: session?.user?.email || "",
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = '100%';
          iframe.style.width = '100%';
        }}
        onReadyToClose={() => {
          // Handle room close if needed
        }}
      />
    </div>
  );
}