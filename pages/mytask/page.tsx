// "use client"

// import { useCallback, useState, useEffect } from "react"
// import { Plus, RepeatIcon, Settings2Icon, WallpaperIcon, XIcon } from "lucide-react"
// import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
// import { toast } from "sonner"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// // import { Slider } from "../../components/components/ui/slider"
// import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs"

// import SortableList, { Item, SortableListItem } from "@/components/ui/Sortable-List"
// import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// import { ArrowRight, Search } from "lucide-react";
// import { useId } from "react";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import Wallpaper from "@/components/ui/wallpaper"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import Mainsidebar from "@/components/ui/mainSideBar"
// import TaskEmptyState from "@/components/tasks/task-empty-state";
// import UserTask from "interfaces/task";
// import { TaskList } from "@/components/tasks/task-list";
// import TaskSkeleton from "@/components/tasks/task-skeleton";
// import { MyTaskList } from "@/components/tasks/myTask-list"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { TaskForm } from "@/components/tasks/task-form"

// const initialState = [
//   {
//     text: "edit name",
//     checked: false,
//     id: 1,
//     description:
//       "Collect relevant marketing copy from the user's website ",
//   },
//   {
//     text: "rename it",
//     checked: false,
//     id: 2,
//     description:
//       "As an AI language model, analyze the collected ",
//   },
 
// ]


// function MyTask() {
//   const [items, setItems] = useState<Item[]>(initialState)
//   const [openItemId, setOpenItemId] = useState<number | null>(null)
//   const [tabChangeRerender, setTabChangeRerender] = useState<number>(1)
//   const [wallpaper, setWallpaper] = useState('')
//    const [task, setTask] = useState<UserTask[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchTasks = async () => {
//         setIsLoading(true);
//         try {
//           const response = await fetch("/api/task", {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
  
//           if (!response.ok) {
//             throw new Error("Failed to fetch user data");
//           }
  
//           const data = await response.json();
//           setTask(data);
//         } catch (error) {
//           console.error("Error fetching user session:", error);
//         }
//         setIsLoading(false);
//       };
  
//       const verifyUser = async () => {
//         const response = await fetch("/api/auth/services-signin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
  
//         if (!response.ok) {
//           console.error("Failed to verify user");
//         }
//       };
  
//       fetchTasks();
//       verifyUser();
//     }, []);
  

//   useEffect(() => {
//     const savedWallpaper = localStorage.getItem('chatWallpaper');
//     if (savedWallpaper) {
//       setWallpaper(savedWallpaper);
//     }
//   }, []);

//   const id = useId();

//   const handleCompleteItem = (id: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, checked: !item.checked } : item
//       )
//     )
//   }

//   const handleAddItem = () => {
//     setItems((prevItems) => [
//       ...prevItems,
//       {
//         text: `Item ${prevItems.length + 1}`,
//         checked: false,
//         id: Date.now(),
//         description: "",
//       },
//     ])
//   }

//   const handleResetItems = () => {
//     setItems(initialState)
//   }

//   const handleCloseOnDrag = useCallback(() => {
//     setItems((prevItems) => {
//       const updatedItems = prevItems.map((item) =>
//         item.checked ? { ...item, checked: false } : item
//       )
//       return updatedItems.some(
//         (item, index) => item.checked !== prevItems[index].checked
//       )
//         ? updatedItems
//         : prevItems
//     })
//   }, [])

//   const renderListItem = (
//     item: Item,
//     order: number,
//     onCompleteItem: (id: number) => void,
//     onRemoveItem: (id: number) => void
//   ) => {
//     const isOpen = item.id === openItemId

