// "use client"

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Send, MoreVertical, Smile, X, Maximize2, Minimize2 } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChannelType } from "@prisma/client"
// import { ChatHeader } from "@/components/chat-components/chat/chat-header"
// import { ChatInput } from "@/components/chat-components/chat/chat-input"
// import { ChatMessages } from "@/components/chat-components/chat/chat-messages"
// import { MediaRoom } from "@/components/chat-components/media-room"
// import { FamilyButton } from "./familyButton"

// interface Channel {
//   id: string;
//   name: string;
//   type: ChannelType;
//   serverId: string;
// }

// interface User {
//   id: string;
//   name: string;
//   imageUrl: string;
//   email: string;
// }

// interface Member {
//   id: string;
//   role: string;
//   userId: string;
//   serverId: string;
//   user: User;
// }

// export function FamilyButtonDemo() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [channel, setChannel] = useState<Channel | null>(null)
//   const [member, setMember] = useState<Member | null>(null)
//   const [serverId, setServerId] = useState<string | null>(null)
//   const [channelId, setChannelId] = useState<string | null>(null)
//   const router = useRouter()

//   // Fetch default server and channel data
//   useEffect(() => {
//     const fetchDefaultChatData = async () => {
//       try {
//         setIsLoading(true)
//         const response = await fetch('/api/chat/default')
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch chat data')
//         }
        
//         const data = await response.json()
        
//         if (data.serverId && data.channelId) {
//           setServerId(data.serverId)
//           setChannelId(data.channelId)
          
//           // Fetch channel details
//           const channelResponse = await fetch(`/api/channels/${data.channelId}`)
//           if (channelResponse.ok) {
//             const channelData = await channelResponse.json()
//             setChannel(channelData)
//           }
          
//           // Fetch member details
//           const memberResponse = await fetch(`/api/servers/${data.serverId}/member`)
//           if (memberResponse.ok) {
//             const memberData = await memberResponse.json()
//             setMember(memberData)
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching chat data:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     if (isOpen) {
//       fetchDefaultChatData()
//     }
//   }, [isOpen])

//   const handleOpenChatPage = () => {
//     if (serverId && channelId) {
//       router.push(`/servers/${serverId}/channels/${channelId}`)
//     }
//   }

//   return (
//     <div className="fixed bottom-8 right-20">
//       <FamilyButton>
//         <div className="relative">
//           {/* Chat Toggle Button */}
//           {!isOpen && (
//             <motion.button
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsOpen(true)}
//               className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//               </svg>
//             </motion.button>
//           )}

//           {/* Chat Modal */}
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.8, y: 20 }}
//                 transition={{ type: "spring", damping: 20, stiffness: 300 }}
//                 className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col ${
//                   isExpanded ? 'w-96 h-[600px]' : 'w-80 h-96'
//                 }`}
//               >
//                 {/* Header */}
//                 <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold">
//                       {isLoading ? 'Loading...' : (channel ? channel.name : 'Unknown Channel')}
//                     </h3>
//                     <p className="text-xs text-blue-100">
//                       {isLoading ? 'Connecting...' : 'Online'}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setIsExpanded(!isExpanded)}
//                       className="p-1 rounded-full hover:bg-blue-500 transition-colors"
//                     >
//                       {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
//                     </button>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-1 rounded-full hover:bg-blue-500 transition-colors"
//                     >
//                       <X size={16} />
//                     </button>
//                     <button
//                       onClick={handleOpenChatPage}
//                       className="p-1 rounded-full hover:bg-blue-500 transition-colors"
//                       title="Open in full page"
//                     >
//                       <Maximize2 size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Chat Content */}
//                 <div className="flex-1 overflow-hidden bg-white dark:bg-[#070709] flex flex-col">
//                   {isLoading ? (
//                     <div className="flex justify-center items-center h-full">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     </div>
//                   ) : channel && member ? (
//                     <>
//                       <ChatHeader
//                         name={channel.name}
//                         serverId={channel.serverId}
//                         type="channel"
//                       />
//                       {channel.type === ChannelType.TEXT && (
//                         <>
//                           <div className="flex-1 overflow-auto">
//                             <ChatMessages
//                               member={member}
//                               name={channel.name}
//                               chatId={channel.id}
//                               type="channel"
//                               apiUrl="/api/messages"
//                               socketUrl="/api/socket/messages"
//                               socketQuery={{
//                                 channelId: channel.id,
//                                 serverId: channel.serverId
//                               }}
//                               paramKey="channelId"
//                               paramValue={channel.id}
//                             />
//                           </div>
//                           <ChatInput
//                             name={channel.name}
//                             type="channel"
//                             apiUrl="/api/socket/messages"
//                             query={{
//                               channelId: channel.id,
//                               serverId: channel.serverId
//                             }}
//                           />
//                         </>
//                       )}
//                       {channel.type === ChannelType.AUDIO && (
//                         <MediaRoom chatId={channel.id} video={false} audio={true} />
//                       )}
//                       {channel.type === ChannelType.VIDEO && (
//                         <MediaRoom chatId={channel.id} video={true} audio={true} />
//                       )}
//                     </>
//                   ) : (
//                     <div className="flex justify-center items-center h-full">
//                       <p className="text-zinc-500">No channel selected</p>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </FamilyButton>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Send, MoreVertical, Smile, X, Maximize2, Minimize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChannelType } from "@prisma/client"
import { ChatHeader } from "@/components/chat-components/chat/chat-header"
import { ChatInput } from "@/components/chat-components/chat/chat-input"
import { ChatMessages } from "@/components/chat-components/chat/chat-messages"
import { MediaRoom } from "@/components/chat-components/media-room"
import { FamilyButton } from "./familyButton"

interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  serverId: string;
}

interface User {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
}

interface Member {
  id: string;
  role: string;
  userId: string;
  serverId: string;
  user: User;
}

export function FamilyButtonDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [channel, setChannel] = useState<Channel | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [serverId, setServerId] = useState<string | null>(null)
  const [channelId, setChannelId] = useState<string | null>(null)
  const router = useRouter()

  // Fetch default server and channel data
  useEffect(() => {
    const fetchDefaultChatData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/chat/default')
        
        if (!response.ok) {
          throw new Error('Failed to fetch chat data')
        }
        
        const data = await response.json()
        
        if (data.serverId && data.channelId) {
          setServerId(data.serverId)
          setChannelId(data.channelId)
          
          // Fetch channel details
          const channelResponse = await fetch(`/api/channels/${data.channelId}`)
          if (channelResponse.ok) {
            const channelData = await channelResponse.json()
            setChannel(channelData)
          }
          
          // Fetch member details
          const memberResponse = await fetch(`/api/servers/${data.serverId}/member`)
          if (memberResponse.ok) {
            const memberData = await memberResponse.json()
            setMember(memberData)
          }
        }
      } catch (error) {
        console.error('Error fetching chat data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchDefaultChatData()
    }
  }, [isOpen])

  const handleOpenChatPage = () => {
    if (serverId && channelId) {
      router.push(`/servers/${serverId}/channels/${channelId}`)
    }
  }

  return (
    <div className="fixed bottom-8 right-20">
      <FamilyButton>
        <div className="relative">
          {/* Chat Toggle Button */}
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.button>
          )}

          {/* Chat Modal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col ${
                  isExpanded ? 'w-[24.5rem] h-[600px]' : 'w-[24.5rem] h-[600px]'
                }`}
              >
                {/* Header */}
                <div className="bg-blue-600 text-white p-2 px-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {isLoading ? 'Loading...' : (channel ? channel.name : 'Unknown Channel')}
                    </h3>
                    <p className="text-xs text-blue-100">
                      {isLoading ? 'Connecting...' : 'Online'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={handleOpenChatPage}
                      className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                      title="Open in full page"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="flex-1 overflow-hidden bg-white dark:bg-[#070709] flex flex-col">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : channel && member ? (
                    <>
                      <ChatHeader
                        name={channel.name}
                        serverId={channel.serverId}
                        type="channel"
                      />
                      {channel.type === ChannelType.TEXT && (
                        <>
                          <div className="flex-1 overflow-auto">
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
                          </div>
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
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-zinc-500">No channel selected</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FamilyButton>
    </div>
  )
}