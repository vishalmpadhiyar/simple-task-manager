import { useCallback, useContext, useEffect, useState } from "react";
import type { Task } from "../../lib/types";
import { TaskContext } from "../../context/TaskContext";
import { CheckSquare, Square, Trash2 } from "lucide-react";
import Button from "../Button";

interface SubTaskProps {
  subtask: Task;
  onDeleteSubTask: (id: string) => void;
}

export default function SubTask({ subtask, onDeleteSubTask }: SubTaskProps) {
  const [selectedTask, setSelectedTask] = useState(subtask);
  const { updateTask } = useContext(TaskContext);

  useEffect(() => {
    setSelectedTask(subtask);
  }, [subtask]);

  const onSaveTask = useCallback(() => {
    updateTask({ ...selectedTask, updatedAt: new Date().toISOString() });
  }, [selectedTask, updateTask]);

  const toggleCompleted = useCallback(() => {
    setSelectedTask((prev) => {
      const newValue = !prev.completed;

      updateTask({
        ...prev,
        completed: newValue,
        updatedAt: new Date().toISOString(),
      });

      return { ...prev, completed: newValue };
    });
  }, [updateTask]);

  const onChangeValue = useCallback((field: keyof Task, value: string) => {
    setSelectedTask((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div
      key={subtask.id}
      className="flex items-center gap-2 p-2 rounded-lg border border-gray-200"
    >
      <input
        id="title"
        name="title"
        type="text"
        value={selectedTask.title}
        className="flex-1 w-full h-8 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-md"
        onChange={(event) => onChangeValue("title", event.target.value)}
        onBlur={onSaveTask}
      />
      <Button
        onClick={toggleCompleted}
        className="rounded-full! p-1! focus-visible:outline-none dark:border-none dark:hover:bg-slate-600"
      >
        {selectedTask.completed ? (
          <CheckSquare className="w-4 h-4 text-green-600" />
        ) : (
          <Square className="w-4 h-4" />
        )}
      </Button>
      <Button
        onClick={() => onDeleteSubTask(subtask.id)}
        className="rounded-full! p-1! focus-visible:outline-none dark:border-none dark:hover:bg-slate-600"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
