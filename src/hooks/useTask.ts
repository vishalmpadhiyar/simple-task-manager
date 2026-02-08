import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../lib/types";
import { getStorageTasks } from "../services/storage";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isTrash, setIsTrash] = useState<boolean>(false);

  useEffect(() => {
    setTasks(getStorageTasks());
  }, []);

  const updateTaskById = useCallback(
    (id: string, field: keyof Task, value: string | boolean) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, [field]: value } : task,
        ),
      );
    },
    [setTasks],
  );

  const getItemById = useCallback(
    (id: string) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks],
  );

  const getSubItemsById = useCallback(
    (parentId: string): Task[] => {
      return tasks.filter((task) => task.parentId === parentId);
    },
    [tasks],
  );

  const isCompletedTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubItemsById(task.id);
      if (!subItems.length) return task.completed === true;
      return subItems.every((sub) => sub.completed === true);
    },
    [getSubItemsById],
  );

  const isInProgressTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubItemsById(task.id);
      if (subItems.length === 0) return task.completed === false;
      return !subItems.every((sub) => sub.completed === true);
    },
    [getSubItemsById],
  );

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const inProgressTasks = useMemo(
    () => tasks.filter(isInProgressTask).length,
    [tasks, isInProgressTask],
  );

  const completedTasks = useMemo(
    () => tasks.filter(isCompletedTask).length,
    [tasks, isCompletedTask],
  );

  const trashedTasks = useMemo(() => {
    return tasks.filter((task) => task.inTrash).length;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return isTrash
      ? tasks.filter(
          (task) =>
            task.inTrash &&
            (task.title.includes(searchText) ||
              task.description.includes(searchText)),
        )
      : tasks.filter(
          (task) =>
            !task.inTrash &&
            (task.title.includes(searchText) ||
              task.description.includes(searchText)),
        );
  }, [tasks, searchText, isTrash]);

  return {
    searchText,
    totalTasks,
    filteredTasks,
    completedTasks,
    inProgressTasks,
    trashedTasks,
    isCompletedTask,
    isInProgressTask,
    setIsTrash,
    setSearchText,
    getItemById,
    updateTaskById,
  };
}
