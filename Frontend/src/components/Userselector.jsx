import React, { useState, useEffect } from 'react';
import axios from "axios";

const Userselector = ({ selectedUser, setSelectedUser, refreshTrigger }) => {

  const [allusers, setallusers] = useState([]);

  const fetchUsers = async () => {
    const users = await axios.get("http://localhost:3000/users");
    // console.log(users);
    setallusers(users.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4">
      <label htmlFor="users" className="text-xl text-white font-semibold mb-2">🎮 Select a Player</label>

      <select
        value={selectedUser}
        name="users"
        id="users"
        onChange={(e) => setSelectedUser(e.target.value)}
        className="bg-[#1f1f1f] border border-[#3a3a3a] text-white text-lg px-6 py-3 rounded-2xl shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 w-80 text-center"
      >
        <option value="" disabled>Select User</option>
        {allusers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Userselector;
