export default function UserTable({ users, onEdit, onDelete }) {
  return (
    // Table users
    <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>City</th>
          <th>Website</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="7">No users found</td></tr>
        ) : users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>{user.website}</td>
            <td>
              {/* Edit user btn */}
              <button className="btn btn-warning btn-sm me-1" onClick={() => onEdit(user)}>Edit</button>
              {/* Delete user btn */}
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
