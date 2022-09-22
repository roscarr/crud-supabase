import { createContext, useContext, useState } from "react";
import { supabase } from "../supebase/client";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("usetask must be used within a taskContextProvider");

  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTask = async (done = false) => {
    setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("userId", user.id)
      .eq("done", done)
      .order("id", { ascending: true });
    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };
  const createTask = async (taskname) => {
    setAdding(true);
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase.from("tasks").insert({
        name: taskname,
        userId: user.id,
      });
      if (error) throw error;
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };
  const deleteTask = async (id) => {
    const user = supabase.auth.user();
    const { error, data } = await supabase
      .from("tasks")
      .delete()
      .eq("userId", user.id)
      .eq("id", id);
    if (error) throw error;
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const updateTask = async (id, updateFields) => {
    const user = supabase.auth.user();
    const { error, data } = await supabase
      .from("tasks")
      .update(updateFields)
      .eq("userId", user.id)
      .eq("id", id);
    if (error) throw error;
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
