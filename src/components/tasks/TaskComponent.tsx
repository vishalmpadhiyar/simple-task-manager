import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Task } from "../../lib/types";
import { TaskContext } from "../../context/TaskContext";
import TaskActions from "./TaskActions";
import {
  Calendar,
  Clock,
  ListChevronsDownUp,
  ListCollapse,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import Button from "../Button";
import SubTask from "./SubTask";

interface TaskComponentProps {
  task: Task;
}

export default function TaskComponent({ task }: TaskComponentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const [selectedTask, setSelectedTask] = useState(task);
  const { createTask, updateTask, updateTaskFieldById, deleteTask } =
    useContext(TaskContext);

  useEffect(() => {
    setSelectedTask(task);
  }, [task]);

  const progress = useMemo(() => {
    if (selectedTask.children.length) {
      const completedChildren = selectedTask.children.filter(
        (task) => task.completed,
      ).length;

      return Math.round(
        (completedChildren / selectedTask.children.length) * 100,
      );
    } else {
      return selectedTask.completed ? 100 : 0;
    }
  }, [selectedTask]);

  const progressColor = useMemo(() => {
    if (progress === 0) return "bg-gray-300";
    if (progress < 50) return "bg-red-500";
    if (progress < 100) return "bg-orange-500";
    return "bg-green-500";
  }, [progress]);

  const toggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpand((prev) => !prev);
  }, []);

  const toggleTrash = useCallback(() => {
    setSelectedTask((prev) => {
      const newValue = !prev.inTrash;

      updateTask({
        ...prev,
        inTrash: newValue,
        updatedAt: new Date().toISOString(),
      });

      return { ...prev, inTrash: newValue };
    });
  }, [updateTaskFieldById]);

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

  const onSaveTask = useCallback(() => {
    updateTask({ ...selectedTask, updatedAt: new Date().toISOString() });
    setIsEdit((prev) => !prev);
  }, [selectedTask, updateTask]);

  const onAddSubTask = useCallback(() => {
    createTask("", "", task.id);
  }, [createTask, task.id]);

  const onDeleteTask = useCallback(
    (id?: string) => {
      deleteTask(id ? id : task.id);
    },
    [deleteTask],
  );

  const onChangeValue = useCallback((field: keyof Task, value: string) => {
    setSelectedTask((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="hide-scrollable p-4 min-h-100 max-h-100 overflow-y-auto max-w-md bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-200 rounded-lg shadow-md">
      {/* action buttons - edit, trash, restore, save, delete */}
      <TaskActions
        isEdit={isEdit}
        inTrash={selectedTask.inTrash}
        toggleEdit={toggleEdit}
        toggleTrash={toggleTrash}
        onSaveTask={onSaveTask}
        onDeleteTask={onDeleteTask}
      />
      <div className="space-y-2">
        {/* Title */}
        <div>
          <p className="text-sm font-medium">Title</p>
          {isEdit ? (
            <input
              id="title"
              name="title"
              type="text"
              value={selectedTask.title}
              className="w-full h-8 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-lg"
              onChange={(event) => onChangeValue("title", event.target.value)}
            />
          ) : (
            <p className="h-8 px-2 py-1 border border-transparent">
              {task.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="max-h-30">
          <p className="text-sm font-medium">Description</p>
          {isEdit ? (
            <textarea
              id="description"
              name="description"
              className="w-full max-h-25 border border-gray-200 focus-visible:outline-none px-2 py-1 rounded-lg scrollable"
              rows={5}
              value={selectedTask.description}
              onChange={(event) =>
                onChangeValue("description", event.target.value)
              }
            />
          ) : (
            <p className="h-25 px-2 py-1 border border-transparent whitespace-pre-line overflow-y-auto scrollable focus-visible:outline-none">
              {task.description}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold">{progress}%</span>
          </div>

          {/* Background always gray */}
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Completed */}
        {!selectedTask.children.length && (
          <div className="flex gap-4 items-center">
            <p className="text-sm font-medium">Completed</p>
            <input
              type="checkbox"
              checked={selectedTask.completed}
              onChange={toggleCompleted}
              className="w-4 h-4 cursor-pointer"
              disabled={!selectedTask.children}
            />
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground h-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Created {format(new Date(task?.createdAt), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Updated {format(new Date(task?.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {/* SubTasks Actions */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Subtasks ({selectedTask.children.length})
            </p>
            <div className="flex items-center gap-2 text-xs">
              {!!selectedTask.children.length && (
                <Button
                  onClick={toggleExpand}
                  className="rounded-full! p-1! focus-visible:outline-none dark:border-none dark:hover:bg-slate-600"
                >
                  {isExpand ? (
                    <ListCollapse className="w-4 h-4" />
                  ) : (
                    <ListChevronsDownUp className="w-4 h-4" />
                  )}
                </Button>
              )}
              <Button
                onClick={onAddSubTask}
                className="rounded-full! p-1! focus-visible:outline-none dark:border-none dark:hover:bg-slate-600"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {!selectedTask.children.length && (
            <p className="text-xs">There are no subtasks to show.</p>
          )}
        </div>

        {/* SubTasks */}
        {isExpand &&
          selectedTask.children.map((task) => (
            <SubTask
              key={task.id}
              subtask={task}
              onDeleteSubTask={onDeleteTask}
            />
          ))}
      </div>
    </div>
  );
}
