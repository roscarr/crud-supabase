import { useState } from "react";
import { useTask } from "../context/TaskContext";
function TasksForm() {
  const [taskname, setTaskname] = useState("");
  const { createTask, adding } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskname);
    setTaskname("");
  };
  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <input
        type="text"
        name="taskName"
        placeholder="write a task name"
        onChange={(e) => setTaskname(e.target.value)}
        value={taskname}
        className="form-control mb-2"
      />
      <div className="ms-auto">
        <button disabled={adding} className="btn btn-primary btn-sm">
          {adding ? "adding ..." : "add"}
        </button>
      </div>
    </form>
  );
}

export default TasksForm;
