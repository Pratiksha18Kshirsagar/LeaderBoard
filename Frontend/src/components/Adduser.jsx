import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const Adduser = ({ setRefreshTrigger }) => {
  const [userName, setuserName] = useState("");

  const handelAdd = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast.error("Please enter a valid name!");
      return;
    }
    let res = await axios.post("https://leaderboard-t83r.onrender.com/adduser", { name: userName });
    toast.success(`✅ ${userName} joined the battle!`);

    setuserName("");
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <form onSubmit={handelAdd} className="flex gap-3 items-center">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter name"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
        className="px-4 py-2 rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition duration-200"
      >
        Add
      </button>
    </form>
  );
};

export default Adduser;
