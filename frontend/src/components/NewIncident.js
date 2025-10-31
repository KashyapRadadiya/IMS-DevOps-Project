import React, { useState } from "react";
import { createIncident } from "../api";
import { useNavigate } from "react-router-dom";

export default function NewIncident() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [priority,setPriority] = useState("medium");
  const [err,setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await createIncident({ title, description, priority });
      nav(`/incidents/${res.id}`);
    } catch (e) {
      setErr(e?.error || "Failed to create");
    }
  };

  return (
    <div className="card fade-up">
      <h3 style={{marginTop:0}}>Create Incident</h3>
      {err && <div style={{color:"#b91c1c"}}>{err}</div>}
      <form onSubmit={submit}>
        <div className="form-row">
          <label className="row-muted">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="row-muted">Description</label>
          <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="row-muted">Priority</label>
          <select className="input" value={priority} onChange={e=>setPriority(e.target.value)}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div style={{display:"flex", gap:10}}>
          <button className="btn primary" type="submit">Create</button>
          <button className="btn ghost" type="button" onClick={()=>nav("/dashboard")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