//     const tabs = [
//       {
//         id: 0,
//         label: "Title",
//         content: (
//           <div className="flex w-full flex-col pr-2 py-2">
//             <motion.div
//               initial={{ opacity: 0, filter: "blur(4px)" }}
//               animate={{ opacity: 1, filter: "blur(0px)" }}
//               transition={{
//                 type: "spring",
//                 bounce: 0.2,
//                 duration: 0.75,
//                 delay: 0.15,
//               }}
//             >
//               <label className="text-xs text-neutral-400">
//                 Short title for your task
//               </label>
//               <motion.input
//                 type="text"
//                 value={item.text}
//                 className=" w-full rounded-lg border font-semibold border-black/10 bg-neutral-800 px-1 py-[6px] text-xl md:text-3xl text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80 dark:border-white/10"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   const text = e.target.value
//                   setItems((prevItems) =>
//                     prevItems.map((i) =>
//                       i.id === item.id ? { ...i, text } : i
//                     )
//                   )
//                 }}
//               />
//             </motion.div>
//           </div>
//         ),
//       },
//       {
//         id: 1,
//         label: "description",
//         content: (
//           <div className="flex flex-col  pr-2 ">
//             <motion.div
//               initial={{ opacity: 0, filter: "blur(4px)" }}
//               animate={{ opacity: 1, filter: "blur(0px)" }}
//               transition={{
//                 type: "spring",
//                 bounce: 0.2,
//                 duration: 0.75,
//                 delay: 0.15,
//               }}
//             >
//               <label className="text-xs text-neutral-400" htmlFor="prompt">
//                 edit{" "}
//                 <span className="lowercase">
//                   your description {item.text.slice(0, 20)}
//                 </span>
//               </label>
//               <textarea
//                 id=""
//                 className="h-[100px] w-full resize-none rounded-[6px]  bg-neutral-800 px-2 py-[2px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80"
//                 value={item.description}
//                 placeholder="update description"
//                 onChange={(e) => {
//                   const description = e.target.value
//                   setItems((prevItems) =>
//                     prevItems.map((i) =>
//                       i.id === item.id ? { ...i, description } : i
//                     )
//                   )
//                 }}
//               />
//             </motion.div>
//           </div>
//         ),
//       },
//     ]

//     return (
//       <SortableListItem
//         item={item}
//         order={order}
//         key={item.id}
//         isExpanded={isOpen}
//         onCompleteItem={onCompleteItem}
//         onRemoveItem={onRemoveItem}
//         handleDrag={handleCloseOnDrag}
//         className="my-2 "
//         renderExtra={(item) => (
//           <div
//             key={`${isOpen}`}
//             className={cn(
//               "flex h-full w-full flex-col items-center justify-center gap-2 ",
//               isOpen ? "py-1 px-1" : "py-3 "
//             )}
//           >
//             <motion.button
//               layout
//               onClick={() => setOpenItemId(!isOpen ? item.id : null)}
//               key="collapse"
//               className={cn(
//                 isOpen
//                   ? "absolute right-3 top-3 z-10 "
//                   : "relative z-10 ml-auto mr-3 "
//               )}
//             >
//               {isOpen ? (
//                 <motion.span
//                   initial={{ opacity: 0, filter: "blur(4px)" }}
//                   animate={{ opacity: 1, filter: "blur(0px)" }}
//                   exit={{ opacity: 1, filter: "blur(0px)" }}
//                   transition={{
//                     type: "spring",
//                     duration: 1.95,
//                   }}
//                 >
//                   <XIcon className="h-5 w-5 text-neutral-500" />
//                 </motion.span>
//               ) : (
//                 <motion.span
//                   initial={{ opacity: 0, filter: "blur(4px)" }}
//                   animate={{ opacity: 1, filter: "blur(0px)" }}
//                   exit={{ opacity: 1, filter: "blur(0px)" }}
//                   transition={{
//                     type: "spring",
//                     duration: 0.95,
//                   }}
//                 >
//                   <Settings2Icon className="stroke-1 h-5 w-5 text-white/80  hover:stroke-[#13EEE3]/70 " />
//                 </motion.span>
//               )}
//             </motion.button>

//             <LayoutGroup id={`${item.id}`}>
//               <AnimatePresence mode="popLayout">
//                 {isOpen ? (
//                   <motion.div className="flex w-full flex-col ">
//                     <div className=" w-full  ">
//                       <motion.div
//                         initial={{
//                           y: 0,
//                           opacity: 0,
//                           filter: "blur(4px)",
//                         }}
//                         animate={{
//                           y: 0,
//                           opacity: 1,
//                           filter: "blur(0px)",
//                         }}
//                         transition={{
//                           type: "spring",
//                           duration: 0.15,
//                         }}
//                         layout
//                         className="  w-full"
//                       >
//                         <DirectionAwareTabs
//                           className="mr-auto bg-transparent pr-2"
//                           rounded="rounded "
//                           tabs={tabs}
//                           onChange={() =>
//                             setTabChangeRerender(tabChangeRerender + 1)
//                           }
//                         />
//                       </motion.div>
//                     </div>

//                     <motion.div
//                       key={`re-render-${tabChangeRerender}`} //  re-animates the button section on tab change
//                       className="mb-2 flex w-full items-center justify-between pl-2"
//                       initial={{ opacity: 0, filter: "blur(4px)" }}
//                       animate={{ opacity: 1, filter: "blur(0px)" }}
//                       transition={{
//                         type: "spring",
//                         bounce: 0,
//                         duration: 0.55,
//                       }}
//                     >
//                       <motion.div className="flex items-center gap-2 pt-3">
//                         <div className="h-1.5 w-1.5 rounded-full bg-[#13EEE3]" />
//                         <span className="text-xs text-neutral-300/80">
//                           Changes
//                         </span>
//                       </motion.div>
//                       <motion.div layout className="ml-auto mr-1  pt-2">
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => {
//                             setOpenItemId(null)
//                             toast.info("Changes saved")
//                           }}
//                           className="h-7 rounded-lg bg-[#13EEE3]/80 hover:bg-[#13EEE3] hover:text-black text-black"
//                         >
//                           Apply Changes
//                         </Button>
//                       </motion.div>
//                     </motion.div>
//                   </motion.div>
//                 ) : null}
//               </AnimatePresence>
//             </LayoutGroup>
//           </div>
//         )}
//       />
//     )
//   }

//   return (
//     <div className="flex">
//     <Mainsidebar/>
//     <div
//     className={`w-full max-w-screen min-h-screen flex justify-center ${
//       wallpaper ? "" : "bgimg"
//     }`}
//     style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' } : {}}
//   >
    
//       <div className="md:my-10 overflow-auto thin-scrollbar rounded-[28px] w-full max-w-[430px] shadow-sm max-h-[88vh] bg-[#000]/90">
      
//         <div className=" overflow-auto p-2 md:p-4">
//           <div className="flex flex-col space-y-2">
           
//             <div className="flex items-center gap-2 py-2">
//             <div className="space-y-2 w-full ">
//       <div className="relative ">
//         <Input id={id} className="peer pe-9 ps-9 py-6 rounded-3xl bg-[#161616]/90 border-none " placeholder="Search..." type="search" />
//         <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  text-muted-foreground/80 peer-disabled:opacity-50">
//           <Search size={20} strokeWidth={2} />
//         </div>
//         <button
//           className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//           aria-label="Submit search"
//           type="submit"
//         >
//           <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
//         </button>
//       </div>
//     </div>
//                <Dialog>
//                 <DialogTrigger> 
//                   <Button
                     
//                      className="dark:text-netural-100 h-11 w-11 bg-[#161616]/90 p-3 rounded-full text-white/60 hover:text-white/80" 
//                     >
//                       <Plus/>
//                     </Button>
//                     </DialogTrigger>
//                 <DialogContent>
                  
//                  <TaskForm/>
//                 </DialogContent>
//               </Dialog>
//               <div data-tip="Reset task list">
//                 <button onClick={handleResetItems}>
//                   <RepeatIcon className="dark:text-netural-100 h-4 w-4 text-neutral-500/80 hover:text-white/80" />
//                 </button>
//               </div>
//             </div>
//             {/* <MyTaskList task={task} setTask={setTask} /> */}
//             <SortableList
//               items={items}
//               setItems={setItems}
//               onCompleteItem={handleCompleteItem}
//               renderItem={renderListItem}
              
//             />
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-6 right-16">
//       <HoverCard>
//   <HoverCardTrigger> <img src="https://ui8-bento-elements.vercel.app/_next/image?url=%2Fimages%2Fdemo%2Fbackground-small.png&w=48&q=75" alt="" className="bg-black p-1 border-2 border-white text-neutral-400 rounded-full h-16 w-16"/>
//   </HoverCardTrigger>
//   <HoverCardContent  className="overflow-hidden h-[80vh] w-[25vw]">
//   <ScrollArea className="w-full h-full border-none p-0">
//     <Wallpaper/>
//     </ScrollArea>
//   </HoverCardContent>
// </HoverCard>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default MyTask;

"use client";

import { useCallback, useState, useEffect } from "react";
import { Plus, RepeatIcon, Settings2Icon, WallpaperIcon, XIcon, Scroll, Trash } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useId } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Wallpaper from "@/components/ui/wallpaper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserTask } from "interfaces/task";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";
import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useState as useStateInternal } from "react";
import {
  AnimatePresence as AnimatePresenceInternal,
  LayoutGroup as LayoutGroupInternal,
  Reorder,
  motion as motionInternal,
  useDragControls,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export type Item = {
  text: string;
  checked: boolean;
  id: number;
  description: string;
  taskData?: UserTask; // Add task data to the item
}

interface SortableListItemProps {
  item: Item;
  order: number;
  onCompleteItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  renderExtra?: (item: Item) => React.ReactNode;
  isExpanded?: boolean;
  className?: string;
  handleDrag: () => void;
}

function SortableListItem({
  item,
  order,
  onCompleteItem,
  onRemoveItem,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}: SortableListItemProps) {
  let [ref, bounds] = useMeasure();
  const [isDragging, setIsDragging] = useStateInternal(false);
  const [isDraggable, setIsDraggable] = useStateInternal(true);
  const dragControls = useDragControls();
  

  const handleDragStart = (event: any) => {
    setIsDragging(true);
    dragControls.start(event, { snapToCursor: true });
    handleDrag();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Render task data if available
  const renderTaskContent = () => {
    if (!item.taskData) return null;
    
    const task = item.taskData;
    return (
      <div 
        className=""
        // style={{ backgroundColor: task.category?.color || "#18181b" }}
      >
        <div className="flex gap-2 items-center">
          {/* <span
            className="bg-foreground pl-2 w-16 rounded-lg flex items-center"
            style={{ fontSize: "2rem" }}
          >
            {task.category?.icon ? (
              task.category?.icon
            ) : (
              <div className="p-1">
                <Scroll className="size-10" />
              </div>
            )}
          </span> */}
          <h2 className="text-lg text-white font-bold truncate">{task.title}</h2>
        </div>

        {/* {task.description ? (
          <div className="mt-2">
            <span className="font-semibold">Description</span>
            <p className="rounded-lg mt-2 text-sm text-gray-200">
              {task.description}
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <span className="font-semibold">No Description</span>
          </div>
        )} */}

        {/* <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            <p>
              <span className="font-semibold">Due:</span>{" "}
              {new Date(task.dueTime).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Priority:</span> {task.priority}
            </p>
          </div>

          <Button
            onClick={() => onCompleteItem(item.id)}
            className={
              task.itsDone
                ? "bg-ItsDone cursor-not-allowed text-black hover:bg-ItsDone"
                : "hover:bg-ItsDone"
            }
          >
            {task.itsDone ? "It's Done" : "Pending"}
          </Button>
        </div> */}
      </div>
    );
  };

  return (
    <motionInternal.div className={cn("", className)} key={item.id}>
      <div className="flex w-full items-center">
        <Reorder.Item
          value={item}
          className={cn(
            "relative z-auto grow",
            "h-full rounded-2xl bg-[#161716]/90",
            "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
            item.checked ? "cursor-not-allowed" : "cursor-grab",
            item.checked && !isDragging ? "w-7/10" : "w-full"
          )}
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : undefined,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.4,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.05,
              type: "spring",
              bounce: 0.1,
            },
          }}
          layout
          layoutId={`item-${item.id}`}
          dragListener={!item.checked}
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          style={
            isExpanded
              ? {
                  zIndex: 9999,
                  marginTop: 10,
                  marginBottom: 10,
                  position: "relative",
                  overflow: "hidden",
                }
              : {
                  position: "relative",
                  overflow: "hidden",
                }
          }
          whileDrag={{ zIndex: 9999 }}
        >
          <div ref={ref} className={cn(isExpanded ? "" : "", "z-20 ")}>
            <motionInternal.div
              layout="position"
              className="flex items-center justify-center py-2"
            >
              <AnimatePresenceInternal>
                {!isExpanded ? (
                  <motionInternal.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.001 }}
                    className="flex items-center space-x-2 w-full"
                  >
                    {/* List Remove Actions */}
                    <Checkbox
                      checked={item.checked}
                      id={`checkbox-${item.id}`}
                      aria-label="Mark to delete"
                      onCheckedChange={() => onCompleteItem(item.id)}
                      className="ml-3 h-5 w-5 rounded-md border-white/20 bg-black/30 data-[state=checked]:bg-black data-[state=checked]:text-red-200"
                    />
                    {/* List Order */}
                    <p className="font-mono text-xs pl-1 text-white/50">
                      {order + 1}
                    </p>

                    {/* Render task content */}
                    <div className="flex-1 min-w-0">
                      {item.taskData ? renderTaskContent() : (
                        <motionInternal.div
                          key={`${item.checked}`}
                          className="px-1 min-w-[150px]"
                          initial={{
                            opacity: 0,
                            filter: "blur(4px)",
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          transition={{
                            bounce: 0.2,
                            delay: item.checked ? 0.2 : 0,
                            type: "spring",
                          }}
                        >
                          <h4
                            className={cn(
                              "tracking-tighter text-base md:text-lg truncate",
                              item.checked ? "text-red-400" : "text-white/70"
                            )}
                          >
                            {item.checked ? "Delete" : ` ${item.text}`}
                          </h4>
                          {item.description && (
                            <p className="text-xs text-gray-400 mt-1 truncate">
                              {item.description}
                            </p>
                          )}
                        </motionInternal.div>
                      )}
                    </div>
                  </motionInternal.div>
                ) : null}
              </AnimatePresenceInternal>

              {/* List Item Children */}
              {renderExtra && renderExtra(item)}
            </motionInternal.div>
          </div>
          <div
            onPointerDown={isDraggable ? handleDragStart : undefined}
            style={{ touchAction: "none" }}
          />
        </Reorder.Item>
        {/* List Delete Action Animation */}
        <AnimatePresenceInternal mode="popLayout">
          {item.checked ? (
            <motionInternal.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.17,
                  duration: 0.17,
                  type: "spring",
                  bounce: 0.6,
                },
                zIndex: 5,
              }}
              exit={{
                opacity: 0,
                x: -5,
                transition: {
                  delay: 0,
                  duration: 0.0,
                  type: "spring",
                  bounce: 0,
                },
              }}
              className="-ml-[1px] h-[1.5rem] w-3 rounded-l-none rounded-r-none border-y border-y-white/5 border-r-white/10 bg-[#161716]"
            />
          ) : null}
        </AnimatePresenceInternal>
        <AnimatePresenceInternal mode="popLayout">
          {item.checked ? (
            <motionInternal.div
              layout
              initial={{ opacity: 0, x: -5, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.3,
                  duration: 0.15,
                  type: "spring",
                  bounce: 0.9,
                },
              }}
              exit={{
                opacity: 0,
                filter: "blur(4px)",
                x: -10,
                transition: { delay: 0, duration: 0.12 },
              }}
              className="inset-0 z-0 border-spacing-1 rounded-r-xl rounded-l-sm border-r-2 border-r-red-300/60 bg-[#161716]/80 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)] dark:bg-[#161716]/50"
            >
              <button
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-400 transition-colors duration-150 fill-red-400/60" />
              </button>
            </motionInternal.div>
          ) : null}
        </AnimatePresenceInternal>
      </div>
    </motionInternal.div>
  );
}

