import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { TaskContextProvider, useTask } from "./context/TaskContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nofound from "./pages/Nofound";
import { supabase } from "./supebase/client";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="App">
      <TaskContextProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Nofound />} />
            <Route />
          </Routes>
        </div>
      </TaskContextProvider>
    </div>
  );
}

export default App;
