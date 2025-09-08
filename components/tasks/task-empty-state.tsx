"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskForm } from "./task-form";

export default function TaskEmptyState() {

  return (
    <div className="flex flex-col justify-center items-center h-screen pb-32">
      <Image
        width={1000}
        height={1000}
        alt="task-empty"
        src="https://i.pinimg.com/736x/e5/29/2e/e5292e22851589622d0d872910074aaa.jpg"
        className="w-auto rounded-sm mb-5 h-[300px]"
      />
      <p className="text-lg text-center mb-6 dark:text-white truncate font-semibold">
        Start by adding your task and organizing your day.
      </p>
      
      <Dialog>
        <DialogTrigger>
          <Button className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark">
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>

   <TaskForm/>
  </DialogContent>
</Dialog>
    
    </div>
  );
}
