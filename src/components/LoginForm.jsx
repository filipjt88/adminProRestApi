import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/adminProRestApi/backend/api/login.php", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ username, password})
            });
            const data = await res.json();
            if(!res.ok) throw new Error(data.message || "Login failed");
            onLogin(data.token);
        } catch(err) {
            setError(err.message);
        }
    };

    return (
    <div className="card p-4 shadow mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h5 className="mb-3 text-center">Admin Login</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );

}