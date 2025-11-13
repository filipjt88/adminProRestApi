import React, { useState, useEffect } from "react";

export default function UserForm({ editingUser, onAdd, onUpdate, onCancel, showForm }) {
  const [user, setUser] = useState({ name: "", username: "", email: "", city: "", website: "" });

  useEffect(() => {
    setUser(editingUser || { name: "", username: "", email: "", city: "", website: "" });
  }, [editingUser]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.username) return alert("Name and username are required!");
    editingUser ? onUpdate({ ...user, id: editingUser.id }) : onAdd(user);
  };

  if (!showForm) return null;

  return (
    <div className="card p-4 mb-4 shadow">
      <h5>{editingUser ? "Edit User" : "Add User"}</h5>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {["name","username","email","city","website"].map(field => (
          <input
            key={field}
            type="text"
            className="form-control mb-2"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={user[field]}
            onChange={handleChange}
          />
        ))}
        <div className="text-end">
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
