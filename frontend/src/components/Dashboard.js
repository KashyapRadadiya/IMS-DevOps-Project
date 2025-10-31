import React, { useEffect, useState } from "react";
import { listIncidents } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listIncidents()
      .then((data) => {
        setIncidents(data);
      })
      .catch(() => setIncidents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fade-up">
      <div className="space-between" style={{marginBottom:18}}>
        <div>
          <h2 style={{margin:0}}>Incidents</h2>
          <div className="row-muted" style={{marginTop:6}}>Manage and assign incidents</div>
        </div>
        <div>
          <Link to="/incidents/new" className="btn primary">New incident</Link>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="page-center">Loading incidents…</div>
        ) : incidents.length === 0 ? (
          <div style={{padding:28}} className="row-muted">No incidents yet — create one.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Title</th><th>Priority</th><th>Status</th><th>Assignee</th><th></th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id}>
                  <td>{inc.id}</td>
                  <td><Link to={`/incidents/${inc.id}`} style={{color:"var(--accent-2)"}}>{inc.title}</Link></td>
                  <td className="row-muted">{inc.priority}</td>
                  <td>{inc.status}</td>
                  <td className="row-muted">{inc.assignee ? inc.assignee.name : "-"}</td>
                  <td><Link to={`/incidents/${inc.id}`} className="btn ghost">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
