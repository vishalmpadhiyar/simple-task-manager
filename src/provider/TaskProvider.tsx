import type { ReactNode } from "react";
import useTask from "../hooks/useTask";
import { TaskContext } from "../context/TaskContext";

export function TaskProvider({ children }: { children: ReactNode }) {
  const taskState = useTask();

  return (
    <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>
  );
}
