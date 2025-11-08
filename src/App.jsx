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

  // Login funkcija
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
        alert("Pogrešan username ili lozinka!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Greška pri loginu!");
    }
  };

  // Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsers([]);
  };

  // Učitavanje korisnika
  const load = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error("Load users error:", error);
      alert("Ne mogu se učitati korisnici");
    } finally {
      setLoading(false);
    }
  };

  // CRUD funkcije
  const handleAdd = async (user) => {
    try {
      await createUser(user);
      await load();
      setShowForm(false);
    } catch (err) {
      console.error("Create error:", err);
      alert("Greška pri dodavanju korisnika!");
    }
  };

  const handleUpdate = async (user) => {
    try {
      await updateUser(user);
      await load();
      setEditingUser(null);
      setShowForm(false);
    } catch (err) {
      console.error("Update error", err);
      alert("Greška pri izmeni korisnika!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete korisnika?")) return;
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      console.error("Delete error", err);
      alert("Greška pri brisanju korisnika!");
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

      {/* Dugme za odjavu */}
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
        <p>Učitavanje...</p>
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
