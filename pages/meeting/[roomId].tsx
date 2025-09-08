import { JitsiMeeting } from "@jitsi/react-sdk";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MeetingRoom() {
  const router = useRouter();
  const { roomId } = router.query;

  const [sessionUser, setSessionUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (!session) {
        router.push("/auth/login"); // Redirect if not authenticated
        return;
      }
      setSessionUser({
        name: session.user?.name || "Guest",
        email: session.user?.email || "",
      });
    }

    fetchSession();
  }, [router]);

  if (!roomId || !sessionUser) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="h-screen w-full">
        {/* <div className=" gap-2 flex bg-black rounded-md justify-center items-center w-fit absolute top-6 left-6 p-1 z-50">
            <img className="bg-transparent h-10 w-10 object-cover" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png" alt="" />
            <p className="text-white text-2xl">conferio</p>
        </div> */}
      <JitsiMeeting
        domain="vcall2.sprintxsol.com"
        // domain="alpha.jitsi.net"
        roomName={roomId as string}
        configOverwrite={{
          startWithAudioMuted: true,
          startScreenSharing: true,
           enableWelcomePage: true,
        }}
        interfaceConfigOverwrite={{
    //       DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    //        SHOW_JITSI_WATERMARK: false,
    // SHOW_WATERMARK_FOR_GUESTS: false,
    // DEFAULT_LOGO_URL: ' https://conferio.vercel.app/images/watermark.svg',
    // APP_NAME: 'conferio',
    //     DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://conferio.vercel.app/images/watermark.svg',
    //       HIDE_INVITE_MORE_HEADER: true,
    //       SHOW_CHROME_EXTENSION_BANNER: false,
    //       SHOW_POWERED_BY: false,
    //       SHOW_BRAND_WATERMARK: false,
    //       JITSI_WATERMARK_LINK:"https://conferio.vercel.app",
    DEFAULT_BACKGROUND: '#000000',
  SHOW_JITSI_WATERMARK: false,
  SHOW_WATERMARK_FOR_GUESTS: false,
  SHOW_BRAND_WATERMARK: false,
  SHOW_POWERED_BY: false,
        }}
        userInfo={{
          displayName: sessionUser.name,
          email: sessionUser.email,
        }}
        getIFrameRef={(node) => {
          node.style.height = "100%";
          node.style.width = "100%";
        }}
      />
    </div>
  );
}
