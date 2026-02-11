import { Moon, Sun } from "lucide-react";
import Navbar from "../Navbar";
import { ROUTE, THEME } from "../../lib/const";
import Button from "../Button";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-50">
      <div className="max-h-16 border-b border-gray-300 bg-white text-black dark:bg-slate-900 dark:border-gray-600 dark:text-white">
        <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <a href={ROUTE.HOME} className="focus-visible:outline-none">
            <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Task Manager
            </span>
            <p className="text-xs text-gray-500 dark:text-white">
              Organize your work, boost your productivity
            </p>
          </a>
          <div className="max-md:hidden">
            <Navbar />
          </div>
          <Button
            onClick={toggleTheme}
            className="rounded-full! dark:border-none dark:hover:bg-linear-to-r from-purple-600 to-blue-600 dark:focus-visible:outline-none dark:focus-visible:bg-linear-to-r"
          >
            {theme === THEME.DARK ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-white" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-white" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
