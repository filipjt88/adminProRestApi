import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";


export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ucitaj korisnike
  const load = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : (data ? [data] :  []));
    } catch (error) {
      console.error("Load users error:",error);
      alert("Ne mogu se ucitati korisnici");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

 const handleAdd = async (user) => {
  try {
    await createUser(user);
    await load();
    setShowForm(false);
  } catch(err) {
    console.error("Create error:",err);
    alert("Greska pri dodavanju korisnika!");
  }
};

const handleUpdate = async(user) => {
    try {
      await updateUser(user);
      await load();
      setEditingUser(null);
      setShowForm(false);
    } catch(err) {
      console.error("Update error", err);
      alert("Greska pri izmeni korisnika!");
    }
};

const handleDelete = (id) => {
  setUsers(users.filter(u => u.id !== id));
};

  return(
    <div className="container py-4">
      <Navbar onAddUser={() => { setEditingUser(null); setShowForm(true); }} />
      <UserForm
        editingUser={editingUser}
        showForm={showForm}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={() => setShowForm(false)}
      />
      <UserTable
        users={users}
        onEdit={(user) => { setEditingUser(user); setShowForm(true); }}
        onDelete={handleDelete}
      />
    </div>
  )
}