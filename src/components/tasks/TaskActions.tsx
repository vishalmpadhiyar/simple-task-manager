import { Check, History, Pencil, Trash2, X } from "lucide-react";
import Button from "../Button";

interface TaskActionsProps {
  isEdit: boolean;
  inTrash: boolean;
  toggleEdit: () => void;
  toggleTrash: () => void;
  onSaveTask: () => void;
  onDeleteTask: () => void;
}

export default function TaskActions({
  isEdit,
  inTrash,
  toggleEdit,
  toggleTrash,
  onSaveTask,
  onDeleteTask,
}: TaskActionsProps) {
  return (
    <div className="flex gap-2 justify-end mb-2">
      {!inTrash && !isEdit && (
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
          {inTrash && (
            <>
              <Button
                className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
                onClick={() => onDeleteTask()}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </>
          )}
          <Button
            className="rounded-full! dark:border-none dark:hover:bg-white focus-visible:outline-none"
            onClick={toggleTrash}
          >
            {inTrash ? (
              <History className="size-4 text-red-500" />
            ) : (
              <Trash2 className="size-4 text-red-500" />
            )}
          </Button>
        </>
      )}
    </div>
  );
}
