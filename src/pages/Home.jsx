import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TasksForm from "../components/TasksForm";
import { supabase } from "../supebase/client";

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <TasksForm />
        <header className="d-flex justify-content-between my-3">
          <span>{showTaskDone ? "Task Done" : "Task to do"}</span>
          <button
            onClick={() => setShowTaskDone(!showTaskDone)}
            className="btn btn-dark btn-sm"
          >
            {showTaskDone ? "Show task to do" : "Show task done"}
          </button>
        </header>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}

export default Home;
