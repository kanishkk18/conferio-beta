
// import Logo from "./logo";
import { Button } from "@/components/ui/button";
import Search from "./search";
import { Heart, Settings, Home, } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  const session = useSession();

  
    const path = usePathname();
    console.log(path);
    return (
        <div className="flex h-fit w-full right-0 p-4 items-center justify-between pl-2 pr-4">
       <div className="flex justify-start gap-4 items-center w-full max-w-3xl">
        <div className="bg-neutral-700 p-1.5 flex justify-center items-center rounded-full text-neutral-400">
      <SidebarTrigger/>
      </div>
       <Link href="/maindashboard" className="bg-neutral-700 p-2 rounded-full text-neutral-400"> <Home/> </Link>
        <div className="flex-1 max-w-2xl ">
         <Search/>
        </div>
        </div>
        <div className="flex w-fit items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full overflow-hidden border-none text-white"><ThemeToggle className="rounded-full bg-transparent"/></Button>
           
          <Button variant="outline" size="icon" className="rounded-full border-none text-white">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-none text-white">
            <Settings className="h-5 w-5" />
          </Button>
          {session.data?.user?.image && (
          <div className="flex items-center gap-2">
            <img
              src={session.data?.user?.image}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
           )}
        </div>
      </div>
    )
}
