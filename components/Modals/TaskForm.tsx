import { FC } from 'react';
import useInput from '../../hooks/useInput';
import { Column, MultiInput, Task } from '../../types';
import { Dropdown, MultiValueInput } from '../Inputs/Inputs';
import { mutate } from 'swr';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const validateTitle = (val: string | undefined): [boolean, string] => {
    if (!val || val?.trim().length < 1) return [false, "Can't be empty"];
    if (val?.trim().length > 100) return [false, `${val?.trim().length}/100`];
    return [true, ''];
};

const validateSubtasks = (val: MultiInput[]): [boolean, string] => {
    if (val?.length === 0 || !val) return [true, ''];
    for (const item of val) {
        const [isValid, errorMessage] = validateTitle(item.value);
        if (!isValid) return [isValid, errorMessage];
    }
    return [true, ''];
};

const TaskForm: FC<{
    closeModal: Function;
    columns?: Column[];
    taskData?: Task;
    formType: 'new' | 'edit';
    onTaskUpdated?: Function;
}> = (props) => {
    // Set initial field values if editing an existing task
    const initialSubtasks = props.taskData?.subtasks?.map((subtask) => {
        return { id: subtask.uuid, value: subtask.name, isValid: true, isTouched: false, errorMsg: '' };
    });
    const initialColumn = props.columns?.find((column) => column.uuid === props.taskData?.column_uuid)?.name;

    const dropdownOptions = props.columns?.map((item) => item.name);
    const nameInput = useInput<string>({ validateFn: validateTitle, initialValue: props.taskData?.name });
    const descriptionInput = useInput<string>({ initialValue: props.taskData?.description });
    const subtasksInput = useInput<MultiInput[]>({ validateFn: validateSubtasks, initialValue: initialSubtasks });
    const columnDropdown = useInput<string>({ initialValue: initialColumn ?? (dropdownOptions && dropdownOptions[0]) });

    const formIsValid = nameInput.isValid && subtasksInput.isValid;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nameInput.setIsTouched(true);
        subtasksInput.setIsTouched(true);
        const newColumnsValue = subtasksInput.value?.map((item) => {
            const [isValid, errorMsg] = validateTitle(item.value);
            return { ...item, isValid, errorMsg, isTouched: true };
        });
        if (newColumnsValue) subtasksInput.customValueChangeHandler(newColumnsValue);
        if (formIsValid) {
            const formData = {
                name: nameInput.value,
                description: descriptionInput.value,
                subtasks: subtasksInput.value?.map((item) => {
                    const subtask = props.taskData?.subtasks?.find((subtask) => subtask.uuid === item.id);
                    if (subtask) return { uuid: subtask.uuid, name: item.value };
                    return { name: item.value };
                }),
                column_uuid: props.columns?.find((item) => item.name === columnDropdown.value)?.uuid,
            };
            if (props.formType === 'new') {
                fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                }).then(() => {
                    mutate(`/api/boards/${props.columns?.[0].board_uuid}`);
                    props.closeModal();
                });
            } else {
                fetch(`/api/tasks/${props.taskData?.uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }).then(() => {
                    props.onTaskUpdated && props.onTaskUpdated();
                });
            }
        }
    };

    return (
    
    <div
        data-testid="task-form"
        className="flex flex-col rounded-2xl transition-all duration-300"
    >
        <h2 className="mb-6 text-xl font-semibold text-foreground">
            {props.formType === 'new' ? 'Add New Task' : 'Edit Task'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

            <Label>Title</Label>
            <Input
                value={nameInput.value ?? ''}
                onChange={nameInput.valueChangeHandler}
                onBlur={nameInput.inputBlurHandler}
                // haserror={nameInput.hasError}
                // errorMsg={nameInput.errorMsg}
                id="task-title"
                placeholder=" Enter title here"
            />

            <Label>Description</Label>
            <Textarea
                value={descriptionInput.value ?? ''}
                onChange={descriptionInput.valueChangeHandler}
                onBlur={descriptionInput.inputBlurHandler}
                
                id="task-description"
                placeholder="Enter description here"
            />

            <Label>Subtasks</Label>
            <MultiValueInput
                id="subtasks"
                label=""
                values={subtasksInput.value}
                changeHandler={subtasksInput.customValueChangeHandler}
                validationHandler={validateTitle}
                addBtnText="Add New Subtask"
                fieldType="textarea"
            />

            {/* <Label>Status</Label> */}
            {dropdownOptions && (
                <Dropdown
                    setValue={columnDropdown.setValue}
                    value={columnDropdown.value}
                    id="column-select"
                    label=""
                    options={dropdownOptions}
                    className='hidden'
                />
                
            )}

            <div className="mt-4">
                <Button
                    variant="default"
                    size="lg"
                    className="w-full text-white text-base font-medium transition-colors hover:bg-primary/90"
                    data-testid="task-submit"
                >
                    {props.formType === 'new' ? 'Create New Task' : 'Save Changes'}
                </Button>
            </div>
        </form>
    </div>


    );
};

export default TaskForm;
