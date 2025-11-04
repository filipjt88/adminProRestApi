import React, {useState} from "react";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

export default function App() {
  const [users, setUsers] = useState([
    {id: 1, name: "Filip", username: "Jotic", email: "filip88bg@gmail.com", city: "Belgrade"},
    {id: 2, name: "Marko", username: "Petrovic", email: "marko99@gmail.com", city: "Novi Sad"}
  ]);

  const[editingUser, setEditingUser] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const handleAdd = (user) => {
    setUsers([...users, {id: users.length + 1, ...user}]);
    setShowForm(false);
  };

  const handleUpdate = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
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