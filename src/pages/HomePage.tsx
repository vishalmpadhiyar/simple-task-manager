import { Search } from "lucide-react";
import Chip from "../components/Chip";
import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";
import useTask from "../hooks/useTask";

export default function HomePage() {
  const { totalTasks, completedTasks, inProgressTasks } = useTask();

  return (
    <Layout>
      <Section className="py-10">
        <div className="bg-white dark:bg-white p-4 rounded-md space-y-4">
          <div className="flex gap-8">
            <Chip
              label="Total Tasks"
              value={totalTasks}
              className="from-purple-600 to-purple-800 text-white"
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
          </div>
          <div className="flex gap-16">
            <div className="relative flex items-center border border-gray-600 rounded-md p-2 min-w-136">
              <Search className="size-5 absolute text-gray-600" />
              <input
                type="text"
                className="pl-8 bg-transparent w-full h-full focus-visible:outline-none"
              />
            </div>
            {/* filters */}
            <div className="flex-1"></div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
