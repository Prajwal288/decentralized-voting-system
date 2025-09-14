import express from "express"
import cors from "cors"

const app =express()

app.use (
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials:true
    })
)

app.use(cors({
  origin: "http://localhost:5173"  // React dev server
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))


import voteRoutes from "./routes/votingRoutes.js"
app.use("/api", voteRoutes);

export {app}