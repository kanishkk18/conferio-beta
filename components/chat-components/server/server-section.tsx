"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { ServerWithMembersWithProfiles } from "types";
import { ActionTooltip } from "@/components/chat-components/action-tooltip";
// import { useModal } from "hooks/use-modal-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "../ui/dialog";
// import { useModal } from "hooks/use-modal-store";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/chat-components/user-avatar";
// import { useModal } from "hooks/use-modal-store";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required." })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'"
    }),
  type: z.nativeEnum(ChannelType)
});

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export function ServerSection({
  channelType,
  label,
  sectionType,
  role,
  server
}: ServerSectionProps) {
  // const { onOpen } = useModal();
    // const { isOpen, onClose, type, data } = useModal();
    const routerNext = useRouter();
    const { serverId } = routerNext.query;
    const [loadingId, setLoadingId] = useState("");
      const router = useRouter();
    
      // const { server } = data as { server: ServerWithMembersWithProfiles };
    
      const onKick = async (memberId: string) => {
        try {
          setLoadingId(memberId);
    
          const url = qs.stringifyUrl({
            url: `/api/members/${memberId}`,
            query: { serverId: server?.id }
          });
    
          const response = await axios.delete(url);
    
          router.reload();
          ({ server: response.data });
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
    
          const response = await axios.patch(url, { role });
    
          router.reload();
          ({ server: response.data });
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingId("");
        }
      };
  
    // const isModalOpen = isOpen && type === "createChannel";
    // const { channelType } = data;
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        type: channelType || ChannelType.TEXT
      }
    });
  
    useEffect(() => {
      if (channelType) {
        form.setValue("type", channelType);
      } else {
        form.setValue("type", ChannelType.TEXT);
      }
    }, [channelType, form]);
  
    const isLoading = form.formState.isSubmitting;
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/channels",
          query: { serverId }
        });
  
        await axios.post(url, values);
  
        form.reset();
        router.reload();
      } catch (error) {
        console.error(error);
      }
    };
  

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          
          <Dialog >
            <DialogTrigger>
              <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button></DialogTrigger>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter channel name"
                        className="bg-zinc-300/50 border-0 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="default">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          
           <Dialog>
           
            <DialogTrigger>
               <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button></DialogTrigger>
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
                        {server.userId !== member.user.id &&
                          loadingId !== member.id && (
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
                                        <DropdownMenuItem
                                          onClick={() => onRoleChange(member.id, "GUEST")}
                                        >
                                          <Shield className="h-4 w-4 mr-2" />
                                          Guest
                                          {member.role === "GUEST" && (
                                            <Check className="h4 w-4 ml-auto" />
                                          )}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            onRoleChange(member.id, "MODERATOR")
                                          }
                                        >
                                          <ShieldCheck className="h-4 w-4 mr-2" />
                                          Moderator
                                          {member.role === "MODERATOR" && (
                                            <Check className="h4 w-4 ml-auto" />
                                          )}
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
        </ActionTooltip>
      )}
    </div>
  );
}
