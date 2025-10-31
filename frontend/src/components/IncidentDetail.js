import React, { useEffect, useState } from "react";
import { getIncident, assignIncident, resolveIncident } from "../api";
import { useParams } from "react-router-dom";

export default function IncidentDetail({ user }) {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [assigneeId, setAssigneeId] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    getIncident(id).then(setIncident).catch(()=>setIncident(null));
  }, [id]);

  const doAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await assignIncident(id, assigneeId || null);
      setIncident(res);
      setMsg("Assigned");
    } catch (e) {
      setMsg(e?.error || "Assign failed");
    }
  };

  const doResolve = async () => {
    try {
      const res = await resolveIncident(id);
      setIncident(res);
      setMsg("Resolved");
    } catch (e) {
      setMsg(e?.error || "Resolve failed");
    }
  };

  if (!incident) return <div className="page-center">Loading incident…</div>;

  return (
    <div className="card fade-up">
      <div className="space-between">
        <div>
          <h3 style={{margin:0}}>#{incident.id} — {incident.title}</h3>
          <div className="row-muted" style={{marginTop:6}}>Created: {new Date(incident.created_at || Date.now()).toLocaleString()}</div>
        </div>
        <div className="row">
          <div className="row-muted">Status: {incident.status}</div>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <p style={{marginTop:0}}>{incident.description || <span className="row-muted">No description</span>}</p>
        <p className="row-muted">Reporter: {incident.reporter ? incident.reporter.name : "N/A"}</p>
        <p className="row-muted">Assignee: {incident.assignee ? incident.assignee.name : "Unassigned"}</p>
      </div>

      {msg && <div style={{marginTop:10}}>{msg}</div>}

      {(user && (user.role === "admin" || user.role === "engineer")) && (
        <div style={{marginTop:12}}>
          <form onSubmit={doAssign} className="row" style={{alignItems:"center"}}>
            <input placeholder="assignee user id (or blank)" className="input" value={assigneeId} onChange={(e)=>setAssigneeId(e.target.value)} />
            <button className="btn ghost" type="submit">Assign</button>
            <button className="btn primary" type="button" onClick={doResolve}>Resolve</button>
          </form>
        </div>
      )}
    </div>
  );
}
