import { useEffect, useMemo, useState } from "react";
import type { Task } from "../lib/types";
import { getStorageTasks } from "../services/storage";

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getStorageTasks());
  }, []);

  const filteredTasks = useMemo(() => tasks.filter((task) => task), [tasks]);

  return {
    filteredTasks,
  };
}
