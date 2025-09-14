import express from "express";
import Candidate from "../models/Candidate.js";
import VoteLog from "../models/VoteLog.js";

const router = express.Router();

//  Get all candidates
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Add candidate (admin use)
router.post("/candidate", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Log a vote after blockchain success
router.post("/vote", async (req, res) => {
  try {
    const { walletAddress, candidateId, txHash } = req.body;

    // Prevent duplicate votes by same wallet (optional rule)
    const alreadyVoted = await VoteLog.findOne({ walletAddress });
    if (alreadyVoted) {
      return res.status(400).json({ error: "This wallet has already voted!" });
    }

    // Save vote log
    const voteLog = new VoteLog({ walletAddress, candidateId, txHash });
    await voteLog.save();

    // Increment vote count for candidate
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

    res.status(201).json(voteLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get voting results
router.get("/results", async (req, res) => {
  try {
    const results = await Candidate.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
