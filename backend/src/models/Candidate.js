import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  votes: { type: Number, default: 0 },
});



export default mongoose.model("Candidate", candidateSchema);
