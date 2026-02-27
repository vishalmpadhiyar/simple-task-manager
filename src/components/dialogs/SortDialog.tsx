import { useContext, useEffect, useRef } from "react";
import Button from "../Button";
import { SORTING } from "../../lib/const";
import { TaskContext } from "../../context/TaskContext";

interface SortDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILTERLIST = [
  { label: "NEWEST", value: SORTING.NEWEST },
  { label: "OLDEST", value: SORTING.OLDEST },
  { label: "LAST UPDATED", value: SORTING.LAST_UPDATED },
];

export default function SortDialog({ isOpen, onClose }: SortDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { sort, setSort } = useContext(TaskContext);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-100">
      <div
        ref={dialogRef}
        className="flex flex-col items-center justify-between bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 translate-y-12 translate-x-31"
      >
        <div className="p-2">
          {FILTERLIST.map(({ label, value }) => (
            <Button
              onClick={() => setSort(value)}
              className={`border-none w-full text-xs font-medium whitespace-nowrap dark:text-white ${sort === value ? "bg-gray-200 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-700" : "hover:bg-white dark:hover:bg-slate-800"}`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
