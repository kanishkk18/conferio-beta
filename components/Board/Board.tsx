import { FC, useEffect, useRef, useState } from 'react';
import Column from './Column/Column';
import { DragStartEvent, DragEndEvent, DragOverEvent, closestCorners } from '@dnd-kit/core';
import {
    DndContext,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    MeasuringStrategy,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Board as BoardT, Columns, Task } from '../../types';
import { fetcher, randomHexColor } from '../../utils/utils';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useBoardsContext } from '../../store/BoardListContext';
import useInput from 'hooks/useInput';
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const validateColumn = (value: string): [boolean, string] => {
    if (!value || value.trim().length < 1) return [false, "Can't be empty"];
    if (value.trim().length > 20) return [false, `${value.trim().length}/20`];
    return [true, ''];
};

export const NewColumnBar: FC<{
    mutateBoard: Function;
    boardUUID: string;
}> = ({ mutateBoard, boardUUID }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutateBoards } = useBoardsContext();
    const inputHandler = useInput<string>({ validateFn: validateColumn });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputHandler.isValid) {
            inputHandler.setIsTouched(true);
            return;
        }
        const columnData = {
            board_uuid: boardUUID,
            name: inputHandler.value!.trim(),
            color: randomHexColor(),
        };
        fetch('/api/columns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(columnData),
        }).then(() => {
            inputRef.current?.blur();
            inputHandler.setIsTouched(false);
            inputHandler.setValue('');
            mutateBoard();
            mutateBoards();
        });
    };

    return (
        <div className="">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className='gap-2 -mt-9 right-[36%] absolute '> <Plus className='bg-muted/60 rounded-full p-1'/> New column</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <form onSubmit={submitHandler}>
                        <DialogHeader className='space-y-2'>
                            <DialogTitle>New Column</DialogTitle>
                            <DialogDescription>
                                You can add new column to your board
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">

                            <div className="grid flex-1 gap-2">
                                <fieldset className="relative">
                                    <Label htmlFor="link" className="sr-only">
                                        column
                                    </Label>
                                    <Input
                                        ref={inputRef}
                                        value={inputHandler.value ?? ''}
                                        onChange={inputHandler.valueChangeHandler}
                                        onBlur={inputHandler.inputBlurHandler}
                                        id="new-column"
                                        placeholder='type column name'
                                        type="text"
                                        className='mt-4'
                                    />
                                    <div
                                        className={`absolute h-[3px] w-56 -translate-x-1/2 translate-y-10 scale-x-0 rounded transition-all peer-focus:scale-x-100 ${inputHandler.hasError ? 'bg-danger' : 'bg-primary '
                                            }`}
                                    />
                                    {inputHandler.hasError && (
                                        <span className="absolute top-12 hidden min-w-max -translate-x-1/2 text-sm text-danger peer-focus:block">
                                            {inputHandler.errorMsg}
                                        </span>
                                    )}

                                </fieldset>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start py-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
};

const Board: FC<{ boardUUID: string }> = (props) => {
    const router = useRouter();
    const boardData = useSWR<BoardT>(`/api/boards/${props.boardUUID}`, fetcher, {
        onErrorRetry: (error) => {
            if (error.status === 404 || error.status === 400) {
                router.push('/');
            }
        },
    });
    const [items, setItems] = useState<Columns>({});
    const [clonedItems, setClonedItems] = useState<Columns | null>(items);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    useEffect(() => {
        const newValue: Columns = {};
        if (!boardData.data) return;
        for (const column of boardData.data.columns) {
            newValue[column.name] = {
                board_uuid: column.board_uuid,
                uuid: column.uuid,
                color: column.color,
                tasks: column.tasks ?? [],
            };
        }
        setItems(newValue);
    }, [boardData.data?.columns, boardData.error]);

    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 10,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    function findContainer(id: UniqueIdentifier, items: Columns | null) {
        if (!items) return null;
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => items[key].tasks.some((task) => task.uuid === id));
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const startingContainer = findContainer(id, items);
        const taskObject = startingContainer && items[startingContainer].tasks.find((task) => task.uuid === id);
        if (taskObject) {
            setDraggedTask(taskObject);
            setActiveId(id);
            setClonedItems(items);
        } else {
            return;
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const { id } = active;
        const overId = over?.id;
        if (!overId) return;

        // Find the containers
        const activeContainer = findContainer(id, items);
        const overContainer = findContainer(overId, items);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer].tasks;
            const overItems = prev[overContainer].tasks;

            // Find the indexes for the items
            const activeIndex = activeItems.map((task) => task.uuid as UniqueIdentifier).indexOf(id);
            const overIndex = overItems.map((task) => task.uuid as UniqueIdentifier).indexOf(overId);

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem = over && overIndex === overItems.length - 1;
                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: {
                    ...prev[activeContainer],
                    tasks: [...prev[activeContainer].tasks.filter((task) => task.uuid !== active.id)],
                },
                [overContainer]: {
                    ...prev[overContainer],
                    tasks: [
                        ...prev[overContainer].tasks.slice(0, newIndex),
                        items[activeContainer].tasks[activeIndex],
                        ...prev[overContainer].tasks.slice(newIndex, prev[overContainer].tasks.length),
                    ],
                },
            };
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        const overId = over?.id;
        if (!overId || !clonedItems || !activeId) return;

        const activeContainer = findContainer(id, items);
        const overContainer = findContainer(overId, items);
        const startingContainer = findContainer(activeId, clonedItems);

        if (!activeContainer || !overContainer || !startingContainer) {
            return;
        }

        const startingIndex = clonedItems[startingContainer].tasks
            .map((task) => task.uuid as UniqueIdentifier)
            .indexOf(activeId);
        const activeIndex = items[activeContainer].tasks.map((task) => task.uuid as UniqueIdentifier).indexOf(id);
        const overIndex = items[overContainer].tasks.map((task) => task.uuid as UniqueIdentifier).indexOf(overId);

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: {
                    ...items[overContainer],
                    tasks: arrayMove(items[overContainer].tasks, activeIndex, overIndex),
                },
            }));
        }
        if (activeId && clonedItems && draggedTask) {
            const dragData = {
                overIndex: overIndex !== -1 ? overIndex : items[overContainer].tasks.length - 1,
                overContainer: items[overContainer].uuid,
            };
            // Update the task if it was moved to a different container or index
            if (startingContainer === overContainer && startingIndex === overIndex) {
                boardData.mutate();
            } else {
                fetch(`/api/tasks/${draggedTask.uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        column_uuid: dragData.overContainer,
                        position: dragData.overIndex,
                    }),
                }).then(() => {
                    boardData.mutate();
                });
            }
        }
        setClonedItems(null);
        setActiveId(null);
    }

    return (
        <section className="grid h-full w-fit auto-cols-min grid-flow-col gap-2">
            <DndContext
                sensors={sensors}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.Always,
                    },
                }}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {items &&
                    Object.entries(items).map(([colName, colData]) => {
                        return <Column key={colName} name={colName} columnData={colData} />;

                    })}
            </DndContext>
            {/* {boardData.data && <NewColumnBar boardUUID={boardData.data.uuid} mutateBoard={boardData.mutate} />} */}
        </section>
    );
};

export default Board;
