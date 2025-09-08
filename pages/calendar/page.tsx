
import { AppSidebar } from "@/components/calendar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/calendar/ui/sidebar";
import BigCalendar from "@/components/calendar/big-calendar";
import { CalendarProvider } from "@/components/calendar/event-calendar/calendar-context";

export default function Page() {
  return (
    <CalendarProvider>
    <SidebarProvider className="overflow-hidden max-h-screen bg-[#18181B] p-2">
      <AppSidebar/>
      <SidebarInset className="border dark:border-none rounded-xl dark:bg-[#232326] overflow-hidden">
          <BigCalendar />
      </SidebarInset>
    </SidebarProvider>
    </CalendarProvider> 
  );
}