import { createContext, useContext, type ReactNode } from "react";
import useTask from "../hooks/useTask";
import type { Task } from "../lib/types";

interface TaskContextValue {
  isTrash: boolean;
  searchText: string;
  totalTasks: number;
  trashedTasks: number;
  filteredTasks: Task[];
  completedTasks: number;
  inProgressTasks: number;
  setIsTrash: React.Dispatch<React.SetStateAction<boolean>>;
  getItemById: (id: string) => Task | undefined;
  toggleIsTrash: () => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  updateTaskById: (
    id: string,
    field: keyof Task,
    value: string | boolean,
  ) => void;
  createTask: (title: string, description: string) => void;
}

const TaskContext = createContext<TaskContextValue>({
  isTrash: false,
  searchText: "",
  totalTasks: 0,
  trashedTasks: 0,
  filteredTasks: [],
  completedTasks: 0,
  inProgressTasks: 0,
  setIsTrash: () => {},
  getItemById: () => undefined,
  toggleIsTrash: () => {},
  setSearchText: () => {},
  updateTaskById: () => {},
  createTask: () => {},
});

export function TaskProvider({ children }: { children: ReactNode }) {
  const taskState = useTask();

  return (
    <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
