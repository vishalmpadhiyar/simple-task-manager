import { useContext } from "react";
import TaskComponent from "./TaskComponent";
import { TaskContext } from "../../context/TaskContext";

export default function TaskRoot() {
  const { filteredTasks } = useContext(TaskContext);
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
