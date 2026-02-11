import { Search, Filter, Trash2, ListFilter, Plus, List } from "lucide-react";
import Chip from "../components/Chip";
import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";
import TaskRoot from "../components/tasks/TaskRoot";
import Button from "../components/Button";
import { useContext, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import { TaskContext } from "../context/TaskContext";

export default function HomePage() {
  const [isForm, setIsForm] = useState(false);

  const {
    isTrash,
    totalTasks,
    searchText,
    trashedTasks,
    completedTasks,
    inProgressTasks,
    setSearchText,
    toggleIsTrash,
    createTask,
  } = useContext(TaskContext);

  return (
    <Layout>
      <Section className="py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Chip
              label="Total Tasks"
              value={totalTasks}
              className="from-purple-600 to-indigo-700 text-white"
            />
            <Chip
              label="In Progress"
              value={inProgressTasks}
              className="from-amber-400 to-orange-500 text-amber-900"
            />
            <Chip
              label="Completed"
              value={completedTasks}
              className="from-emerald-400 to-teal-500 text-emerald-900"
            />
            <Chip
              label="In Trash"
              value={trashedTasks}
              className="from-red-500 to-orange-600 text-white"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="w-full pl-12 pr-2 py-2 border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 rounded-lg focus:outline-none focus:border-purple-500 hover:border-slate-300 dark:hover:border-slate-500 max-h-10"
                placeholder="Search by title or description..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button className="flex items-center gap-2 px-5 py-3 dark:border-gray-600 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 max-h-10">
                <Filter className="size-5" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <Button className="flex items-center gap-2 px-5 py-3 dark:border-gray-600 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 max-h-10">
                <ListFilter className="size-5" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
              <Button
                onClick={toggleIsTrash}
                className="flex items-center gap-2 px-5 py-3 dark:border-gray-600 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 max-h-10"
              >
                {isTrash ? (
                  <List className="size-5" />
                ) : (
                  <Trash2 className="size-5" />
                )}
                <span className="hidden sm:inline min-w-10">
                  {isTrash ? "Active" : "Trash"}
                </span>
              </Button>
              <Button
                onClick={() => setIsForm(true)}
                className="flex items-center gap-2 px-5 py-3 dark:border-gray-600 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 max-h-10"
              >
                <Plus className="size-5" />
                <span className="hidden sm:inline">Add Task</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <TaskRoot />
      </Section>
      <TaskForm
        isOpen={isForm}
        onClose={() => setIsForm(false)}
        onSubmit={createTask}
      />
    </Layout>
  );
}
