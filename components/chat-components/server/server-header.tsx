// 'use client';

// import React, { useState } from 'react';
// import { MemberRole } from '@prisma/client';
// import {
//   Check,
//   ChevronDown,
//   Copy,
//   LogOutIcon,
//   PlusCircle,
//   RefreshCw,
//   Settings,
//   Trash,
//   UserPlus,
//   Users,
// } from 'lucide-react';

// import { ServerWithMembersWithProfiles } from 'types';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// // import { useModal } from "hooks/use-modal-store";
// import Image from 'next/image';
// // import { LeaveServerModal } from "../modals/leave-server-modal";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '@/components/ui/hover-card';
// import {
//   AccordionMenu,
//   AccordionMenuGroup,
//   AccordionMenuIndicator,
//   AccordionMenuItem,
//   AccordionMenuLabel,
//   AccordionMenuSeparator,
// } from '@/components/ui/accordion-menu';
// import { Alert, AlertTitle } from '@/components/ui/alert';
// import { Badge } from '@/components/ui/badge';
// import { RiCheckboxCircleFill } from '@remixicon/react';
// import { HelpCircle, Info, Mail, User } from 'lucide-react';
// import { toast } from 'sonner';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { useOrigin } from 'hooks/use-origin';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface ServerHeaderProps {
//   server: ServerWithMembersWithProfiles;
//   role?: MemberRole;
// }

// export function ServerHeader({ server, role }: ServerHeaderProps) {
//   // const { onOpen } = useModal();
//   // const { isOpen, onOpen, onClose, type, data } = useModal();
//   const origin = useOrigin();

//   // const isModalOpen = isOpen && type === "invite";
//   // const { server } = data;

//   const [copied, setCopied] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

//   const onCopy = () => {
//     navigator.clipboard.writeText(inviteUrl);
//     setCopied(true);

//     setTimeout(() => {
//       setCopied(false);
//     }, 1000);
//   };

//   const onNew = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.patch(
//         `/api/servers/${server?.id}/invite-code`
//       );

//       ({ server: response.data });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       await axios.patch(`/api/servers/${server?.id}/leave`);
//       router.refresh();
//       router.push('/maindashboard');
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isAdmin = role === MemberRole.ADMIN;
//   const isModerator = isAdmin || role === MemberRole.MODERATOR;

