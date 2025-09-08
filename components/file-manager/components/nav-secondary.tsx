import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoonIcon, Settings2, SunIcon } from "lucide-react"

export function NavSecondary({
  ...props
}) {
  const [isDark, setIsDark] = React.useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          
            <SidebarMenuItem className=" space-y-1 ">
              <SidebarMenuButton asChild size="default"  className="dark:hover:bg-black/25">
                 <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleTheme}
                          className=" justify-start items-center relative overflow-hidden"
                        >
                          <div className={`transition-all duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
                            {isDark ? (
                              <SunIcon className="w-5 h-5" />
                            ) : (
                              <MoonIcon className="w-5 h-5" />
                            )}
                          </div>
                          <span className="font-normal">Theme</span>
                        </Button>
              </SidebarMenuButton>
              <SidebarMenuButton asChild size="sm" className="dark:hover:bg-black/25">
               <Link href="/settings/page"> <Settings2/> Settings</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

