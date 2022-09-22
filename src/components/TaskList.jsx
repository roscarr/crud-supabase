import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList({ done = false }) {
  const { tasks, getTask, loading } = useTask();
  useEffect(() => {
    getTask(done);
  }, [done]);
  function renderTasks(params) {
    if (loading) {
      return <p>loading ...</p>;
    } else if (tasks.length === 0) {
      return <p>task no found</p>;
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      );
    }
  }
  return <div>{renderTasks()}</div>;
}

export default TaskList;
