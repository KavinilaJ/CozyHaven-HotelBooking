import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllUsers, deleteUserById } from "../api"; // adjust path if needed
export default function AdminUsers() {
  const [users, setUsers] = useState([]);



  // ✅ Fetch Users
  const fetchUsers = async () => {
  try {
    const res = await getAllUsers();
    setUsers(res.data);
  } catch (err) {
    console.error("Error fetching users", err);
  }
};

// ✅ Delete User
const deleteUser = async (id) => {
  if (!window.confirm("Are you sure to delete this user?")) return;

  try {
    await deleteUserById(id);

    // Refresh UI
    setUsers(users.filter((u) => u.userId !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👨‍💼 User Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "ADMIN"
                          ? "bg-danger"
                          : user.role === "OWNER"
                          ? "bg-info"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.phone}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}