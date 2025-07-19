import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClaimPoints = ({ selectedUser, setRefreshTrigger }) => {
  const [points, setpoints] = useState(null);

  const handelclaim = async () => {
    try {
      if (!selectedUser) return;

      const pointsRes = await axios.post("http://localhost:3000/claim-points", { id: selectedUser });
      const userRes = await axios.post("http://localhost:3000/user", { id: selectedUser });

      setpoints(pointsRes.data);
      toast.success(`${userRes.data.name} has claimed ${pointsRes.data.pointsclaimed} points`);

      // ✅ Trigger leaderboard & user list refresh
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      toast.error("Something went wrong while claiming points.");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handelclaim}
        disabled={!selectedUser}
        className={`px-6 py-3 text-lg rounded-xl transition duration-300 
          ${selectedUser
            ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_12px_rgba(0,255,255,0.5)]'
            : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
      >
        🎯 Claim Points
      </button>
    </div>
  );
};

export default ClaimPoints;
