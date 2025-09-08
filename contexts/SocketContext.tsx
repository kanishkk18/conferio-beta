// import { SOCKET_HOST } from "../lib/constants";
// import { useAppStore } from "../store";
// import React, { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const socket = useRef();
//   const { userInfo } = useAppStore();

//   useEffect(() => {
//     if (userInfo) {
//       socket.current = io(SOCKET_HOST, {
//         withCredentials: true,
//         query: { userId: userInfo.id },
//       });
//       socket.current.on("connect", () => {
//         console.log("Connected to socket server");
//       });

//       const handleReceiveMessage = (message) => {
//         // Access the latest state values
//         const {
//           selectedChatData: currentChatData,
//           selectedChatType: currentChatType,
//           addMessage,
//           addContactInDMContacts,
//         } = useAppStore.getState();

//         if (
//           currentChatType !== undefined &&
//           (currentChatData._id === message.sender._id ||
//             currentChatData._id === message.recipient._id)
//         ) {
//           addMessage(message);
//         }
//         addContactInDMContacts(message);
//       };

//       const handleReceiveChannelMessage = (message) => {
//         const {
//           selectedChatData,
//           selectedChatType,
//           addMessage,
//           addChannelInChannelLists,
//         } = useAppStore.getState();

//         if (
//           selectedChatType !== undefined &&
//           selectedChatData._id === message.channelId
//         ) {
//           addMessage(message);
//         }
//         addChannelInChannelLists(message);
//       };

//       const addNewChannel = (channel) => {
//         const { addChannel } = useAppStore.getState();
//         addChannel(channel);
//       };

//       socket.current.on("receiveMessage", handleReceiveMessage);
//       socket.current.on("recieve-channel-message", handleReceiveChannelMessage);
//       socket.current.on("new-channel-added", addNewChannel);

//       return () => {
//         socket.current.disconnect();
//       };
//     }
//   }, [userInfo]);

//   return (
//     <SocketContext.Provider value={socket.current}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;


// import { SOCKET_HOST } from "../lib/constants";
// import { useAppStore } from "../store/index";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import type { DefaultEventsMap } from "@socket.io/component-emitter";

// const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
//   const { userInfo } = useAppStore();

//   useEffect(() => {
//     if (userInfo?.id) {
//       const newSocket = io(SOCKET_HOST, {
//         withCredentials: true,
//         transports: ["websocket"],
//         query: { userId: userInfo.id },
//       });

//       newSocket.on("connect", () => {
//         console.log("Connected to socket server");
//       });

//       // Message handler for direct messages
//       const handleReceiveMessage = (message) => {
//         const {
//           selectedChatData: currentChatData,
//           selectedChatType: currentChatType,
//           addMessage,
//           addContactInDMContacts,
//         } = useAppStore.getState();

//         if (
//           currentChatType !== undefined &&
//           (currentChatData._id === message.sender._id ||
//             currentChatData._id === message.recipient._id)
//         ) {
//           addMessage(message);
//         }
//         addContactInDMContacts(message);
//       };

//       // Message handler for channel messages
//       const handleReceiveChannelMessage = (message) => {
//         const {
//           selectedChatData,
//           selectedChatType,
//           addMessage,
//           addChannelInChannelLists,
//         } = useAppStore.getState();

//         if (
//           selectedChatType !== undefined &&
//           selectedChatData._id === message.channelId
//         ) {
//           addMessage(message);
//         }
//         addChannelInChannelLists(message);
//       };

//       // Channel addition handler
//       const addNewChannel = (channel) => {
//         const { addChannel } = useAppStore.getState();
//         addChannel(channel);
//       };

//       newSocket.on("receiveMessage", handleReceiveMessage);
//       newSocket.on("recieve-channel-message", handleReceiveChannelMessage);
//       newSocket.on("new-channel-added", addNewChannel);

//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [userInfo]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;


import { SOCKET_HOST } from "../lib/constants";
import { useAppStore } from "../store/index";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo?.id) {
      const newSocket = io(SOCKET_HOST, {
        withCredentials: true,
        transports: ["websocket"],
        query: { userId: userInfo.id },
      });

      newSocket.on("connect", () => {
        console.log("✅ Connected to socket server");
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });

      newSocket.on("disconnect", (reason) => {
        console.warn("⚠️ Socket disconnected:", reason);
      });

      const handleReceiveMessage = (message) => {
        const {
          selectedChatData: currentChatData,
          selectedChatType: currentChatType,
          addMessage,
          addContactInDMContacts,
        } = useAppStore.getState();

        if (
          currentChatType &&
          (currentChatData._id === message.sender._id ||
            currentChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactInDMContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelLists,
        } = useAppStore.getState();

        if (
          selectedChatType &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        addChannelInChannelLists(message);
      };

      const addNewChannel = (channel) => {
        const { addChannel } = useAppStore.getState();
        addChannel(channel);
      };

      newSocket.on("receiveMessage", handleReceiveMessage);
      newSocket.on("recieve-channel-message", handleReceiveChannelMessage);
      newSocket.on("new-channel-added", addNewChannel);

      setSocket(newSocket);

      return () => {
        newSocket.off("receiveMessage", handleReceiveMessage);
        newSocket.off("recieve-channel-message", handleReceiveChannelMessage);
        newSocket.off("new-channel-added", addNewChannel);
        newSocket.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
