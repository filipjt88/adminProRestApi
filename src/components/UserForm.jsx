import React, { useState, useEffect} from "react";

export default function UserForm({editingUser, onAdd, onUpdate, onCancel, showForm}) {
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        city: "",
        website: "",
    });

    useEffect(() => {
        if(editingUser) {
            setUser(editingUser);
        } else {
            setUser({
                name: "",
                username: "",
                email: "",
                city: "",
                website: "",
            });
        }
    }, [editingUser]);


    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.username) {
      alert("Name and username are required!");
      if (editingUser) onUpdate(user);
    else onAdd(user);
    };

    // Reset forme
    setUser({ name: "", username: "", email: "", city: "", website: "", });};

    return(
        <div className={`card p-4 mb-4 shadow ${showForm ? "" : "d-none"}`}>
            <h5 className="mb-3">{editingUser ? "Edit user" : "Add user"}</h5>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-2" name="name" placeholder="Name..." value={user.name} onChange={handleChange}/>
                <input type="text" className="form-control mb-2" name="username" placeholder="Username..." value={user.username} onChange={handleChange} />
                <input type="email" className="form-control mb-2" name="email" placeholder="Email..." value={user.email} onChange={handleChange} />
                <input type="text" className="form-control mb-2" name="city" placeholder="City..." value={user.city} onChange={handleChange}/>
                <input type="text" className="form-control mb-2" name="website" placeholder="Website..." value={user.website} onChange={handleChange} />
                <div className="text-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => onCancel()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}