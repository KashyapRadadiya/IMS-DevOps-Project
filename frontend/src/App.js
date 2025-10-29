// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import IncidentDetail from './components/IncidentDetail';
// import NewIncident from './components/NewIncident';
// import { getMe, logout } from './api';

// function App() {
//   const [user, setUser] = useState(null);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     getMe().then(data => {
//       setUser(data.user);
//       setChecking(false);
//     }).catch(err => {
//       console.error(err);
//       setChecking(false);
//     });
//   }, []);

//   if (checking) return <div>Loading...</div>;

//   return (
//     <BrowserRouter>
//       <div className="app">
//         <nav>
//           <Link to="/">Dashboard</Link>
//           {user ? (
//             <>
//               <span style={{marginLeft:10}}>{user.name} ({user.role})</span>
//               <button style={{marginLeft:10}} onClick={() => {
//                 logout().then(()=> setUser(null));
//               }}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" style={{marginLeft:10}}>Login</Link>
//               <Link to="/register" style={{marginLeft:10}}>Register</Link>
//             </>
//           )}
//         </nav>

//         <Routes>
//           <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
//           <Route path="/login" element={<Login onLogin={u => setUser(u)} />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/incidents/new" element={user ? <NewIncident user={user} /> : <Navigate to="/login" />} />
//           <Route path="/incidents/:id" element={user ? <IncidentDetail user={user} /> : <Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


// src/App.js
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
      <footer className="footer">© {new Date().getFullYear()} IMS — Minimal • Responsive</footer>
    </div>
  );
}
