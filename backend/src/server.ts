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

//delete client from db
app.delete("/api/clients/:id", (req,res) => {
  //id
  const id = Number(req.params.id);

  //run sql
  const client = db.prepare("DELETE FROM clients WHERE id ==  ?")
  .run(id);

  //message
  res.json({ message: "Item deleted" });

});



app.listen(PORT, () => {
  console.log(`Trainova backend running on port ${PORT}`);
});

