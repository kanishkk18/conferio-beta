// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Label } from "./label";
// import { Input } from "./input";
// import { Button } from "./button";
// import { toast } from "react-hot-toast";
// import { LogIn } from "lucide-react";
// // ... your imports

// type JoinMeetingModalProps = {
//   open?: boolean;
//   onClose?: () => void;
//   onJoin: (meetingId: string) => void;
// };

// export default function ChartCard({ onJoin }: JoinMeetingModalProps) {
//   const [meetingId, setMeetingId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleCreateMeeting = () => {
//     const roomId = `conferio-${Date.now()}`;
//     router.push(`/meeting/${roomId}`);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!meetingId.trim()) {
//       toast(
//         <div>
//           <div className="font-semibold text-destructive">Meeting ID required</div>
//           <div className="text-sm text-muted-foreground">Please enter a valid meeting ID</div>
//         </div>
//       );
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       onJoin(meetingId);
//       setMeetingId("");
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <section>
//       <div className="min-w-[22rem] min-h-[300px] px-4 pt-4 rounded-xl backdrop-blur-lg bg-zinc-900 border-border">
//         <h1 className="flex font-bold text-md items-center gap-2">
//           <LogIn className="h-5 w-5 text-primary" />
//           Join Meeting
//         </h1>
//         <p className="text-sm pt-2 text-muted-foreground">
//           Enter the meeting ID to join a meet
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-2 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="meeting-id">Meeting ID</Label>
//             <Input
//               id="meeting-id"
//               placeholder="Enter meeting ID"
//               value={meetingId}
//               onChange={(e) => setMeetingId(e.target.value)}
//               className="bg-background/50"
//               autoFocus
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="meeting-password">Enter Password (optional)</Label>
//             <Input id="meeting-password" placeholder="Enter Password" className="bg-background/50" />
//           </div>

//           <div className="flex items-center gap-4 pt-2">
//             <Button type="button" className="bg-black text-white" onClick={handleCreateMeeting}>
//               Create a meeting
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Joining..." : "Join Meeting"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Label } from "./label";
// import { Input } from "./input";
// import { Button } from "./button";
// import { toast } from "react-hot-toast";
// import { LogIn } from "lucide-react";

// export default function ChartCard() {
//   const [meetingId, setMeetingId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleCreateMeeting = () => {
//     const roomId = `conferio-${Date.now()}`;
//     router.push(`/meeting/${roomId}`);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!meetingId.trim()) {
//       toast(
//         <div>
//           <div className="font-semibold text-destructive">Meeting ID required</div>
//           <div className="text-sm text-muted-foreground">Please enter a valid meeting ID</div>
//         </div>
//       );
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       router.push(`/meeting/${meetingId.trim()}`);
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <section>
//       <div className="min-w-[22rem] min-h-[300px] px-4 pt-4 rounded-xl backdrop-blur-lg bg-zinc-900 border-border">
//         <h1 className="flex font-bold text-md items-center gap-2">
//           <LogIn className="h-5 w-5 text-primary" />
//           Join Meeting
//         </h1>
//         <p className="text-sm pt-2 text-muted-foreground">
//           Enter the meeting ID to join a meet
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-2 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="meeting-id">Meeting ID</Label>
//             <Input
//               id="meeting-id"
//               placeholder="Enter meeting ID"
//               value={meetingId}
//               onChange={(e) => setMeetingId(e.target.value)}
//               className="bg-background/50"
//               autoFocus
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="meeting-password">Enter Password (optional)</Label>
//             <Input id="meeting-password" placeholder="Enter Password" className="bg-background/50" />
//           </div>

//           <div className="flex items-center gap-4 pt-2">
//             <Button type="button" className="bg-black text-white" onClick={handleCreateMeeting}>
//               Create a meeting
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Joining..." : "Join Meeting"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { toast } from "react-hot-toast";
import { LogIn } from "lucide-react";

type JoinMeetingModalProps = {
  open?: boolean;
  onClose?: () => void;
  onJoin?: (meetingId: string) => void; // Optional now
};

export default function ChartCard({ onJoin }: JoinMeetingModalProps) {
  const [meetingId, setMeetingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMeeting = () => {
    const roomId = `conferio-${Date.now()}`;
    const url = `/meeting/${roomId}`;
    window.open(url, "_blank"); // opens in a new tab
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingId.trim()) {
      toast(
        <div>
          <div className="font-semibold text-destructive">Meeting ID required</div>
          <div className="text-sm text-muted-foreground">Please enter a valid meeting ID</div>
        </div>
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const url = `/meeting/${meetingId.trim()}`;
      window.open(url, "_blank"); // open meeting in a new tab
      setMeetingId("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section>
      <div className="min-w-[25rem] min-h-[300px] px-4 pt-4 rounded-xl backdrop-blur-lg bg-[#F4F4F5] dark:bg-[#101012] border-border">
        <h1 className="flex font-bold text-md items-center gap-2">
          <LogIn className="h-5 w-5 text-primary" />
          Join Meeting
        </h1>
        <p className="text-sm pt-2 text-muted-foreground">
          Enter the meeting ID to join a meet
        </p>

        <form onSubmit={handleSubmit} className="space-y-2 py-4">
          <div className="space-y-2">
            <Label htmlFor="meeting-id">Meeting ID</Label>
            <Input
              id="meeting-id"
              placeholder="Enter meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="bg-background/50 dark:bg-transparent"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meeting-password">Enter Password (optional)</Label>
            <Input
              id="meeting-password"
              placeholder="Enter Password"
              className="bg-background/50 dark:bg-transparent"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="button" className="bg-black text-white" onClick={handleCreateMeeting}>
              Create a meeting
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Meeting"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
