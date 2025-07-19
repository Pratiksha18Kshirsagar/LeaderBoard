import './App.css';
import Userselector from './components/Userselector';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import Adduser from './components/Adduser';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedUser, setSelectedUser] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
   
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center py-10 px-4 gap-6">
      <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-glow mb-4">⚡ Live Leaderboard</h1>

      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.2)] space-y-6">
        <Adduser setRefreshTrigger={setRefreshTrigger} />
        <Userselector
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          refreshTrigger={refreshTrigger}
        />
        <ClaimPoints
          selectedUser={selectedUser}
          setRefreshTrigger={setRefreshTrigger}
        />
      </div>

      <div className="w-full max-w-3xl mt-8">
        <Leaderboard refreshTrigger={refreshTrigger} />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-[#1f1f1f] text-cyan-300 border border-cyan-400 rounded-xl shadow-lg font-medium"
        bodyClassName="text-md"
        progressClassName="bg-cyan-400"
      />

    </div>
  );
}

export default App;
