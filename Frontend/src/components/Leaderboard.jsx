import React, { useState, useEffect } from 'react';
import axios from "axios";

const Leaderboard = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  

  const fetchData = async () => {
    const res = await axios.get("https://leaderboard-t83r.onrender.com/leaderboard");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  // Only show users with > 0 points in topThree
  const filteredUsers = users.filter(user => user.totalpoints > 0);
  const topThree = filteredUsers.slice(0, 3);

  // Fix: Avoid reference-based filter issues by comparing _id
  const rest = users.filter(user => !topThree.some(top => top._id === user._id));



  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* No Users Message */}
      {users.length === 0 && (
        <p className="text-white text-center mt-6 text-lg font-semibold">
          No users found. Please add some!
        </p>
      )}

      {/* Top 3 Cards */}
      {topThree.length > 0 && (
        <div className="flex justify-center gap-6 mt-4">
          {topThree.map((user, index) => (
            <div
              key={user._id}
              className={`flex flex-col items-center p-4 rounded-xl shadow-xl w-32 h-40 relative bg-gradient-to-b from-yellow-${index === 0 ? '400' : index === 1 ? '300' : '200'} to-yellow-100`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white mb-2">
                <img
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-bold text-center truncate w-full">{user.name}</p>
              <p className="text-xs text-yellow-700 font-semibold">🏆 {user.totalpoints}</p>
              <span className="absolute top-0 right-0 text-xl">
                {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto bg-[#1a1a1a] rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.1)] p-6 w-full max-w-3xl">
         <div className="flex justify-center items-center mb-4">
  <h2 className="text-2xl font-bold text-cyan-400">🏆 Leaderboard</h2>
</div>


          <table className="min-w-full table-auto border-collapse text-white">
            <thead>
              <tr className="text-cyan-300 border-b border-cyan-600">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="py-3 px-4">{index + topThree.length + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.name}`}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    {user.name}
                  </td>
                  <td className="py-3 px-4">{user.totalpoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
