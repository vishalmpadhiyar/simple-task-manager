import { useTaskContext } from "../../context/TaskProvider";
import TaskComponent from "./TaskComponent";

export default function TaskRoot() {
  const { filteredTasks } = useTaskContext();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
        {filteredTasks.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
