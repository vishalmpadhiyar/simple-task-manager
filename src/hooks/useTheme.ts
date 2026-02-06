import { useCallback, useEffect, useState } from "react";
import { getStorageTheme, saveStorageTheme } from "../services/storage";
import { THEME } from "../lib/const";
import type { Theme } from "../lib/types";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getStorageTheme());

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEME.DARK) {
      root.classList.add(THEME.DARK);
    } else {
      root.classList.remove(THEME.DARK);
    }

    saveStorageTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK));
  }, []);

  return { theme, toggleTheme };
}
