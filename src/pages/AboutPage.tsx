import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";

const aboutPage = {
  title: "About Simple Task Manager",
  description:
    "Simple Task Manager is a clean and intuitive productivity app designed for everyone — whether you're a student, a working professional, or just someone who wants to stay on top of their daily tasks. It helps you organize your life by breaking down your work into manageable pieces, allowing you to create tasks, add subtasks, and track your progress all in one place. With a dedicated progress bar, you can always see how close you are to getting things done.",
  features: {
    title: "Key Features",
    list: [
      {
        label: "Task Management",
        text: "Create, edit, and delete tasks with full control. Manage your workload efficiently by organizing tasks according to your priorities and requirements.",
      },
      {
        label: "Subtasks",
        text: "Break down complex tasks into smaller, structured subtasks for better clarity and focus. Each subtask is displayed in a clean, dedicated view within the main task for easy tracking.",
      },
      {
        label: "Search",
        text: "Locate any task instantly using the search bar. Search is supported by both task title and description, making it easy to find exactly what you are looking for without scrolling through the entire list.",
      },
      {
        label: "Filters",
        text: "Apply filters to sort and organize your tasks based on your current needs. Quickly switch between different views to focus on what matters most at any given time.",
      },
      {
        label: "Trash",
        text: "Deleted tasks are safely moved to the trash before any permanent action is taken. Review and restore tasks if needed, or permanently delete them when you are certain they are no longer required.",
      },
      {
        label: "Progress Bar",
        text: "Monitor your task completion through a visual progress bar. Get a clear and immediate overview of how much work has been completed and how much remains, helping you stay on track at all times.",
      },
    ],
  },
};

export default function AboutPage() {
  const { title, description, features } = aboutPage;
  return (
    <Layout className="bg-gray-200 py-10">
      <Section>
        <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg p-8 space-y-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-slate-800">{title}</h1>
            <p className="text-slate-600">{description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-medium text-slate-800">
              {features.title}
            </h2>
            <ul className="space-y-3">
              {features.list.map(({ label, text }, index) => (
                <li key={index}>
                  <p className="font-medium">
                    {index + 1}. {label}
                  </p>
                  <p className="text-sm">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-medium text-slate-800">
              Built for Simplicity
            </h2>
            <p className="text-slate-600">
              No unnecessary clutter. No steep learning curve. Simple Task
              Manager is built with a focus on clean design and smooth
              experience — so you spend less time managing your app and more
              time actually getting things done.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
