import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("engineer");
  const [msg,setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await register(name,email,password,role);
      setMsg("Account created — please sign in.");
      nav("/login");
    } catch (e) {
      setMsg(e?.error || "Registration failed");
    }
  };

  return (
    <div className="page-center">
      <div className="card" style={{width:520}}>
        <h2 style={{margin:0, marginBottom:10}}>Create an account</h2>
        <p className="row-muted" style={{marginTop:0}}>Simple account for incident management</p>
        {msg && <div style={{marginTop:8, marginBottom:8}}>{msg}</div>}
        <form onSubmit={submit} className="fade-up">
          <div className="form-row">
            <label className="row-muted">Full name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div className="form-row">
            <label className="row-muted">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          </div>
          <div className="form-row">
            <label className="row-muted">Password</label>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          </div>
          <div className="form-row">
            <label className="row-muted">Role</label>
            <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="engineer">Engineer</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
            </select>
          </div>
          <div style={{display:"flex", gap:10}}>
            <button type="submit" className="btn primary">Create</button>
            <button type="button" className="btn ghost" onClick={()=>nav("/login")}>Back to login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
