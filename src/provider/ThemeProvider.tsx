import type { ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import { ThemeContext } from "../context/ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}
