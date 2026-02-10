import { ROUTE, THEME } from "./const";

export type Theme = (typeof THEME)[keyof typeof THEME];
export type Route = (typeof ROUTE)[keyof typeof ROUTE];

export interface Task {
  id: string;
  title: string;
  description: string;
  parentId: string | null;
  completed: boolean;
  inTrash: boolean;
  children: Task[];
}
