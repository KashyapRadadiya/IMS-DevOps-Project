import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NewIncident from "./components/NewIncident";
import IncidentDetail from "./components/IncidentDetail";
import { getMe } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoadingUser(false));
  }, []);

  if (loadingUser) return <div className="page-center">Loading…</div>;

  return (
    <div className="app-root">
      <NavBar user={user} onLogout={() => setUser(null)} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/incidents/new" element={user ? <NewIncident user={user} /> : <Navigate to="/login" />} />
          <Route path="/incidents/:id" element={user ? <IncidentDetail user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} IMS - Contact • kashyapradadiya1234@gmail.com</footer>
    </div>
  );
}
