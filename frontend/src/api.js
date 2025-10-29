// const API_BASE = "http://localhost:5000/api";

// async function jsonFetch(path, opts = {}) {
//   const z = {
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     ...opts
//   };
//   if (z.body && typeof z.body !== 'string') z.body = JSON.stringify(z.body);
//   const res = await fetch(API_BASE + path, z);
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw data;
//   return data;
// }

// export function login(email, password) {
//   return jsonFetch('/login', { method: 'POST', body: { email, password } });
// }
// export function register(name, email, password, role='engineer') {
//   return jsonFetch('/register', { method: 'POST', body: { name, email, password, role } });
// }
// export function logout() {
//   return jsonFetch('/logout', { method: 'POST' });
// }
// export function getMe() {
//   return jsonFetch('/me', { method: 'GET' });
// }
// export function listIncidents() {
//   return jsonFetch('/incidents', { method: 'GET' });
// }
// export function createIncident(data) {
//   return jsonFetch('/incidents', { method: 'POST', body: data });
// }
// export function getIncident(id) {
//   return jsonFetch(`/incidents/${id}`, { method: 'GET' });
// }
// export function assignIncident(id, assignee_id) {
//   return jsonFetch(`/incidents/${id}/assign`, { method: 'POST', body: { assignee_id } });
// }
// export function resolveIncident(id) {
//   return jsonFetch(`/incidents/${id}/resolve`, { method: 'POST' });
// }


// src/api.js
const API_BASE = "http://localhost:5000/api";

async function request(path, opts = {}) {
  const config = {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...opts,
  };
  if (config.body && typeof config.body !== "string") config.body = JSON.stringify(config.body);
  const res = await fetch(API_BASE + path, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export const login = (email, password) => request("/login", { method: "POST", body: { email, password } });
export const logout = () => request("/logout", { method: "POST" });
export const register = (name, email, password, role = "engineer") =>
  request("/register", { method: "POST", body: { name, email, password, role } });

export const getMe = () => request("/me", { method: "GET" });

export const listIncidents = () => request("/incidents", { method: "GET" });
export const createIncident = (payload) => request("/incidents", { method: "POST", body: payload });
export const getIncident = (id) => request(`/incidents/${id}`, { method: "GET" });
export const assignIncident = (id, assignee_id) =>
  request(`/incidents/${id}/assign`, { method: "POST", body: { assignee_id } });
export const resolveIncident = (id) => request(`/incidents/${id}/resolve`, { method: "POST" });

export const listUsers = () => request("/users", { method: "GET" }).catch(() => []); // optional endpoint if you add it
