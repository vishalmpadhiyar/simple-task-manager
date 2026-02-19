import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../lib/types";
import { getStorageTasks, saveStorageTasks } from "../services/storage";
import { convertIntoTree } from "../lib/common";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isTrash, setIsTrash] = useState<boolean>(false);

  useEffect(() => {
    setTasks(getStorageTasks());
  }, []);

  const toggleIsTrash = () => {
    setIsTrash((prev) => !prev);
  };

  const updateTask = useCallback(
    (newTask: Task) => {
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task,
      );
      setTasks(updatedTasks);
      saveStorageTasks(updatedTasks);
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveStorageTasks(updatedTasks);
    },
    [tasks],
  );

  const updateTaskFieldById = useCallback(
    (id: string, field: keyof Task, value: string | boolean) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task,
      );
      setTasks(updatedTasks);
      saveStorageTasks(updatedTasks);
    },
    [tasks],
  );

  const getItemById = useCallback(
    (id: string) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks],
  );

  const getSubTasksById = useCallback(
    (parentId: string): Task[] => {
      return tasks.filter((task) => task.parentId === parentId);
    },
    [tasks],
  );

  const isCompletedTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubTasksById(task.id);
      if (!subItems.length) return task.completed === true;
      return subItems.every((sub) => sub.completed === true);
    },
    [getSubTasksById],
  );

  const isInProgressTask = useCallback(
    (task: Task): boolean => {
      const subItems = getSubTasksById(task.id);
      if (subItems.length === 0) return task.completed === false;
      return !subItems.every((sub) => sub.completed === true);
    },
    [getSubTasksById],
  );

  const rootTasks = useMemo(
    () => tasks.filter((task) => !task.parentId),
    [tasks],
  );

  const totalTasks = useMemo(() => rootTasks.length, [rootTasks]);

  const inProgressTasks = useMemo(
    () => rootTasks.filter(isInProgressTask).length,
    [rootTasks, isInProgressTask],
  );

  const completedTasks = useMemo(
    () => rootTasks.filter(isCompletedTask).length,
    [rootTasks, isCompletedTask],
  );

  const trashedTasks = useMemo(() => {
    return rootTasks.filter((task) => task.inTrash).length;
  }, [rootTasks]);

  const filteredTasks = useMemo(() => {
    const query = searchText.toLowerCase();

    const activeTasks = tasks.filter((task) => {
      const matchesTrash = isTrash ? task.inTrash : !task.inTrash;
      const matchesSearch =
        !searchText ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      return matchesTrash && matchesSearch;
    });

    return convertIntoTree(activeTasks);
  }, [tasks, searchText, isTrash]);

  const createTask = useCallback(
    (
      title: string,
      description: string,
      parentId: string | null = null,
    ): Task => {
      const now = new Date().toISOString();
      const newTask = {
        id: crypto.randomUUID() as string,
        title,
        description,
        parentId,
        completed: false,
        inTrash: false,
        children: [],
        createdAt: now,
        updatedAt: now,
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveStorageTasks(updatedTasks);
      return newTask;
    },
    [tasks],
  );

  return {
    isTrash,
    searchText,
    totalTasks,
    trashedTasks,
    filteredTasks,
    completedTasks,
    inProgressTasks,
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
