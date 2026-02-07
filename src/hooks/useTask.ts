import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../lib/types";
import { getStorageTasks } from "../services/storage";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getStorageTasks());
  }, []);

  const getSubItemsById = useCallback(
    (parentId: string): Task[] => {
      return tasks.filter((task) => task.parentId === parentId);
    },
    [tasks],
  );

  const isCompletedTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubItemsById(task.id);

      if (subItems.length === 0) {
        return task.completed === true;
      }

      return subItems.every((sub) => sub.completed === true);
    },
    [getSubItemsById],
  );

  const isInProgressTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubItemsById(task.id);

      if (subItems.length === 0) {
        return task.completed === false;
      }

      return !subItems.every((sub) => sub.completed === true);
    },
    [getSubItemsById],
  );

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const completedTasks = useMemo(
    () => tasks.filter(isCompletedTask).length,
    [tasks, isCompletedTask],
  );

  const inProgressTasks = useMemo(
    () => tasks.filter(isInProgressTask).length,
    [tasks, isInProgressTask],
  );

  const filteredTasks = useMemo(
    () => tasks.filter((task) => !task.parentId),
    [tasks],
  );

  return {
    totalTasks,
    filteredTasks,
    completedTasks,
    inProgressTasks,
    isCompletedTask,
    isInProgressTask,
  };
}
