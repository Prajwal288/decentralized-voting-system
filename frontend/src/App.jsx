import React, { useState } from "react";
import CandidateList from "./CandidateList.jsx";
import Results from "./results.jsx";
import './App.css'

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(selectedAccount);
      } catch (err) {
        console.error("User denied wallet connection:", err);
      }
    } else {
      alert("MetaMask not found! Please install it.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          🗳️ Decentralized Voting System
        </h1>

        {!account ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-600">

            </p>
            <CandidateList account={account} />
            <Results />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
