import { AppSidebar } from '@/components/file-manager/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/file-manager/components/ui/sidebar';
import TableUpload from '@/lib/components/table-upload';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <SidebarProvider className=" bg-[#F5F5F5] dark:bg-[#262626] p-2 overflow-hidden">
      <AppSidebar className=" h-screen mr-2 w-60 bg-transparent" />
      <SidebarInset className=" border flex flex-col dark:border-none dark:bg-[#111112] rounded-2xl ">
        <ScrollArea className="p-2 px-3">
          
            {/* {analytics.chart && analytics.chart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Activity</CardTitle>
            <CardDescription>
              Your file upload activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={analytics.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Date
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {label}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Files
                              </span>
                              <span className="font-bold">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="uploadedFiles" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )} */}
          
          <TableUpload />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
