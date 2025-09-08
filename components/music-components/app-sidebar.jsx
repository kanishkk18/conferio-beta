import {
  GalleryVerticalEnd,
} from "lucide-react"
import { TeamSwitcher } from "./team-switcher"
import { LibrarySection } from '../../components/music-components/ui/LibrarySection'
import {ScrollArea, ScrollBar} from "../ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "ConferioSync",
      logo: GalleryVerticalEnd,
     
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-full">
          <LibrarySection/>
          <ScrollBar orientation="vertical" className="hidden" />
        </ScrollArea>
      </SidebarContent>
      
      {/* <SidebarRail /> */}
    </Sidebar>)
  );
}


// import React from 'react'
// import { Home, Search, Library } from 'lucide-react'
// import { LibrarySection } from '../../components/music-components/ui/LibrarySection'
// // import { MainContent } from './components/MainContent'
// // import { MusicPlayer } from './components/MusicPlayer'
// import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '../../components/music-components/ui/sidebar'

// function AppSidebar() {
//   return (
//     <div className="h-screen bg-spotify-black text-white flex flex-col overflow-hidden">
//       <div className="flex flex-1 min-h-0">
//         {/* Sidebar */}
//         <Sidebar className="w-72 bg-spotify-black border-r border-spotify-gray/20">
//           <SidebarHeader className="px-0 py-6">
//             <div className="px-6">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                 <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-.3 0-.5-.2-.7-.4-1.9-1.2-4.4-1.4-7.2-.8-.3.1-.6-.1-.6-.4s.1-.6.4-.6c3.1-.7 5.9-.4 8.1.9.3.2.4.5.2.8-.1.3-.3.5-.7.5zm1-2.7c-.4 0-.7-.2-.8-.5-2.3-1.4-5.8-1.8-8.5-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.1-.9 7-.4 9.6 1.1.3.2.4.6.2.9-.2.4-.4.7-.8.7zm.1-2.8c-2.7-1.6-7.2-1.8-9.8-1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3-.9 8-.7 11.2 1.1.4.2.5.7.3 1-.2.3-.6.4-1 .3z"/>
//                   </svg>
//                 </div>
//                 Spotify
//               </h1>
//             </div>
//           </SidebarHeader>
          
//           <SidebarContent className="px-0">
//              <div className="px-2 mb-6">
//       <nav className="space-y-2">
//         <a 
//           href="#" 
//           className="flex items-center gap-4 px-4 py-3 text-white font-semibold hover:text-white transition-colors"
//         >
//           <Home className="w-6 h-6" />
//           <span>Home</span>
//         </a>
//         <a 
//           href="#" 
//           className="flex items-center gap-4 px-4 py-3 text-spotify-gray hover:text-white transition-colors"
//         >
//           <Search className="w-6 h-6" />
//           <span>Search</span>
//         </a>
//       </nav>
//     </div>
//             <LibrarySection />
//           </SidebarContent>
//            <SidebarRail />
//         </Sidebar>

//         {/* Main Content */}
//         {/* <MainContent /> */}
//       </div>

//       {/* Music Player */}
//       {/* <MusicPlayer /> */}
//     </div>
//   )
// }

// export default AppSidebar
