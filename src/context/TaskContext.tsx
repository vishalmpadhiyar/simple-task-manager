import { createContext } from "react";
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
  updateTask: (task: Task) => void;
  updateTaskFieldById: (
    id: string,
    field: keyof Task,
    value: string | boolean,
  ) => void;
  createTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue>({
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
  updateTask: () => {},
  updateTaskFieldById: () => {},
  createTask: () => {},
  deleteTask: () => {},
});
