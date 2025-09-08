// "use client";

// import React, { useEffect, useState } from "react";

// import { CreateServerModal } from "@/components/chat-components/modals/create-server-modal";
// import { InviteModal } from "@/components/chat-components/modals/invite-modal";
// import { EditServerModal } from "@/components/chat-components/modals/edit-server-modal";
// import { MembersModal } from "@/components/chat-components/modals/members-modal";
// import { CreateChannelModal } from "@/components/chat-components/modals/create-channel-modal";
// import { LeaveServerModal } from "@/components/chat-components/modals/leave-server-modal";
// import { DeleteServerModal } from "@/components/chat-components/modals/delete-server-modal";
// import { DeleteChannelModal } from "@/components/chat-components/modals/delete-channel-modal";
// import { EditChannelModal } from "@/components/chat-components/modals/edit-channel-modal";
// import { MessageFileModal } from "@/components/chat-components/modals/message-file-modal";
// import { DeleteMessageModal } from "@/components/chat-components/modals/delete-message-modal";


// export function ModalProvider() {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <>
//       <CreateServerModal />
//       <InviteModal />
//       <EditServerModal />
//       <MembersModal />
//       <CreateChannelModal />
//       <LeaveServerModal />
//       <DeleteServerModal />
//       <DeleteChannelModal />
//       <EditChannelModal />
//       <MessageFileModal />
//       <DeleteMessageModal />
//     </>
//   );
// }
