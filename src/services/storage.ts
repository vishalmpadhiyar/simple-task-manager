import { STORAGE_KEYS, THEME } from "../lib/const";
import type { Task, Theme } from "../lib/types";

export const getStorageTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || "[]");
};

export const saveStorageTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const getStorageTheme = (): Theme => {
  return (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || THEME.LIGHT;
};

export const saveStorageTheme = (theme: Theme): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