//   return (
//     // <DropdownMenu>
//     //   <DropdownMenuTrigger className="focus:outline-none z-50 w-fit bg-transparent border-none" asChild>
//     //     <button className="w-full bg-transparent border-none text-md text-white font-bold capitalize px-3 flex items-center h-12 hover:border-neutral-200 dark:hover:border-neutral-800 border-b hover:bg-zinc-700/10 dark:hover:bg-zinc-700/80 transition">
//     //       <div className="flex justify-center items-center gap-2"> <Image src={server.imageUrl} alt={server.name} width={1000} height={1000} className="rounded-full h-5 w-5" />{server.name}</div>
//     //       <ChevronDown className="h-5 w-5 ml-auto" />
//     //     </button>
//     //   </DropdownMenuTrigger>
//     //   <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
//     //
//     //     {isAdmin && (
//     //       <DropdownMenuItem
//     //         onClick={() => onOpen("editServer", { server })}
//     //         className="px-3 py-2 text-sm cursor-pointer"
//     //       >
//     //         Server Settings
//     //         <Settings className="h-4 w-4 ml-auto" />
//     //       </DropdownMenuItem>
//     //     )}
//     //     {isAdmin && (
//     //       <DropdownMenuItem
//     //         onClick={() => onOpen("members", { server })}
//     //         className="px-3 py-2 text-sm cursor-pointer"
//     //       >
//     //         Manage Members
//     //         <Users className="h-4 w-4 ml-auto" />
//     //       </DropdownMenuItem>
//     //     )}
//     //     {isModerator && (
//     //       <DropdownMenuItem
//     //         onClick={() => onOpen("createChannel")}
//     //         className="px-3 py-2 text-sm cursor-pointer"
//     //       >
//     //         Create Channel
//     //         <PlusCircle className="h-4 w-4 ml-auto" />
//     //       </DropdownMenuItem>
//     //     )}
//     //     {isModerator && <DropdownMenuSeparator />}
//     //     {isAdmin && (
//     //       <DropdownMenuItem
//     //         onClick={() => onOpen("deleteServer", { server })}
//     //         className="px-3 py-2 text-sm cursor-pointer text-rose-500"
//     //       >
//     //         Delete Server
//     //         <Trash className="h-4 w-4 ml-auto" />
//     //       </DropdownMenuItem>
//     //     )}
//     //
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
//     <HoverCard>
//       <HoverCardTrigger
//         className="focus:outline-none z-50 w-fit bg-transparent border-none"
//         asChild
//       >
//         <button className="w-full bg-transparent border-none text-md text-white font-bold capitalize px-3 flex items-center h-12 hover:border-neutral-200 dark:hover:border-neutral-800 border-b hover:bg-zinc-700/10 dark:hover:bg-zinc-700/80 transition">
//           <div className="flex justify-center items-center gap-2">
//             {' '}
//             <Image
//               src={server.imageUrl}
//               alt={server.name}
//               width={1000}
//               height={1000}
//               className="rounded-full h-5 w-5"
//             />
//             {server.name}
//           </div>
//           <ChevronDown className="h-5 w-5 ml-auto" />
//         </button>
//       </HoverCardTrigger>
//       <HoverCardContent className="dark:bg-black border-none p-0">
//         <div className="w-full overflow-hidden border border-border rounded-md p-2">
//           <AccordionMenu
//             type="single"
//             collapsible
//             classNames={{
//               separator: '-mx-2 mb-2.5',
//             }}
//           >
//             {/* Menu Label */}
//             <AccordionMenuLabel>My Account</AccordionMenuLabel>
//             <AccordionMenuSeparator />
//             {/* Menu Items */}
//             <AccordionMenuGroup>
//               {isModerator && (
//                 <AccordionMenuItem value="profile">
//                   <Dialog>
//                     <DialogTrigger>
//                       Invite People
//                       <UserPlus className="h-4 w-4 ml-auto" />
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader className="pt-8 px-6">
//                         <DialogTitle className="text-2xl text-center font-bold">
//                           Invite Friends
//                         </DialogTitle>
//                       </DialogHeader>
//                       <div className="p-6">
//                         <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
//                           Server invite link
//                         </Label>
//                         <div className="flex items-center mt-2 gap-x-2">
//                           <Input
//                             readOnly
//                             disabled={isLoading}
//                             value={inviteUrl}
//                             className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
//                           />
//                           <Button
//                             disabled={isLoading}
//                             onClick={onCopy}
//                             size="icon"
//                           >
//                             {copied ? (
//                               <Check className="w-4 h-4" />
//                             ) : (
//                               <Copy className="w-4 h-4" />
//                             )}
//                           </Button>
//                         </div>
//                         <Button
//                           disabled={isLoading}
//                           onClick={onNew}
//                           variant="link"
//                           size="sm"
//                           className="text-xs text-zinc-500 mt-4"
//                         >
//                           Generate a new link
//                           <RefreshCw className="w-4 h-4 ml-2" />
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </AccordionMenuItem>
//               )}

//               <AccordionMenuItem value="/inbox">
//                 <Mail />
//                 <span>Inbox</span>
//               </AccordionMenuItem>

//               <AccordionMenuItem value="settings">
//                 <Settings />
//                 <span>Settings</span>
//               </AccordionMenuItem>
//               <AccordionMenuItem value="about">
//                 <Info />
//                 <span>About</span>
//               </AccordionMenuItem>



