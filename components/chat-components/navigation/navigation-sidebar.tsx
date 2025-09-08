import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { UserButton } from "@/components/chat-components/user-button";
import { NavigationAction } from "@/components/chat-components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/chat-components/navigation/navigation-item";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface Server {
  id: string;
  name: string;
  imageUrl: string;
}

export function NavigationSidebar() {
  const { data: session } = useSession();
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchServers = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/servers');
        if (response.ok) {
          const data = await response.json();
          setServers(data);
        }
      } catch (error) {
        console.error('Failed to fetch servers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [session]);

  if (!session?.user) return null;
  if (loading) return <div className="h-full w-full bg-gray-100 dark:bg-gray-950">

  </div>;

  return (
    <div className="space-y-4 flex flex-col h-full mt-6 items-center text-primary w-full">
      <Link href="/maindashboard" className=" p-2 h-11 w-11 bg-neutral-800 rounded-xl hover:bg-blue-700">
      <Image src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png" alt="Server Image" width={1000} height={1000} className="rounded-full h-full w-full object-contain" />
      </Link>
      <Separator className="h-[2px] mb-4 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
              <Separator className="h-[2px] mb-4 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

        <NavigationAction />
       
      </ScrollArea>
      
      <div className="pb-8 mt-auto flex items-center flex-col gap-y-4">
        <UserButton />
      </div>
    </div>
  );
}
