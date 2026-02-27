import { FILTERS, ROUTE, SORTING, THEME } from "./const";

export type Theme = (typeof THEME)[keyof typeof THEME];
export type Route = (typeof ROUTE)[keyof typeof ROUTE];
export type Filters = (typeof FILTERS)[keyof typeof FILTERS];
export type Sorting = (typeof SORTING)[keyof typeof SORTING];

export interface Task {
  id: string;
  title: string;
  description: string;
  parentId: string | null;
  completed: boolean;
  inTrash: boolean;
  children: Task[];
  createdAt: string;
  updatedAt: string;
}
