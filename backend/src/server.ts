import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Trainova API connected!" });
});

app.get("/api/jack", (req, res) => {
  const name = "jack"
  const age = 24
  const weight = 78


  res.json({ name: name, age: age, weight:weight});
});

app.listen(PORT, () => {
  console.log(`Trainova backend running on port ${PORT}`);
});

