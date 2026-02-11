import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../lib/types";
import { getStorageTasks, saveStorageTasks } from "../services/storage";

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
    const query = searchText.toLowerCase();

    return tasks.filter((task) => {
      const matchesTrash = isTrash ? task.inTrash : !task.inTrash;
      const matchesSearch =
        !searchText ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      return matchesTrash && matchesSearch;
    });
  }, [tasks, searchText, isTrash]);

  const createTask = useCallback(
    (title: string, description: string): void => {
      const newTask = {
        id: crypto.randomUUID() as string,
        title,
        description,
        completed: false,
        inTrash: false,
        parentId: null,
        children: [],
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveStorageTasks(updatedTasks);
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
  };
}
