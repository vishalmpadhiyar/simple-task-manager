import { useCallback, useEffect, useMemo, useState } from "react";
import type { Filters, Sorting, Task } from "../lib/types";
import { getStorageTasks, saveStorageTasks } from "../services/storage";
import { convertIntoTree } from "../lib/common";
import { FILTERS, SORTING } from "../lib/const";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isTrash, setIsTrash] = useState(false);
  const [filter, setFilter] = useState<Filters>(FILTERS.ALL);
  const [sort, setSort] = useState<Sorting>(SORTING.NEWEST);

  useEffect(() => {
    setTasks(getStorageTasks());
  }, []);

  const childrenMap = useMemo(() => {
    const map = new Map<string, Task[]>();

    for (const task of tasks) {
      if (!task.parentId) continue;
      if (!map.has(task.parentId)) {
        map.set(task.parentId, []);
      }
      map.get(task.parentId)!.push(task);
    }

    return map;
  }, [tasks]);

  const toggleIsTrash = useCallback(() => setIsTrash((prev) => !prev), []);

  const getItemById = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const getSubTasks = useCallback(
    (id: string) => childrenMap.get(id) ?? [],
    [childrenMap],
  );

  const isCompleted = useCallback(
    (task: Task) => {
      const subItems = getSubTasks(task.id);
      if (!subItems.length) return task.completed;
      return subItems.every((s) => s.completed);
    },
    [getSubTasks],
  );

  const isInProgress = useCallback(
    (task: Task) => {
      const subItems = getSubTasks(task.id);
      if (!subItems.length) return false;
      return subItems.some((s) => s.completed);
    },
    [getSubTasks],
  );

  const isPending = useCallback(
    (task: Task) => {
      const subItems = getSubTasks(task.id);
      if (!subItems.length) return !task.completed;
      return subItems.every((s) => !s.completed);
    },
    [getSubTasks],
  );

  const { totalTasks, completedTasks, inProgressTasks, trashedTasks } =
    useMemo(() => {
      let total = 0;
      let completed = 0;
      let progress = 0;
      let trashed = 0;

      for (const task of tasks) {
        if (task.parentId) continue;

        total++;

        if (task.inTrash) trashed++;
        if (isCompleted(task)) completed++;
        else if (isInProgress(task)) progress++;
      }

      return {
        totalTasks: total,
        completedTasks: completed,
        inProgressTasks: progress,
        trashedTasks: trashed,
      };
    }, [tasks, isCompleted, isInProgress]);

  const displayedTasks = useMemo(() => {
    const query = searchText.toLowerCase();

    const filteredTasks = tasks.filter((task) => {
      if (task.parentId) return true;
      if (isTrash ? !task.inTrash : task.inTrash) return false;

      switch (filter) {
        case FILTERS.COMPLETED:
          if (!isCompleted(task)) return false;
          break;
        case FILTERS.IN_PROGRESS:
          if (!isInProgress(task)) return false;
          break;
        case FILTERS.PENDING:
          if (!isPending(task)) return false;
          break;
      }

      if (
        query &&
        !task.title.toLowerCase().includes(query) &&
        !task.description.toLowerCase().includes(query)
      ) {
        return false;
      }

      return true;
    });

    if (!filteredTasks.length) return [];

    let sortedTasks = filteredTasks;
    switch (sort) {
      case SORTING.NEWEST:
        sortedTasks = filteredTasks.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;

      case SORTING.OLDEST:
        sortedTasks = filteredTasks.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;

      case SORTING.LAST_UPDATED:
        sortedTasks = filteredTasks.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
    }
    return convertIntoTree(sortedTasks);
  }, [
    sort,
    tasks,
    filter,
    isTrash,
    searchText,
    isPending,
    isCompleted,
    isInProgress,
  ]);

  const persist = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = updater(prev);
      saveStorageTasks(next);
      return next;
    });
  }, []);

  const updateTask = useCallback(
    (newTask: Task) =>
      persist((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t))),
    [persist],
  );

  const deleteTask = useCallback(
    (id: string) => persist((prev) => prev.filter((t) => t.id !== id)),
    [persist],
  );

  const updateTaskFieldById = useCallback(
    (id: string, field: keyof Task, value: string | boolean) =>
      persist((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
      ),
    [],
  );

  const createTask = useCallback(
    (title: string, description: string, parentId: string | null = null) => {
      const timestamp = new Date().toISOString();
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        parentId,
        completed: false,
        inTrash: false,
        children: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      persist((prev) => {
        const updated = parentId
          ? prev.map((task) =>
              task.id === parentId ? { ...task, updatedAt: timestamp } : task,
            )
          : prev;

        return [newTask, ...updated];
      });

      return newTask;
    },
    [],
  );

  return {
    sort,
    filter,
    isTrash,
    searchText,
    totalTasks,
    trashedTasks,
    displayedTasks,
    completedTasks,
    inProgressTasks,
    setSort,
    setFilter,
    setIsTrash,
    getItemById,
    toggleIsTrash,
    setSearchText,
    updateTask,
    updateTaskFieldById,
    createTask,
    deleteTask,
  };
}
