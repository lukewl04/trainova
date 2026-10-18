import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Trainova API connected!" });
});


// get all clients from db
app.get("/api/clients", (req,res) =>{
  const clients = db.prepare("SELECT * FROM clients").all();

  res.json(clients);
});


//insert client to database
app.post("/api/clients", (req,res) =>{
  const {name, age,weight } = req.body;

  if (typeof name!== "string" || !name.trim()){
    return res.status(400).json({error:"Name is required"});
  }

  const result = db
  .prepare ("INSERT INTO clients (name, age, weight) VALUES (?,?,?)")
  .run(name.trim(), age ?? null, weight ?? null);

  res.status(201).json({ id: result.lastInsertRowid});
})

app.get("/api/jack", (req, res) => {
  const name = "jack"
  const age = 24
  const weight = 78


  res.json({ name: name, age: age, weight:weight});
});

app.listen(PORT, () => {
  console.log(`Trainova backend running on port ${PORT}`);
});

