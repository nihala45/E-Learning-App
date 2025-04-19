import React, { useEffect, useState } from 'react';
import api from '../../api';

const MangementUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("api/user/userslist/");
      const filteredUsers = response.data.filter(
        (user) => !user.is_superuser && !user.is_staff
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const blockUser = async (id) => {
    try {
      await api.post(`/api/user/userslist/${id}/block/`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, is_active: false } : user
        )
      );
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (id) => {
    try {
      await api.post(`/api/user/userslist/${id}/unblock/`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, is_active: true } : user
        )
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h1 className="px-6 py-3 bg-green-400 text-white text-xl font-semibold rounded mb-6">
          MANAGE USERS
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b">Username</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Role</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    {user.is_active ? (
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1 px-3 rounded"
                        onClick={() => blockUser(user.id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded"
                        onClick={() => unblockUser(user.id)}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MangementUsers;
