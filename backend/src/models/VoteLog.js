import mongoose from "mongoose";

const voteLogSchema = new mongoose.Schema({
  walletAddress: String,
  candidateId: String,
  txHash: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("VoteLog", voteLogSchema);
