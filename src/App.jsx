import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Login from "./components/LoginForm";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";

export default function App() {
  const [users, setUsers]             = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [loggedIn, setLoggedIn]       = useState(false);

  // Login function
  const handleLogin = async ({ username, password }) => {
    try {
      const res = await fetch("http://localhost/adminProRestApi/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setLoggedIn(true);
        load(); // Ucitaj korisnike
      } else {
        alert("Wrong username or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error!");
    }
  };

  // Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsers([]);
  };

  // Waiting for users
  const load = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error("Load users error:", error);
      alert("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  // Add
  const handleAdd = async (user) => {
    try {
      await createUser(user);
      await load();
      setShowForm(false);
    } catch (err) {
      console.error("Create error:", err);
      alert("Error adding user!");
    }
  };
  // Update
  const handleUpdate = async (user) => {
    try {
      await updateUser(user);
      await load();
      setEditingUser(null);
      setShowForm(false);
    } catch (err) {
      console.error("Update error", err);
      alert("Error while changing user!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete the user?")) return;
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      console.error("Delete error", err);
      alert("Error deleting user!");
    }
  };

  // Render login
  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container py-4">
      <Navbar
        onAddUser={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
      />

      {/* button for logout */}
      <div className="text-end mb-3">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {showForm && (
        <UserForm
          editingUser={editingUser}
          showForm={showForm}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onCancel={() => {
            setEditingUser(null);
            setShowForm(false);
          }}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          users={users}
          onEdit={(user) => {
            setEditingUser(user);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
