import { createContext } from "react";
import type { Filters, Sorting, Task } from "../lib/types";
import { defaultTask } from "../lib/common";
import { FILTERS, SORTING } from "../lib/const";

interface TaskContextValue {
  sort: Sorting;
  filter: Filters;
  isTrash: boolean;
  searchText: string;
  totalTasks: number;
  trashedTasks: number;
  displayedTasks: Task[];
  completedTasks: number;
  inProgressTasks: number;
  setSort: React.Dispatch<React.SetStateAction<Sorting>>;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
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
  createTask: (
    title: string,
    description: string,
    parent_id?: string | null,
  ) => Task;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue>({
  sort: SORTING.NEWEST,
  filter: FILTERS.ALL,
  isTrash: false,
  searchText: "",
  totalTasks: 0,
  trashedTasks: 0,
  displayedTasks: [],
  completedTasks: 0,
  inProgressTasks: 0,
  setSort: () => {},
  setFilter: () => {},
  setIsTrash: () => {},
  getItemById: () => undefined,
  toggleIsTrash: () => {},
  setSearchText: () => {},
  updateTask: () => {},
  updateTaskFieldById: () => {},
  createTask: () => defaultTask,
  deleteTask: () => {},
});
