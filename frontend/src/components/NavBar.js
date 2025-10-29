import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";

export default function NavBar({ user, onLogout }) {
  const nav = useNavigate();

  const doLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // ignore
    } finally {
      onLogout && onLogout();
      nav("/login");
    }
  };

  return (
    <header className="nav">
      <div className="brand">
        <div className="logo">IMS</div>
        <div>
          <div style={{fontSize:14}}>Incident Manager</div>
          <div style={{fontSize:12, color:"var(--muted)"}}>Minimal • Focused</div>
        </div>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <div className="row row-muted" style={{fontSize:13}}>
              {user.name} • <span style={{textTransform:"capitalize"}}>{user.role}</span>
            </div>
            <button className="btn ghost" onClick={() => nav("/dashboard")}>Dashboard</button>
            <button className="btn primary" onClick={() => nav("/incidents/new")}>New Incident</button>
            <button className="btn ghost" onClick={doLogout}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">Sign in</Link>
            <Link to="/register" className="btn primary">Create account</Link>
          </>
        )}
      </div>
    </header>
  );
}