//               {!isAdmin && (
//                 <AccordionMenuItem value="help">
//                   <Dialog>
//                     <DialogTrigger>
//                       {' '}
//                       Leave Server
//                       <LogOutIcon className="h-4 w-4 ml-auto" />
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader className="pt-8 px-6">
//                         <DialogTitle className="text-2xl text-center font-bold">
//                           Leave Server
//                         </DialogTitle>
//                         <DialogDescription className="text-center text-zinc-500">
//                           Are you sure? You want to leave{' '}
//                           <span className="font-semibold text-indigo-500">
//                             {server?.name}
//                           </span>
//                           ?
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="flex items-center justify-between w-full">
//                         <Button variant="ghost">Cancel</Button>
//                         <Button
//                           variant="default"
//                           disabled={isLoading}
//                           onClick={onClick}
//                         >
//                           Confirm
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </AccordionMenuItem>
//               )}
//             </AccordionMenuGroup>
//           </AccordionMenu>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { MemberRole, ChannelType } from "@prisma/client";
import {
  Check,
  ChevronDown,
  Copy,
  PlusCircle,
  RefreshCw,
  Settings,
  Trash,
  UserPlus,
  Users,
  HelpCircle,
  LogOutIcon,
} from "lucide-react";

import { ServerWithMembersWithProfiles } from "types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AccordionMenu,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuLabel,
  AccordionMenuSeparator,
} from '@/components/ui/accordion-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useOrigin } from "hooks/use-origin";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { DialogFooter } from "../ui/dialog";
import qs from "query-string";
import {
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/chat-components/user-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FileUpload } from "../file-upload";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
  channelType?: ChannelType;
  serverId?: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." })
});

const channelFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required." })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'"
    }),
  type: z.nativeEnum(ChannelType)
});

