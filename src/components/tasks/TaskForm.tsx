import { X } from "lucide-react";
import { useState } from "react";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

export default function TaskForm({ isOpen, onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleReset = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      handleReset();
      onClose();
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-100 transition-all duration-200"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Create New Task
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
                autoFocus
                className="w-full px-4 py-3
                         border-2 border-slate-200 dark:border-slate-600
                         bg-white dark:bg-slate-700
                         text-slate-900 dark:text-slate-100
                         placeholder:text-slate-400
                         rounded-lg
                         focus:outline-none focus:border-purple-500
                         hover:border-slate-300"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
                rows={4}
                className="w-full px-4 py-3
                         border-2 border-slate-200 dark:border-slate-600
                         bg-white dark:bg-slate-700
                         text-slate-900 dark:text-slate-100
                         placeholder:text-slate-400
                         rounded-lg
                         resize-none
                         focus:outline-none focus:border-purple-500
                         hover:border-slate-300"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3
                         bg-slate-100 dark:bg-slate-700
                         text-slate-700 dark:text-slate-300
                         font-medium rounded-lg
                         hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 px-6 py-3
                         bg-linear-to-r from-purple-600 to-blue-600
                         text-white font-medium rounded-lg
                         hover:from-purple-700 hover:to-blue-700
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
