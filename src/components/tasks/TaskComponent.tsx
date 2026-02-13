import { useCallback, useContext, useState } from "react";
import type { Task } from "../../lib/types";
import { Check, History, Pencil, Trash2, X } from "lucide-react";
import Button from "../Button";
import { TaskContext } from "../../context/TaskContext";

interface TaskComponentProps {
  task: Task;
}

export default function TaskComponent({ task }: TaskComponentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(task);
  const { updateTask, updateTaskFieldById, getItemById, deleteTask } =
    useContext(TaskContext);

  const toggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const toggleTrash = useCallback(() => {
    updateTaskFieldById(task.id, "inTrash", !selectedTask.inTrash);
    setSelectedTask({ ...selectedTask, inTrash: !selectedTask.inTrash });
  }, [getItemById, updateTaskFieldById]);

  const onSaveTask = useCallback(() => {
    updateTask(selectedTask);
    setIsEdit((prev) => !prev);
  }, [selectedTask, updateTask]);

  const onDeleteTask = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask]);

  const onChangeValue = useCallback(
    (field: keyof Task, value: string) => {
      const updatedTask = { ...selectedTask, [field]: value };
      setSelectedTask(updatedTask);
    },
    [selectedTask],
  );

  return (
    <div className="p-4 max-w-md bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-200 rounded-md shadow-md">
      <div className="flex gap-2 justify-end mb-2">
        {!selectedTask.inTrash && !isEdit && (
          <Button
            className="rounded-full! dark:border-none dark:hover:bg-linear-to-r from-purple-600 to-blue-600 focus-visible:outline-none"
            onClick={toggleEdit}
          >
            <Pencil className="size-4 text-gray-700 dark:text-white" />
          </Button>
        )}
        {isEdit ? (
          <>
            <Button
              className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
              onClick={toggleEdit}
            >
              <X className="size-4 text-red-500" />
            </Button>
            <Button
              className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
              onClick={onSaveTask}
            >
              <Check className="size-4 text-green-500" />
            </Button>
          </>
        ) : (
          <>
            {selectedTask.inTrash && (
              <>
                <Button
                  className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
                  onClick={onDeleteTask}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </>
            )}
            <Button
              className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
              onClick={toggleTrash}
            >
              {selectedTask.inTrash ? (
                <History className="size-4 text-red-500" />
              ) : (
                <Trash2 className="size-4 text-red-500" />
              )}
            </Button>
          </>
        )}
      </div>
      <div className="space-y-2 max-h-49">
        <p className="text-sm font-medium">Title</p>
        {isEdit ? (
          <input
            id="title"
            name="title"
            type="text"
            value={selectedTask.title}
            className="w-full h-8 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-md"
            onChange={(event) => onChangeValue("title", event.target.value)}
          />
        ) : (
          <p className="h-8 px-2 py-1 border border-transparent">
            {task.title}
          </p>
        )}
        <p className="text-sm font-medium">Description</p>
        {isEdit ? (
          <textarea
            id="description"
            name="description"
            className="w-full max-h-25 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-md scrollable"
            rows={4}
            value={selectedTask.description}
            onChange={(event) =>
              onChangeValue("description", event.target.value)
            }
          />
        ) : (
          <p className="h-25 px-2 py-1 border border-transparent whitespace-pre-line overflow-y-auto scrollable">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
}
