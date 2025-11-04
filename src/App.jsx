import React, {useState} from "react";
import Navbar from "./components/Navbar";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

export default function App() {
  const [users, setUsers] = useState([
    {id: 1, name: "Filip", username: "Jotic", email: "filip88bg@gmail.com", city: "Belgrade"},
    {id: 2, name: "Marko", username: "Petrovic", email: "marko99@gmail.com", city: "Novi Sad"}
  ]);

  const[editingUser, setEditingUser] = useState(null);

  const handleAdd = (user) => {
    setUsers([...user,{ id: users.length + 1}]);
  };

  const handleUpdate = (user) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return(
    <div className="container py-4">
      <Navbar OnAddUser={() => {
        setEditingUser(null);
        setShowForm(true);
      }}/>
      <UserForm onAdd={handleAdd} onUpdate={handleUpdate} editingUser={editingUser}/>
      <UserTable users={users} onEdit={setEditingUser} onDelete={handleDelete}/>
    </div>
  )

}