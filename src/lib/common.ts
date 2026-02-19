import type { Task } from "./types";

export const defaultTask = {
  id: "",
  title: "",
  description: "",
  parentId: null,
  completed: false,
  inTrash: false,
  children: [],
  createdAt: "",
  updatedAt: "",
};

export const convertIntoTree = (tasks: Task[]): Task[] => {
  const taskMap = new Map<string, Task>();

  tasks.forEach((task) => {
    taskMap.set(task.id, { ...task, children: [] });
  });

  const rootTasks: Task[] = [];

  taskMap.forEach((task) => {
    if (task.parentId) {
      const parent = taskMap.get(task.parentId);
      if (parent) {
        parent.children!.push(task);
      }
    } else {
      rootTasks.push(task);
    }
  });

  return rootTasks;
};
