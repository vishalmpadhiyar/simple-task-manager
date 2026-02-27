import { useContext, useEffect, useRef } from "react";
import Button from "../Button";
import { FILTERS } from "../../lib/const";
import { TaskContext } from "../../context/TaskContext";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILTERLIST = [
  { label: "ALL", value: FILTERS.ALL },
  { label: "PENDING", value: FILTERS.PENDING },
  { label: "IN PROGRESS", value: FILTERS.IN_PROGRESS },
  { label: "COMPLETED", value: FILTERS.COMPLETED },
];

export default function FilterDialog({ isOpen, onClose }: FilterDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { filter, setFilter } = useContext(TaskContext);

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
        className="flex flex-col items-center justify-between bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 translate-y-12 translate-x-3"
      >
        <div className="p-2">
          {FILTERLIST.map(({ label, value }) => (
            <Button
              onClick={() => setFilter(value)}
              className={`border-none w-full text-xs font-medium whitespace-nowrap dark:text-white ${filter === value ? "bg-gray-200 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-700" : "hover:bg-white dark:hover:bg-slate-800"}`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
