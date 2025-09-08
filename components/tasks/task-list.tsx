// "use client";

// import UserTask from "interfaces/task";
// import { Button } from "../ui/button";
// import { Plus, Scroll } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { TaskForm } from "./task-form";

// interface TaskProps {
//   task: UserTask[];
//   setTask: (value: UserTask[]) => void;
// }

// export function TaskList({ task, setTask }: TaskProps) {
//   const totalBlocks = 24;
//   const emptyBlocks = totalBlocks - task.length;

//   const handleItsDone = async (selectedTask: UserTask) => {
//     try {
//       const response = await fetch(`/api/task`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
//       });

//       if (!response.ok) {
//         throw new Error("Error updating task status");
//       }

//       const updatedTasks = task.map((t) =>
//         t.id === selectedTask.id ? { ...t, itsDone: true } : t
//       );
//       setTask(updatedTasks);
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   return (
//     <div className="flex flex-1 dark:bg-black flex-col gap-4 p-4">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {task.map((t, i) => (
//           <div
//             key={`task-${i}`}
//             className="relative aspect-square border rounded-xl p-6 text-white shadow-md"
//             style={{ backgroundColor: t.category?.color || "#18181b" }}
//           >
//             <div className="flex gap-2 items-center">
//               <span
//                 className="bg-transparent border p-2 h-10 w-auto rounded-lg flex items-center"

//               >
//                 {t.category?.icon ? (
//                   t.category?.icon
//                 ) : (
//                   <div className="p-1">
//                     <Scroll className="size-6 " />
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
//                   {t.itsDone ? "Done" : "Pending"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="flex flex-col justify-center aspect-square rounded-xl bg-gray-100 h-full gap-1">
//           <div className="text-sm text-muted-foreground  p-2 items-center flex justify-center">
//             <p>Do you have any ideas? Let&apos;s create them</p>
//           </div>
//           <div className="flex justify-center items-center">
//               <Dialog>
//                                <DialogTrigger>
//                                  <Button
//                                    className="dark:text-netural-100  bg-[#161616]/90 p-3 rounded-md text-white/60 hover:text-white/80"
//                                  >
//                                    <Plus />Add Task
//                                  </Button>
//                                </DialogTrigger>
//                                <DialogContent>
//                                  <TaskForm />
//                                </DialogContent>
//                              </Dialog>

//           </div>
//         </div>

//         {Array.from({ length: emptyBlocks }).map((_, i) => (
//           <div
//             key={`empty-${i}`}
//             className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 "
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TaskForm } from './task-form';
import { Separator } from '../ui/separator';
import { StatsGrid } from '../ui/stats-grid';
import { useSession } from 'next-auth/react';

export type UserTask = {
  id: string;
  title: string;
  description?: string | null;
  priority: string;
  dueTime: string;
  createdAt: string;
  itsDone: boolean;
  category?: {
    name: string;
    color?: string;
    icon?: React.ReactNode;
  };
};

interface TaskTableProps {
  task: UserTask[];
  setTask: React.Dispatch<React.SetStateAction<UserTask[]>>;
}