export function ServerHeader({ server, role, serverId }: ServerHeaderProps) {
  const origin = useOrigin();
  const router = useRouter();
  
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  // Server form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  });

  // Channel form
  const channelForm = useForm({
    resolver: zodResolver(channelFormSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    }
  });

  useEffect(() => {
    if (server) {
      form.reset({
        name: server.name,
        imageUrl: server.imageUrl
      });
    }
  }, [server, form, isDialogOpen]);

  const onServerSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}`, values);
      
      form.reset();
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      router.refresh();
      router.push('/maindashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onNewInvite = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/invite-code`);
      // Handle success (maybe show a toast notification)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChannelSubmit = async (values: z.infer<typeof channelFormSchema>) => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: { serverId }
      });
      await axios.post(url, values);
      channelForm.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id }
      });
      await axios.delete(url);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id }
      });
      await axios.patch(url, { role });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  const onDeleteServer = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      router.refresh();
      router.push("/chat");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
  };

  return (
    <HoverCard>
      <HoverCardTrigger className="focus:outline-none z-50 w-fit bg-transparent border-none" asChild>
        <button className="w-full bg-transparent border-none text-md text-white font-bold capitalize px-3 flex items-center h-12 hover:border-neutral-200 dark:hover:border-neutral-800 border-b hover:bg-zinc-700/10 dark:hover:bg-zinc-700/80 transition">
          <div className="flex justify-center items-center gap-2">
            <Image src={server.imageUrl} alt={server.name} width={20} height={20} className="rounded-full h-5 w-5" />
            {server.name}
          </div>
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="dark:bg-black border-none p-0">
        <div className="w-full overflow-hidden border border-border rounded-md p-2">
          <AccordionMenu type="single" collapsible>
            <AccordionMenuLabel>Server Options</AccordionMenuLabel>
            <AccordionMenuSeparator />
            <AccordionMenuGroup>
              {isModerator && (
                <AccordionMenuItem value="invite">
                  <Dialog>
                    <DialogTrigger className="w-full text-left flex items-center justify-between">
                      Invite People
                      <UserPlus className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                          Invite Friends
                        </DialogTitle>
                      </DialogHeader>
                      <div className="p-6">
                        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Server invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                          <Input
                            readOnly
                            disabled={isLoading}
                            value={inviteUrl}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          />
                          <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <Button
                          disabled={isLoading}
                          onClick={onNewInvite}
                          variant="link"
                          size="sm"
                          className="text-xs text-zinc-500 mt-4"
                        >
                          Generate a new link
                          <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </AccordionMenuItem>
              )}

              {isAdmin && (
                 <Dialog>
                  <DialogTrigger className="w-full">
                    <Button variant="ghost" className="text-sm w-full px-2 py-0 font-normal flex items-center justify-between ">
                       <p>Server Settings</p>
                      <Settings className="h-4 w-4 text-zinc-200" />
                    </Button>
                    </DialogTrigger>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize Your ChatSpace
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your ChatSpace a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onServerSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter server name"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                variant="default"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
              
              )}

              
              {isAdmin && (
                <AccordionMenuItem value="members">
                  <Dialog>
                    <DialogTrigger className="w-full text-left flex items-center justify-between">
                      Manage Members
                      <Users className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black overflow-hidden">
                      <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                          Manage Members
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                          {server?.members?.length} Members
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="mt-8 max-h-[420px] pr-6">
                        {server?.members?.map((member) => (
                          <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.user.image as string} />
                            <div className="flex flex-col gap-y-1">
                              <div className="text-xs font-semibold flex items-center">
                                {member.user.name}
                                {roleIconMap[member.role]}
                              </div>
                              <p className="text-xs text-zinc-500">{member.user.email}</p>
                            </div>
                            {server.userId !== member.user.id && loadingId !== member.id && (
                              <div className="ml-auto">
                                <DropdownMenu>
                                  <DropdownMenuTrigger>
                                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent side="left">
                                    <DropdownMenuSub>
                                      <DropdownMenuSubTrigger className="flex items-center">
                                        <ShieldQuestion className="w-4 h-4 mr-2" />
                                        <span>Role</span>
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                          <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                            <Shield className="h-4 w-4 mr-2" />
                                            Guest
                                            {member.role === "GUEST" && <Check className="h4 w-4 ml-auto" />}
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                            Moderator
                                            {member.role === "MODERATOR" && <Check className="h4 w-4 ml-auto" />}
                                          </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                      </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => onKick(member.id)}>
                                      <Gavel className="h-4 w-4 mr-2" />
                                      Kick
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}
                            {loadingId === member.id && (
                              <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            )}
                          </div>
                        ))}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </AccordionMenuItem>
              )}

              {isAdmin && (
                <AccordionMenuItem value="delete">
                  <Dialog>
                    <DialogTrigger className="w-full text-left flex items-center justify-between text-rose-500">
                      Delete Server
                      <Trash className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black p-0 overflow-hidden">
                      <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                          Delete Server
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                          Are you sure you want to do this?
                          <br />
                          <span className="font-semibold text-indigo-500">
                            {server?.name}
                          </span>{" "}
                          will be permanently deleted.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full">
                          <Button variant="ghost" disabled={isLoading}>
                            Cancel
                          </Button>
                          <Button onClick={onDeleteServer} variant="default" disabled={isLoading}>
                            Confirm
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </AccordionMenuItem>
              )}

              {!isAdmin && (
                <AccordionMenuItem value="help">
                  <Dialog>
                    <DialogTrigger className="w-full flex items-center justify-center gap-3">
                      {' '}
                      Leave Server
                      <LogOutIcon className="h-4 w-4 ml-auto" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                          Leave Server
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                          Are you sure? You want to leave{' '}
                          <span className="font-semibold text-indigo-500">
                            {server?.name}
                          </span>
                          ?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-between w-full">
                        <Button variant="ghost">Cancel</Button>
                        <Button
                          variant="default"
                          disabled={isLoading}
                          onClick={onClick}
                        >
                          Confirm
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </AccordionMenuItem>
              )}

            </AccordionMenuGroup>
          </AccordionMenu>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}