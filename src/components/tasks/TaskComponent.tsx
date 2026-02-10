import { useCallback, useState } from "react";
import type { Task } from "../../lib/types";
import { History, Pencil, Trash2, X } from "lucide-react";
import useTask from "../../hooks/useTask";
import Button from "../Button";

interface TaskComponentProps {
  task: Task;
}

export default function TaskComponent({ task }: TaskComponentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(task);
  const { updateTaskById, getItemById } = useTask();

  const toggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const toggleTrash = useCallback(() => {
    updateTaskById(task.id, "inTrash", !selectedTask.inTrash);
    setSelectedTask({ ...selectedTask, inTrash: !selectedTask.inTrash });
  }, [getItemById, updateTaskById]);

  return (
    <div className="p-4 max-w-md bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-200 rounded-md shadow-md">
      <div className="flex gap-2 justify-end">
        <Button
          className="rounded-full! dark:border-none dark:hover:bg-linear-to-r from-purple-600 to-blue-600"
          onClick={toggleEdit}
        >
          {isEdit ? (
            <X className="size-4 text-gray-700 dark:text-white" />
          ) : (
            <Pencil className="size-4 text-gray-700 dark:text-white" />
          )}
        </Button>
        <Button className="rounded-full!" onClick={toggleTrash}>
          {selectedTask.inTrash ? (
            <History className="size-4 text-red-500" />
          ) : (
            <Trash2 className="size-4 text-red-500" />
          )}
        </Button>
      </div>
      {isEdit ? (
        <input
          type="text"
          className="h-8 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-md"
          onChange={() => {}}
        />
      ) : (
        <p className="h-8">{task.title}</p>
      )}
      <p className="min-h-5">{task.description}</p>
    </div>
  );
}