export function TaskList({ task, setTask }: TaskTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const session = useSession();

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

  const columns: ColumnDef<UserTask>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    //   cell: ({ row }) => (
    //     <div className="text-muted-foreground text-sm">
    //      {(row.getValue("description") as string)?.slice(0, 15) || "No Description"}

    //     </div>
    //   ),
    // },
    {
      accessorKey: 'category',
      header: 'Project',
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
          {row.original.category?.name || 'No Category'}
        </div>
      ),
    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm uppercase ">
          {(row.getValue('id') as string)?.slice(0, 7) || 'No ID'}
        </div>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <div className="capitalize w-fit px-3 border rounded-full text-center">
          {row.getValue('priority')}
        </div>
      ),
    },
    {
      accessorKey: 'dueTime',
      header: 'Due',
      cell: ({ row }) => {
        const date = new Date(row.getValue('dueTime'));
        const options: Intl.DateTimeFormatOptions = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        const options: Intl.DateTimeFormatOptions = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      },
    },
    {
      accessorKey: 'itsDone',
      header: 'Status',
      cell: ({ row }) => {
        const isDone = row.getValue('itsDone');
        return (
          <div
            className={`font-medium ${isDone ? 'text-green-500 bg-green-400/40 w-fit px-2 py-1 rounded-full' : 'text-yellow-400 bg-yellow-400/30 text-sm w-fit px-2 py-1 rounded-full'}`}
          >
            {isDone ? 'Done' : 'Pending'}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-sidebar">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
              >
                Copy task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => !task.itsDone && handleItsDone(task)}
                disabled={task.itsDone}
              >
                Mark as Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: task,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-14 p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            hola,{session.data?.user.name}!
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&rsquo;s an overview of your Tasks. Manage or create new ones
            with ease!
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="dark:bg-white">
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TaskForm />
          </DialogContent>
        </Dialog>
      </div>

      <StatsGrid
        stats={[
          {
            title: 'Total Tasks',
            value: String(task.length),
            change: {
              value: '+12%',
              trend: 'up',
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d="M9 0v2.013a8.001 8.001 0 1 0 5.905 14.258l1.424 1.422A9.958 9.958 0 0 1 10 19.951c-5.523 0-10-4.478-10-10C0 4.765 3.947.5 9 0Zm10.95 10.95a9.954 9.954 0 0 1-2.207 5.329l-1.423-1.423a7.96 7.96 0 0 0 1.618-3.905h2.013ZM11.002 0c4.724.47 8.48 4.227 8.95 8.95h-2.013a8.004 8.004 0 0 0-6.937-6.937V0Z" />
              </svg>
            ),
          },
          {
            title: 'Completed Task',
            value: String(task.filter((t) => t.itsDone).length),
            change: {
              value: '+42%',
              trend: 'up',
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={19}
                fill="currentColor"
              >
                <path d="M2 9.5c0 .313.461.858 1.53 1.393C4.914 11.585 6.877 12 9 12c2.123 0 4.086-.415 5.47-1.107C15.538 10.358 16 9.813 16 9.5V7.329C14.35 8.349 11.827 9 9 9s-5.35-.652-7-1.671V9.5Zm14 2.829C14.35 13.349 11.827 14 9 14s-5.35-.652-7-1.671V14.5c0 .313.461.858 1.53 1.393C4.914 16.585 6.877 17 9 17c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171ZM0 14.5v-10C0 2.015 4.03 0 9 0s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5ZM9 7c2.123 0 4.086-.415 5.47-1.107C15.538 5.358 16 4.813 16 4.5c0-.313-.461-.858-1.53-1.393C13.085 2.415 11.123 2 9 2c-2.123 0-4.086.415-5.47 1.107C2.461 3.642 2 4.187 2 4.5c0 .313.461.858 1.53 1.393C4.914 6.585 6.877 7 9 7Z" />
              </svg>
            ),
          },
          {
            title: 'Overdue Task',
            value: String(task.filter((t) => !t.itsDone).length),
            change: {
              value: '+37%',
              trend: 'up',
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.833 3.337a.596.596 0 0 1 .763.067.59.59 0 0 1 .063.76c-2.18 3.046-3.38 4.678-3.598 4.897a1.5 1.5 0 0 1-2.122-2.122c.374-.373 2.005-1.574 4.894-3.602ZM15.5 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-11 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm2.318-3.596a1 1 0 1 1-1.414 1.414 1 1 0 0 1 1.414-1.414ZM10 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
              </svg>
            ),
          },
          {
            title: 'Total Projects',
            value: String(task.filter((t) => t.category?.name).length || 0),
            change: {
              value: '-17%',
              trend: 'down',
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={21}
                fill="currentColor"
              >
                <path d="m14.142.147 6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23-5.656-5.657.212-1.485a.5.5 0 0 1 .848-.282ZM2.141 19.257c3.722-3.33 7.995-4.327 12.643-5.52l.446-4.017-4.297-4.298-4.018.447c-1.192 4.648-2.189 8.92-5.52 12.643L0 17.117c2.828-3.3 3.89-6.953 5.303-13.081l6.364-.708 5.657 5.657-.707 6.364c-6.128 1.415-9.782 2.475-13.081 5.304L2.14 19.258Zm5.284-6.029a2 2 0 1 1 2.828-2.828 2 2 0 0 1-2.828 2.828Z" />
              </svg>
            ),
          },
        ]}
      />

      <Separator />
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-sidebar dark:border-neutral-700 dark:bg-[#1E1E21] font-medium"
        />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                Columns <ChevronDown className="ml-2 h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border dark:border-neutral-800">
        <Table>
          <TableHeader className="bg-sidebar dark:bg-[#1E1E21] hover:bg-none rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
