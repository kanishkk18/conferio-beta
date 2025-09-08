'use client'

// import Link from 'next/link';
import Settingheader from './header';

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Security from './security';
// import Integrations from 'pages/integrations/page';
import { Teams } from '@/components/team';
// import type { NextPageWithLayout } from 'types/next';
import type {
  GetServerSidePropsContext,
  // InferGetServerSidePropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from '@/lib/session';
import { getUserBySession } from 'models/user';
import { UpdateAccount } from '@/components/account';
import env from '@/lib/env';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Clock, Calendar } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox';

const DAYS = [
  'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 
  'THURSDAY', 'FRIDAY', 'SATURDAY'
]

// Type for day availability
type DayAvailability = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Type for availability state
type AvailabilityState = {
  timeGap: number;
  days: DayAvailability[];
}

// type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

//  const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getSession(context.req, context.res);
//   const user = await getUserBySession(session);
//   const { locale } = context;

//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         image: user.image,
//       },
//       allowEmailChange: env.confirmEmail === false,
//     },
//   };
// };

export default function Dashboard({
  user,
  allowEmailChange,
}) {

    const { data: session, status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()
  
  // Initialize with empty days array
  const [availability, setAvailability] = useState<AvailabilityState>({
    timeGap: 30,
    days: []
  })

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch availability
  const { isLoading: isAvailabilityLoading } = useQuery({
    queryKey: ['availability'],
    queryFn: async () => {
      const response = await fetch('/api/availability/me')
      if (!response.ok) throw new Error('Failed to fetch availability')
      const data = await response.json()
      
      // If we have data, set it
      if (data.availability) {
        setAvailability(data.availability)
      } else {
        // Initialize with default values if no availability
        setAvailability({
          timeGap: 30,
          days: DAYS.map(day => ({
            day,
            startTime: '09:00',
            endTime: '17:00',
            isAvailable: day !== 'SUNDAY' && day !== 'SATURDAY'
          }))
        })
      }
      
      return data
    },
    enabled: !!session,
  })

  // Fetch integrations
  const { data: integrations, isLoading: isIntegrationsLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: async () => {
      const response = await fetch('/api/integration/all')
      if (!response.ok) throw new Error('Failed to fetch integrations')
      return response.json()
    },
    enabled: !!session,
  })

  // Update availability mutation
  const updateAvailabilityMutation = useMutation({
    mutationFn: async (data: AvailabilityState) => {
      const response = await fetch('/api/availability/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update availability')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] })
    },
  })

  // Connect integration mutation
  const connectIntegrationMutation = useMutation({
    mutationFn: async (appType: string) => {
      const response = await fetch(`/api/integration/connect/${appType}`)
      if (!response.ok) throw new Error('Failed to get connection URL')
      const data = await response.json()
      window.location.href = data.url
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateAvailabilityMutation.mutate(availability)
  }

  if (status === 'loading' || isAvailabilityLoading || isIntegrationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Settingheader />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 dark:bg-[#141414] p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <Tabs
          defaultValue="account"
          className="mx-auto grid w-full max-w-9xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[300px_1fr]"
        >
          <TabsList
            className="grid gap-4 text-sm  text-start bg-transparent text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <TabsTrigger value="account" className='text-start'>Account</TabsTrigger>
            <TabsTrigger value="Security" className='text-start'>Security</TabsTrigger>
            <TabsTrigger value="Teams">Teams</TabsTrigger>
            <TabsTrigger value="Integration">Integrations</TabsTrigger>
            <TabsTrigger value="Availability">Availability</TabsTrigger>
            {/* <TabsTrigger value="Support">Support</TabsTrigger> */}
          </TabsList>
          <div className="grid gap-6">
            <TabsContent value="account">
            {/* <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
 */}

<UpdateAccount user={user} allowEmailChange={allowEmailChange} />
            </TabsContent>
            <TabsContent value="Security">
             <Security sessionStrategy="jwt"/>
            </TabsContent>
            <TabsContent value="Integration">
         

          {/* Integrations */}
          <Card className='dark:bg-black'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect your calendar and video conferencing apps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations?.integrations?.map((integration: any) => (
                  <div key={integration.app_type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{integration.title}</h3>
                      <p className="text-sm text-gray-600">{integration.category}</p>
                    </div>
                    {integration.isConnected ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">Connected</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => connectIntegrationMutation.mutate(integration.app_type)}
                        disabled={connectIntegrationMutation.isPending}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        
            </TabsContent>
             <TabsContent value="Teams">
             <Teams />
            </TabsContent>
            <TabsContent value="Availability">
               <Card className='dark:bg-black'>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Availability
              </CardTitle>
              <CardDescription>
                Set your working hours and time preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='bg-transparent'>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Gap Between Meetings (minutes)
                  </label>
                  <Input
                    type="number"
                    value={availability.timeGap}
                    onChange={(e) => setAvailability({
                      ...availability,
                      timeGap: parseInt(e.target.value) || 30
                    })}
                    min="0"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Weekly Schedule</h3>
                  {DAYS.map((day, index) => {
                    // Find day in availability or create default
                    const dayAvail = availability.days.find(d => d.day === day) || {
                      day,
                      startTime: '09:00',
                      endTime: '17:00',
                      isAvailable: day !== 'SUNDAY' && day !== 'SATURDAY'
                    };
                    
                    const dayIndex = availability.days.findIndex(d => d.day === day);
                    
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-24">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={dayAvail.isAvailable}
                              onChange={(e) => {
                                const newDays = [...availability.days];
                                
                                if (dayIndex === -1) {
                                  // Add new day
                                  newDays.push({
                                    ...dayAvail,
                                    isAvailable: e.target.checked
                                  });
                                } else {
                                  // Update existing day
                                  newDays[dayIndex] = {
                                    ...newDays[dayIndex],
                                    isAvailable: e.target.checked
                                  };
                                }
                                
                                setAvailability({ ...availability, days: newDays });
                              }}
                              className="mr-2"
                            />
                            {day.charAt(0) + day.slice(1).toLowerCase()}
                          </label>
                        </div>
                        {dayAvail.isAvailable && (
                          <>
                            <Input
                              type="time"
                              value={dayAvail.startTime}
                              onChange={(e) => {
                                const newDays = [...availability.days];
                                
                                if (dayIndex === -1) {
                                  newDays.push({
                                    ...dayAvail,
                                    startTime: e.target.value
                                  });
                                } else {
                                  newDays[dayIndex] = {
                                    ...newDays[dayIndex],
                                    startTime: e.target.value
                                  };
                                }
                                
                                setAvailability({ ...availability, days: newDays });
                              }}
                              className="w-32"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={dayAvail.endTime}
                              onChange={(e) => {
                                const newDays = [...availability.days];
                                
                                if (dayIndex === -1) {
                                  newDays.push({
                                    ...dayAvail,
                                    endTime: e.target.value
                                  });
                                } else {
                                  newDays[dayIndex] = {
                                    ...newDays[dayIndex],
                                    endTime: e.target.value
                                  };
                                }
                                
                                setAvailability({ ...availability, days: newDays });
                              }}
                              className="w-32"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Button
                  type="submit"
                  disabled={updateAvailabilityMutation.isPending}
                  className="w-full"
                >
                  {updateAvailabilityMutation.isPending ? 'Saving...' : 'Save Availability'}
                </Button>
              </form>
            </CardContent>
          </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

// 'use client'

// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Settings, Clock, Calendar } from 'lucide-react'

// const DAYS = [
//   'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 
//   'THURSDAY', 'FRIDAY', 'SATURDAY'
// ]

// export default function SettingsPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const queryClient = useQueryClient()
  
//   const [availability, setAvailability] = useState({
//     timeGap: 30,
//     days: DAYS.map(day => ({
//       day,
//       startTime: '09:00',
//       endTime: '17:00',
//       isAvailable: day !== 'SUNDAY' && day !== 'SATURDAY'
//     }))
//   })

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin')
//     }
//   }, [status, router])

//   const { data: availabilityData, isLoading } = useQuery({
//     queryKey: ['availability'],
//     queryFn: async () => {
//       const response = await fetch('/api/availability/me')
//       if (!response.ok) throw new Error('Failed to fetch availability')
//       return response.json()
//     },
//     enabled: !!session,
//   })

  
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         const response = await fetch('/api/availability/me');
//         const data = await response.json();
//         if (response.ok) {
//           setAvailability(data.availability);
//         }
//       } catch (error) {
//         console.error('Failed to fetch availability:', error);
//       }
//     };

//     fetchAvailability();
//   }, []);

//   const { data: integrations } = useQuery({
//     queryKey: ['integrations'],
//     queryFn: async () => {
//       const response = await fetch('/api/integration/all')
//       if (!response.ok) throw new Error('Failed to fetch integrations')
//       return response.json()
//     },
//     enabled: !!session,
//   })

//   useEffect(() => {
//     if (availabilityData?.availability) {
//       setAvailability(availabilityData.availability)
//     }
//   }, [availabilityData])

//   const updateAvailabilityMutation = useMutation({
//     mutationFn: async (data: typeof availability) => {
//       const response = await fetch('/api/availability/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//       if (!response.ok) throw new Error('Failed to update availability')
//       return response.json()
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['availability'] })
//     },
//   })

//   const connectIntegrationMutation = useMutation({
//     mutationFn: async (appType: string) => {
//       const response = await fetch(`/api/integration/connect/${appType}`)
//       if (!response.ok) throw new Error('Failed to get connection URL')
//       const data = await response.json()
//       window.location.href = data.url
//     },
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     updateAvailabilityMutation.mutate(availability)
//   }

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   if (status === 'unauthenticated') {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center gap-4">
//             <Settings className="w-8 h-8" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//               <p className="text-gray-600">
//                 Manage your availability and integrations
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Availability Settings */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 Availability
//               </CardTitle>
//               <CardDescription>
//                 Set your working hours and time preferences
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Time Gap Between Meetings (minutes)
//                   </label>
//                   <Input
//                     type="number"
//                     value={availability.timeGap}
//                     onChange={(e) => setAvailability({
//                       ...availability,
//                       timeGap: parseInt(e.target.value)
//                     })}
//                     min="0"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-medium text-gray-900">Weekly Schedule</h3>
//                   {availability.days.map((dayAvail, index) => (
//                     <div key={dayAvail.day} className="flex items-center gap-4">
//                       <div className="w-24">
//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             checked={dayAvail.isAvailable}
//                             onChange={(e) => {
//                               const newDays = [...availability.days]
//                               newDays[index].isAvailable = e.target.checked
//                               setAvailability({ ...availability, days: newDays })
//                             }}
//                             className="mr-2"
//                           />
//                           {dayAvail.day.charAt(0) + dayAvail.day.slice(1).toLowerCase()}
//                         </label>
//                       </div>
//                       {dayAvail.isAvailable && (
//                         <>
//                           <Input
//                             type="time"
//                             value={dayAvail.startTime}
//                             onChange={(e) => {
//                               const newDays = [...availability.days]
//                               newDays[index].startTime = e.target.value
//                               setAvailability({ ...availability, days: newDays })
//                             }}
//                             className="w-32"
//                           />
//                           <span className="text-gray-500">to</span>
//                           <Input
//                             type="time"
//                             value={dayAvail.endTime}
//                             onChange={(e) => {
//                               const newDays = [...availability.days]
//                               newDays[index].endTime = e.target.value
//                               setAvailability({ ...availability, days: newDays })
//                             }}
//                             className="w-32"
//                           />
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={updateAvailabilityMutation.isPending}
//                   className="w-full"
//                 >
//                   {updateAvailabilityMutation.isPending ? 'Saving...' : 'Save Availability'}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Integrations */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5" />
//                 Integrations
//               </CardTitle>
//               <CardDescription>
//                 Connect your calendar and video conferencing apps
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {integrations?.integrations?.map((integration: any) => (
//                   <div key={integration.app_type} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div>
//                       <h3 className="font-medium">{integration.title}</h3>
//                       <p className="text-sm text-gray-600">{integration.category}</p>
//                     </div>
//                     {integration.isConnected ? (
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-green-600">Connected</span>
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       </div>
//                     ) : (
//                       <Button
//                         variant="outline"
//                         onClick={() => connectIntegrationMutation.mutate(integration.app_type)}
//                         disabled={connectIntegrationMutation.isPending}
//                       >
//                         Connect
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Profile Information */}
//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//             <CardDescription>
//               Your public profile details
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name
//                 </label>
//                 <Input value={session?.user?.name || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <Input value={session?.user?.email || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Username
//                 </label>
//                 <Input value={session?.user?.username || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Public Booking Link
//                 </label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                     {window.location.origin}/
//                   </span>
//                   <Input 
//                     value={session?.user?.username || ''} 
//                     disabled 
//                     className="rounded-l-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }




// 'use client'

// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Settings, Clock, Calendar } from 'lucide-react'

// const DAYS = [
//   'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 
//   'THURSDAY', 'FRIDAY', 'SATURDAY'
// ]

// // Type for day availability
// type DayAvailability = {
//   day: string;
//   startTime: string;
//   endTime: string;
//   isAvailable: boolean;
// }

// // Type for availability state
// type AvailabilityState = {
//   timeGap: number;
//   days: DayAvailability[];
// }

// export default function SettingsPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const queryClient = useQueryClient()
  
//   // Initialize with empty days array
//   const [availability, setAvailability] = useState<AvailabilityState>({
//     timeGap: 30,
//     days: []
//   })

//   // Redirect if unauthenticated
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin')
//     }
//   }, [status, router])

//   // Fetch availability
//   const { isLoading: isAvailabilityLoading } = useQuery({
//     queryKey: ['availability'],
//     queryFn: async () => {
//       const response = await fetch('/api/availability/me')
//       if (!response.ok) throw new Error('Failed to fetch availability')
//       const data = await response.json()
      
//       // If we have data, set it
//       if (data.availability) {
//         setAvailability(data.availability)
//       } else {
//         // Initialize with default values if no availability
//         setAvailability({
//           timeGap: 30,
//           days: DAYS.map(day => ({
//             day,
//             startTime: '09:00',
//             endTime: '17:00',
//             isAvailable: day !== 'SUNDAY' && day !== 'SATURDAY'
//           }))
//         })
//       }
      
//       return data
//     },
//     enabled: !!session,
//   })

//   // Fetch integrations
//   const { data: integrations, isLoading: isIntegrationsLoading } = useQuery({
//     queryKey: ['integrations'],
//     queryFn: async () => {
//       const response = await fetch('/api/integration/all')
//       if (!response.ok) throw new Error('Failed to fetch integrations')
//       return response.json()
//     },
//     enabled: !!session,
//   })

//   // Update availability mutation
//   const updateAvailabilityMutation = useMutation({
//     mutationFn: async (data: AvailabilityState) => {
//       const response = await fetch('/api/availability/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//       if (!response.ok) throw new Error('Failed to update availability')
//       return response.json()
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['availability'] })
//     },
//   })

//   // Connect integration mutation
//   const connectIntegrationMutation = useMutation({
//     mutationFn: async (appType: string) => {
//       const response = await fetch(`/api/integration/connect/${appType}`)
//       if (!response.ok) throw new Error('Failed to get connection URL')
//       const data = await response.json()
//       window.location.href = data.url
//     },
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     updateAvailabilityMutation.mutate(availability)
//   }

//   if (status === 'loading' || isAvailabilityLoading || isIntegrationsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   if (status === 'unauthenticated') {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center gap-4">
//             <Settings className="w-8 h-8" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//               <p className="text-gray-600">
//                 Manage your availability and integrations
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Availability Settings */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 Availability
//               </CardTitle>
//               <CardDescription>
//                 Set your working hours and time preferences
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Time Gap Between Meetings (minutes)
//                   </label>
//                   <Input
//                     type="number"
//                     value={availability.timeGap}
//                     onChange={(e) => setAvailability({
//                       ...availability,
//                       timeGap: parseInt(e.target.value) || 30
//                     })}
//                     min="0"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="font-medium text-gray-900">Weekly Schedule</h3>
//                   {DAYS.map((day, index) => {
//                     // Find day in availability or create default
//                     const dayAvail = availability.days.find(d => d.day === day) || {
//                       day,
//                       startTime: '09:00',
//                       endTime: '17:00',
//                       isAvailable: day !== 'SUNDAY' && day !== 'SATURDAY'
//                     };
                    
//                     const dayIndex = availability.days.findIndex(d => d.day === day);
                    
//                     return (
//                       <div key={day} className="flex items-center gap-4">
//                         <div className="w-24">
//                           <label className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={dayAvail.isAvailable}
//                               onChange={(e) => {
//                                 const newDays = [...availability.days];
                                
//                                 if (dayIndex === -1) {
//                                   // Add new day
//                                   newDays.push({
//                                     ...dayAvail,
//                                     isAvailable: e.target.checked
//                                   });
//                                 } else {
//                                   // Update existing day
//                                   newDays[dayIndex] = {
//                                     ...newDays[dayIndex],
//                                     isAvailable: e.target.checked
//                                   };
//                                 }
                                
//                                 setAvailability({ ...availability, days: newDays });
//                               }}
//                               className="mr-2"
//                             />
//                             {day.charAt(0) + day.slice(1).toLowerCase()}
//                           </label>
//                         </div>
//                         {dayAvail.isAvailable && (
//                           <>
//                             <Input
//                               type="time"
//                               value={dayAvail.startTime}
//                               onChange={(e) => {
//                                 const newDays = [...availability.days];
                                
//                                 if (dayIndex === -1) {
//                                   newDays.push({
//                                     ...dayAvail,
//                                     startTime: e.target.value
//                                   });
//                                 } else {
//                                   newDays[dayIndex] = {
//                                     ...newDays[dayIndex],
//                                     startTime: e.target.value
//                                   };
//                                 }
                                
//                                 setAvailability({ ...availability, days: newDays });
//                               }}
//                               className="w-32"
//                             />
//                             <span className="text-gray-500">to</span>
//                             <Input
//                               type="time"
//                               value={dayAvail.endTime}
//                               onChange={(e) => {
//                                 const newDays = [...availability.days];
                                
//                                 if (dayIndex === -1) {
//                                   newDays.push({
//                                     ...dayAvail,
//                                     endTime: e.target.value
//                                   });
//                                 } else {
//                                   newDays[dayIndex] = {
//                                     ...newDays[dayIndex],
//                                     endTime: e.target.value
//                                   };
//                                 }
                                
//                                 setAvailability({ ...availability, days: newDays });
//                               }}
//                               className="w-32"
//                             />
//                           </>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={updateAvailabilityMutation.isPending}
//                   className="w-full"
//                 >
//                   {updateAvailabilityMutation.isPending ? 'Saving...' : 'Save Availability'}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Integrations */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5" />
//                 Integrations
//               </CardTitle>
//               <CardDescription>
//                 Connect your calendar and video conferencing apps
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {integrations?.integrations?.map((integration: any) => (
//                   <div key={integration.app_type} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div>
//                       <h3 className="font-medium">{integration.title}</h3>
//                       <p className="text-sm text-gray-600">{integration.category}</p>
//                     </div>
//                     {integration.isConnected ? (
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-green-600">Connected</span>
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       </div>
//                     ) : (
//                       <Button
//                         variant="outline"
//                         onClick={() => connectIntegrationMutation.mutate(integration.app_type)}
//                         disabled={connectIntegrationMutation.isPending}
//                       >
//                         Connect
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Profile Information */}
//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//             <CardDescription>
//               Your public profile details
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name
//                 </label>
//                 <Input value={session?.user?.name || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <Input value={session?.user?.email || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Username
//                 </label>
//                 <Input value={session?.user?.username || ''} disabled />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Public Booking Link
//                 </label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                     {typeof window !== 'undefined' ? window.location.origin : ''}/
//                   </span>
//                   <Input 
//                     value={session?.user?.username || ''} 
//                     disabled 
//                     className="rounded-l-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }