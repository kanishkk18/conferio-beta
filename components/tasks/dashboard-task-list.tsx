// 'use client';

// import { UserTask } from 'interfaces/task';
// import { Plus, Scroll } from 'lucide-react';
// import moment from 'moment';
// import { Checkbox } from '../ui/checkbox';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import { TaskForm } from './task-form';

// interface TaskProps {
//   task: UserTask[];
//   setTask: (value: UserTask[]) => void;
// }

// export function DashboardTaskList({ task, setTask }: TaskProps) {
//   const handleItsDone = async (selectedTask: UserTask) => {
//     try {
//       const response = await fetch(`/api/task`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
//       });

//       if (!response.ok) {
//         throw new Error('Error updating task status');
//       }

//       const updatedTasks = task.map((t) =>
//         t.id === selectedTask.id ? { ...t, itsDone: true } : t
//       );
//       setTask(updatedTasks);
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {task.map((t, i) => (
//           <div
//             key={`task-${i}`}
//             className="relative aspect-square rounded-xl p-6 text-white shadow-md"
//             style={{ backgroundColor: t.category?.color || "#18181b" }}
//           >
//             <div className="flex gap-2 items-center">
//               <span
//                 className="bg-foreground pl-2 w-16 rounded-lg flex items-center"
//                 style={{
//                   fontSize: "2rem",
//                 }}
//               >
//                 {t.category?.icon ? (
//                   t.category?.icon
//                 ) : (
//                   <div className="p-1">
//                     <Scroll className="size-10 " />
//                   </div>
//                 )}
//               </span>
//               <h2 className="text-lg font-bold truncate">{t.title}</h2>
//             </div>

//             {t.description ? (
//               <div className="mt-2">
//                 <span className="font-semibold">Description</span>
//                 <p className="rounded-lg mt-2 text-sm text-gray-200">
//                   {t.description}
//                 </p>
//               </div>
//             ) : (
//               <div className="mt-2">
//                 <span className="font-semibold">No Description</span>
//               </div>
//             )}

//             <div className="absolute bottom-4 left-4 right-4 flex justify-between">
//               <div className="text-sm">
//                 <p>
//                   <span className="font-semibold">Due:</span>{" "}
//                   {new Date(t.dueTime).toLocaleString()}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Priority:</span> {t.priority}
//                 </p>

//                 <p className="mt-2 text-xs text-gray-300">
//                   Created: {new Date(t.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               <div className="absolute right-0 bottom-0 p-0">
//                 <Button
//                   onClick={() => !t.itsDone && handleItsDone(t)}
//                   className={
//                     t.itsDone
//                       ? "bg-ItsDone cursor-not-allowed text-black hover:bg-ItsDone"
//                       : "hover:bg-ItsDone"
//                   }
//                 >
//                   {t.itsDone ? "It's Done" : "Pending"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="flex flex-col justify-center aspect-square rounded-xl bg-primary h-full gap-1">
//           <div className="text-sm text-muted-foreground text-white p-4 items-center flex justify-center">
//             <p>Do you have any ideas? Let&apos;s create them</p>
//           </div>
//           <div className="flex justify-center items-center">
//             <Button
//               onClick={handleAddTask}
//               className="px-8 py-3 bg-ItsDone text-black rounded-md shadow-md hover:bg-foreground hover:text-white"
//             >
//               Add Task
//             </Button>
//           </div>
//         </div>

//         {Array.from({ length: emptyBlocks }).map((_, i) => (
//           <div
//             key={`empty-${i}`}
//             className="aspect-square rounded-xl bg-primary"
//           />
//         ))}
//       </div> */}
//       <div className="flex mt-2 w-[100%] px-4 justify-between items-center">
//         <div className="flex flex-col">
//           <h1 className="text-black dark:text-white font-semibold text-[32px]">
//             Scheduled Tasks
//           </h1>
//           <h1 className="text-yellow-400 dark:text-[#2647eb] font-semibold text-[32px]">
//             {moment().format('dddd D')}
//           </h1>
//         </div>

//         <Dialog>
//           <DialogTrigger>
//             <div className="text-white bg-yellow-400 dark:bg-[#2647eb] rounded-lg">
//               <Plus className="w-10 h-10 p-2" />{' '}
//             </div>
//           </DialogTrigger>
//           <DialogContent>
//             <TaskForm />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {task.map((t, i) => (
//         <div className="" key={`task-${i}`}>
//           {/* <div className="px-4 w-full mt-4 gap-2 flex justify-center items-center"><Minus/>
//       <div className="bg-yellow-400 dark:bg-[#2647eb] p-4 flex justify-between items-center px-6 rounded-[14px] w-[100%] ">
//         <div className="flex gap-4 justify-center items-center">
//         <div className="bg-white flex justify-center items-center rounded-lg w-8 h-8 p-1"><AlarmClock/>
//         </div>
//         <p className='text-[16px] font-sans text-black dark:text-white font-bold '>Wake up buddy</p>
//         </div>
//         <p className='text-[16px] font-sans text-gray-700 dark:text-white font-semibold'>7:00 AM</p>
//       </div>
//       </div>

//       <div className="px-4 w-full mt-4 gap-2 flex justify-center items-center"><Minus/>
//       <div className="bg-yellow-400 dark:bg-[#2647eb] p-4 flex justify-between items-center px-6 rounded-[14px] w-[100%] ">
//         <div className="flex gap-4 justify-center items-center">
//         <div className="bg-white flex justify-center items-center rounded-lg w-8 h-8 p-1"><IconYoga/>
//         </div>
//         <p className='text-[16px] font-sans text-black dark:text-white font-bold '>morning yoga</p>
//         </div>
//         <p className='text-[16px] font-sans text-gray-700 dark:text-white font-semibold'>8:00 AM</p>
//       </div>
//       </div> */}

//           <div className="px-4 w-full mt-4 gap-2 flex justify-center items-center">
//             <div className="">
//              <Checkbox onClick={() => !t.itsDone && handleItsDone(t)} checked={t.itsDone}/>
//             </div>
//             <div className="bg-gray-100 dark:bg-neutral-950 py-4 flex justify-between items-start px-6 rounded-[14px] w-[100%] ">
//               <div className="flex gap-4 justify-center items-start">
//                 <div className="bg-white flex justify-center items-center rounded-lg w-8 h-8 p-1">
//                   {t.category?.icon ? (
//                     t.category?.icon
//                   ) : (
//                     <Scroll className="dark:text-black" />
//                   )}
//                 </div>
//                 <div className="text-[16px] font-sans flex flex-col text-black dark:text-white font-bold ">
//                   <h1>{t.title}</h1>
//                   <div className="flex flex-col gap-2 list-disc"></div>
//                   {t.description ? (
//                     <div className="mt-1">
//                       <p className="text-[14px] font-sans font-medium text-gray-500">
//                         {t.description}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="mt-1">
//                       <p className="text-[14px] font-sans font-medium text-gray-500">
//                         No Description
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <p className="text-[16px] font-sans text-gray-700 dark:text-white font-semibold">
//                 {' '}
//                 {moment(t.dueTime).format('D MMM')}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



'use client';

import { UserTask } from 'interfaces/task';
import { Plus, Scroll } from 'lucide-react';
import moment from 'moment';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TaskForm } from './task-form';
import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import { motion, useInView } from "motion/react";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps {
  items?: string[];
  onItemSelect?: (item: string, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

interface TaskProps {
  task: UserTask[];
  setTask: (value: UserTask[]) => void;
    onItemSelect?: (item: UserTask, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

export function DashboardTaskList({ task, setTask,  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1, }: TaskProps) {

  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, task.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < task.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(task[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [task, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav])


  const handleItsDone = async (selectedTask: UserTask) => {
    try {
      const response = await fetch(`/api/task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
      });

      if (!response.ok) {
        throw new Error('Error updating task status');
      }

      const updatedTasks = task.map((t) =>
        t.id === selectedTask.id ? { ...t, itsDone: true } : t
      );
      setTask(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="w-full">
     
      <div className="flex mt-2 mb-4 w-[100%] px-4 justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-black dark:text-white font-semibold text-[32px]">
            Scheduled Tasks
          </h1>
          <h1 className="text-yellow-400 dark:text-[#2647eb] font-semibold text-[32px]">
            {moment().format('dddd D')}
          </h1>
        </div>

        <Dialog>
          <DialogTrigger>
            <div className="text-white bg-yellow-400 dark:bg-[#2647eb] rounded-lg">
              <Plus className="w-10 h-10 p-2" />{' '}
            </div>
          </DialogTrigger>
          <DialogContent>
            <TaskForm />
          </DialogContent>
        </Dialog>
      </div>

      {task.map((t, i) => (
        <div key={`task-${i}`} ref={listRef}
        className={` overflow-y-auto ${
          displayScrollbar
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
            : "scrollbar-hide"
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: "#222 #060010",
        }}>
          
<AnimatedItem
            
            delay={0.1}
            index={i}
            onMouseEnter={() => setSelectedIndex(i)}
            onClick={() => {
              setSelectedIndex(i);
              if (onItemSelect) {
                onItemSelect(t, i);
              }
            }}
          >
            <div
              className={` ${selectedIndex === i ? "" : ""} ${itemClassName}`}
            >
              <div className="px-4 w-full gap-2 flex justify-center items-center">
            <div className="">
             <Checkbox className='border-yellow-500 dark:border-blue-600' onClick={() => !t.itsDone && handleItsDone(t)} checked={t.itsDone}/>
            </div>
            <div className="bg-gray-100 dark:bg-neutral-950 py-4 flex justify-between items-start px-6 rounded-[14px] w-[100%] ">
              <div className="flex gap-4 justify-center items-start">
                <div className="bg-white flex justify-center items-center rounded-lg w-8 h-8 p-1">
                  {t.category?.icon ? (
                    t.category?.icon
                  ) : (
                    <Scroll className="dark:text-black" />
                  )}
                </div>
                <div className="text-[16px] font-sans flex flex-col text-black dark:text-white font-bold ">
                  <h1>{t.title}</h1>
                  <div className="flex flex-col gap-2 list-disc"></div>
                  {t.description ? (
                    <div className="mt-1">
                      <p className="text-[14px] w-xs max-w-xs font-sans font-medium text-gray-500">
                        {t.description.slice(0,92)}...
                      </p>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="text-[14px] font-sans font-medium text-gray-500">
                        No Description
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[16px] font-sans text-gray-700 dark:text-white font-semibold">
                {' '}
                {moment(t.dueTime).format('D MMM')}
              </p>
            </div>
          </div>
            </div>
          </AnimatedItem>
          
        </div>
      ))}
    </div>
  );
}