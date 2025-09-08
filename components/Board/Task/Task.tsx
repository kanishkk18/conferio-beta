import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Task as TaskT } from '../../../types';
import { useBoardsContext } from '../../../store/BoardListContext';

const Task: FC<{ taskData: TaskT }> = ({ taskData }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: taskData.uuid });
    const { setSelectedTask } = useBoardsContext();
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
          }
        : undefined;

    const completedTasks = taskData.subtasks.filter((subtask) => subtask.completed).length;

    const handleTaskClick = () => {
        setSelectedTask(taskData.uuid);
    };

    return (
        <>
            <li
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={handleTaskClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleTaskClick();
                    }
                }}
                data-testid="task"
                className="group my-4 cursor-pointer box-shadow dark:shadow-black dark:shadow-md rounded-[14px] bg-white dark:bg-neutral-900 hover:bg-black px-4 py-6 text-left font-bold "
            >
                <h4 className="text-[14px] bg-yellow-200/50 dark:bg-blue-300/30 w-fit rounded-3xl px-2 text-yellow-400  dark:text-blue-500">{taskData.name}</h4>
                <p className='text-[14px] font-medium mt-1 text-gray-400'>{taskData.description}</p>
                {taskData.subtasks.length > 0 && (
                    <span className="mt-2 text-xs text-mid-grey">{`${completedTasks} of ${taskData.subtasks.length} subtasks done`}</span>
                )}
            </li>
        </>
    );
};

export default Task;
