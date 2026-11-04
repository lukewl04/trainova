import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database.js";
import session from "express-session";
import { error } from "node:console";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Trainova API connected!" });
});


// get all clients from db - left join on user to clients from coach id so coach name is included.
app.get("/api/clients", (req, res) => {
  const clients = db.prepare(`
    SELECT clients.*, user.username AS coachName
    FROM clients
    LEFT JOIN user ON clients.coachID = user.userid
  `).all();

  res.json(clients);
});

// Add user property to express session (cookie)
declare module "express-session" {
  interface SessionData {
    user: string;
    userid: number;
  }
}

//create env session secret key!! 
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing");
}

// Configure session cookies
app.use(session({
  name: "trainova.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24
  }
}));


//insert client to database
app.post("/api/clients", (req,res) =>{
  const {name, age,weight } = req.body;

  if (typeof name!== "string" || !name.trim()){
    return res.status(400).json({error:"Name is required"});
  }

  const result = db
  .prepare ("INSERT INTO clients (name, age, weight, coachID) VALUES (?,?,?,?)")
  .run(name.trim(), age ?? null, weight ?? null, req.session.userid);
  console.debug(req.session.user + " is the coach")
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

//handle login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== "string" ||
      typeof password !== "string") {
    return res.status(400).json({
      message: "Invalid login details"
    });
  }

  const result = db.prepare(
    "SELECT userid, username FROM user WHERE username = ? AND password = ?"
  ).get(username, password) as
    { userid: number; username: string } | undefined;

  if (!result) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }

  // Create fresh session
  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({
        message: "Session error"
      });
    }

    // Store user in session
    req.session.user = result.username;
    req.session.userid = result.userid;
    // Save session
    req.session.save((error) => {
      if (error) {
        return res.status(500).json({
          message: "Session error"
        });
      }

      // Respond 
      return res.json({
        success: true,
        message: "Welcome" + req.session.user + "!!"
      });
    });
  });
});
  
app.get("/api/me", (req, res) => {
  if (!req.session.userid) {
    return res.status(401).json({
      loggedIn: false
    });
  }

  res.json({
    loggedIn: true,
    username: req.session.user,
    userid: req.session.userid
  });
});




app.listen(PORT, () => {
  console.log(`Trainova backend running on port ${PORT}`);
});

