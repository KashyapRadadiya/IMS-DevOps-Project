// import React, { useState } from 'react';
// import { login } from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error,setError] = useState(null);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const res = await login(email, password);
//       onLogin(res.user);
//       nav('/');
//     } catch (err) {
//       setError(err.error || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <div style={{color:'red'}}>{error}</div>}
//       <form onSubmit={submit}>
//         <label>Email</label>
//         <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
//         <label>Password</label>
//         <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }



// src/components/Login.js
import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await login(email, password);
      onLogin && onLogin(res.user);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.error || "Login failed");
    }
  };

  return (
    <div className="page-center">
      <div className="card" style={{width:460}}>
        <h2 style={{margin:0, marginBottom:12}}>Welcome back</h2>
        <p className="row-muted" style={{marginTop:0, marginBottom:14}}>Sign in with your account to continue</p>
        {err && <div style={{color:"#b91c1c", marginBottom:10}}>{err}</div>}
        <form onSubmit={submit} className="fade-up">
          <div className="form-row">
            <label className="row-muted">Email</label>
            <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
          </div>
          <div className="form-row">
            <label className="row-muted">Password</label>
            <input className="input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
          </div>
          <div className="space-between" style={{marginTop:6}}>
            <button type="submit" className="btn primary">Sign in</button>
            <button type="button" className="btn ghost" onClick={()=>nav("/register")}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