SortableListItem.displayName = "SortableListItem";

interface SortableListProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  onCompleteItem: (id: number) => void;
  renderItem: (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => ReactNode;
}

function SortableList({
  items,
  setItems,
  onCompleteItem,
  renderItem,
}: SortableListProps) {
  if (items) {
    return (
      <LayoutGroupInternal>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col"
        >
          <AnimatePresenceInternal>
            {items?.map((item, index) =>
              renderItem(item, index, onCompleteItem, (id: number) =>
                setItems((items) => items.filter((item) => item.id !== id))
              )
            )}
          </AnimatePresenceInternal>
        </Reorder.Group>
      </LayoutGroupInternal>
    );
  }
  return null;
}

SortableList.displayName = "SortableList";

export { SortableList, SortableListItem };


function MyTask() {
  const [items, setItems] = useState<Item[]>([]);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [tabChangeRerender, setTabChangeRerender] = useState<number>(1);
  const [wallpaper, setWallpaper] = useState('');
  const [task, setTask] = useState<UserTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
   const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const formattedDateTime = currentDateTime
      ? `${currentDateTime.toLocaleString("en-US", {
          weekday: "long",
        })}, ${currentDateTime.toLocaleString("en-US", {
          month: "long",
        })} ${currentDateTime.getDate()}, ${currentDateTime.getFullYear()} - ${currentDateTime.toLocaleTimeString()}`
      : "";
  
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/task", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setTask(data);
        
        // Transform tasks to SortableList items
        const transformedItems = data.map((task: UserTask, index: number) => ({
          text: task.title || `Task ${index + 1}`,
          checked: false,
          id: task.id || Date.now() + index,
          description: task.description || "",
          taskData: task
        }));
        setItems(transformedItems);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
      setIsLoading(false);
    };

    const verifyUser = async () => {
      const response = await fetch("/api/auth/services-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to verify user");
      }
    };

    fetchTasks();
    verifyUser();
  }, []);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('chatWallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  const id = useId();

  const handleCompleteItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: `Item ${prevItems.length + 1}`,
        checked: false,
        id: Date.now(),
        description: "",
      },
    ]);
  };

  const handleResetItems = () => {
    setItems([]);
  };

  const handleCloseOnDrag = useCallback(() => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.checked ? { ...item, checked: false } : item
      );
      return updatedItems.some(
        (item, index) => item.checked !== prevItems[index].checked
      )
        ? updatedItems
        : prevItems;
    });
  }, []);

  const handleItsDone = async (id: number) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itsDone: true, id }),
      });

      if (!response.ok) {
        throw new Error("Error updating task status");
      }
      
      // Update both task state and items state
      setTask(prevTasks => 
        prevTasks.map(t => 
          String(t.id) === String(id) ? { ...t, itsDone: true } : t
        )
      );
      
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, checked: false } : item
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }
      
      // Update both task state and items state
      setTask(prevTasks => prevTasks.filter(t => Number(t.id) !== Number(id)));
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderListItem = (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => {
    const isOpen = item.id === openItemId;

    const tabs = [
      {
        id: 0,
        label: "Title",
        content: (
          <div className="flex w-full flex-col pr-2 py-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400">
                Short title for your task
              </label>
              <motion.input
                type="text"
                value={item.text}
                className="w-full rounded-lg border font-semibold border-black/10 bg-neutral-800 px-1 py-[6px] text-xl md:text-3xl text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80 dark:border-white/10"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const text = e.target.value;
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, text } : i
                    )
                  );
                }}
              />
            </motion.div>
          </div>
        ),
      },
      {
        id: 1,
        label: "description",
        content: (
          <div className="flex flex-col pr-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400" htmlFor="prompt">
                edit{" "}
                <span className="lowercase">
                  your description - {item.text.slice(0, 20)}
                </span>
              </label>
              <textarea
                id=""
                className="h-[100px] w-full resize-none rounded-[6px] bg-neutral-800 px-2 py-[2px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80"
                value={item.description}
                placeholder="update description"
                onChange={(e) => {
                  const description = e.target.value;
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, description } : i
                    )
                  );
                }}
              />
            </motion.div>
          </div>
        ),
      },
    ];

    return (
      <SortableListItem
        item={item}
        order={order}
        key={item.id}
        isExpanded={isOpen}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        handleDrag={handleCloseOnDrag}
        className="my-2"
        renderExtra={(item) => (
          <div
            key={`${isOpen}`}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-2",
              isOpen ? "py-1 px-1" : "py-3"
            )}
          >
            <motion.button
              layout
              onClick={() => setOpenItemId(!isOpen ? item.id : null)}
              key="collapse"
              className={cn(
                isOpen
                  ? "absolute right-3 top-3 z-10"
                  : "relative z-10 ml-auto mr-3"
              )}
            >
              {isOpen ? (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 1.95,
                  }}
                >
                  <XIcon className="h-5 w-5 text-neutral-500" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 0.95,
                  }}
                >
                  <Settings2Icon className="stroke-1 h-5 w-5 text-white/80 hover:stroke-[#13EEE3]/70" />
                </motion.span>
              )}
            </motion.button>

            <LayoutGroup id={`${item.id}`}>
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div className="flex w-full flex-col">
                    <div className="w-full">
                      <motion.div
                        initial={{
                          y: 0,
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          type: "spring",
                          duration: 0.15,
                        }}
                        layout
                        className="w-full"
                      >
                        <DirectionAwareTabs
                          className="mr-auto bg-transparent pr-2"
                          rounded="rounded"
                          tabs={tabs}
                          onChange={() =>
                            setTabChangeRerender(tabChangeRerender + 1)
                          }
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      key={`re-render-${tabChangeRerender}`}
                      className="mb-2 flex w-full items-center justify-between pl-2"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 0.55,
                      }}
                    >
                      <motion.div className="flex items-center gap-2 pt-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#13EEE3]" />
                        <span className="text-xs text-neutral-300/80">
                          Changes
                        </span>
                      </motion.div>
                      <motion.div layout className="ml-auto mr-1 pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setOpenItemId(null);
                            toast.info("Changes saved");
                          }}
                          className="h-7 rounded-lg bg-[#13EEE3]/80 hover:bg-[#13EEE3] hover:text-black text-black"
                        >
                          Apply Changes
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      />
    );
  };


  return (
    <div className="flex">
      {/* <Mainsidebar /> */}
      <div className="absolute text-white text-center flex justify-center items-center left-10 top-3 ">
      <SidebarTrigger className=" text-white" />
       <Separator orientation="vertical" className="mr-2 h-4" />
       <p className="-mt-[2px]">{formattedDateTime || "Loading..."}</p></div>
      <div
        className={`w-full max-w-screen min-h-screen flex justify-center ${
          wallpaper ? "" : "bgimg"
        }`}
        style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' } : {}}
      >
        <div className="md:my-10 overflow-auto thin-scrollbar rounded-[28px] w-full max-w-[430px] shadow-sm max-h-[88vh] bg-[#000]/90">
          <div className="overflow-auto p-2 md:p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 py-2">
                <div className="space-y-2 w-full">
                  <div className="relative">
                    <Input id={id} className="peer pe-9 ps-9 py-6 rounded-3xl bg-[#161616]/90 border-none" placeholder="Search..." type="search" />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Search size={20} strokeWidth={2} />
                    </div>
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Submit search"
                      type="submit"
                    >
                      <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger> 
                    <Button
                      className="dark:text-netural-100 h-11 w-11 bg-[#161616]/90 p-3 rounded-full text-white/60 hover:text-white/80" 
                    >
                      <Plus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className=" ml-7">
                    <TaskForm />
                  </DialogContent>
                </Dialog>
                {/* <div data-tip="Reset task list">
                  <button onClick={handleResetItems}>
                    <RepeatIcon className="dark:text-netural-100 h-4 w-4 text-neutral-500/80 hover:text-white/80" />
                  </button>
                </div> */}
              </div>
              
              {isLoading ? (
                <div className="flex flex-col space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-xl bg-gray-200 animate-pulse dark:bg-gray-700" />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-gray-500">No tasks yet</p>
                  <Dialog>
                  <DialogTrigger> 
                    <Button
                      className="dark:text-netural-100 h-11 w-11 bg-[#161616]/90 p-3 rounded-full text-white/60 hover:text-white/80" 
                    >
                      <Plus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="ml-7">
                    <TaskForm />
                  </DialogContent>
                </Dialog>
                </div>
              ) : (
                <SortableList
                  items={items}
                  setItems={setItems}
                  onCompleteItem={handleCompleteItem}
                  renderItem={(item, index, onCompleteItem, onRemoveItem) => {
                    return renderListItem(
                      item,
                      index,
                      (id) => {
                        handleItsDone(id);
                        onCompleteItem(id);
                      },
                      (id) => {
                        handleRemoveItem(id);
                        onRemoveItem(id);
                      }
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-16">
          <HoverCard>
            <HoverCardTrigger>
              <img 
                src="https://ui8-bento-elements.vercel.app/_next/image?url=%2Fimages%2Fdemo%2Fbackground-small.png&w=48&q=75" 
                alt="" 
                className="bg-black p-1 border-2 border-white text-neutral-400 rounded-full h-16 w-16" 
              />
            </HoverCardTrigger>
            <HoverCardContent className="overflow-hidden h-[80vh] w-[25vw]">
              <ScrollArea className="w-full h-full border-none p-0">
                <Wallpaper />
              </ScrollArea>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}

export default MyTask;