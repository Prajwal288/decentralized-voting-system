import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from "./config.js";


const CONTRACT_ADDRESS = VOTING_CONTRACT_ADDRESS;
const abi = VOTING_CONTRACT_ABI;

function CandidateList({ account }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error(" Error fetching candidates:", err);
    }
  };

  // Handle voting
  const voteCandidate = async (candidateIndex, candidateId, candidateName) => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      // Call vote with index (uint256)
      const tx = await contract.vote(candidateIndex);
      await tx.wait();

      //  Save to backend with MongoDB _id
      await axios.post("http://localhost:5000/api/vote", {
        walletAddress: account,
        candidateId, // MongoDB _id
        txHash: tx.hash,
      });
      

      alert(` Vote cast for ${candidateName}`);
      fetchCandidates();
    } catch (err) {
      console.error(" Voting failed:", err);
      alert("Voting failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Candidates</h2>
      <div className="space-y-3">
        {candidates.map((c, index) => (
          <div
            key={c._id}
            className="border rounded-lg p-4 flex justify-between items-center bg-gray-50 shadow-sm"
          >
            <span className="text-lg font-medium">
              {c.name} ({c.party}) —{" "}
              <span className="font-bold">{c.votes} votes</span>
            </span>
            <button
              onClick={() => voteCandidate(index, c._id, c.name)}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Voting..." : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateList;
