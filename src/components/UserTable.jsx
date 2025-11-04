import React from "react";

export default function UserTable({ users, onEdit, onDelete, setShowForm}) {
    return(
        <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>City</td>
                    <td>Webiste</td>
                    <td>Action</td>
                </tr>
            </thead>
                <tbody>
                    {users.map((user) => {
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>{user.website}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-1" onClick={() => {
                                    onEdit(user);
                                    setShowForm(true);
                                }}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => {
                                    if(window.confirm("Are you sure you want to delete the user?")) {
                                        onDelete(user.id);
                                    }
                                }}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
        </table>
    );
}