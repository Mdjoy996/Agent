const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 DEMO DATABASE (later MongoDB হবে)
let users = [
  {
    username: "mother",
    password: bcrypt.hashSync("1234",10),
    role: "mother"
  },
  {
    username: "super",
    password: bcrypt.hashSync("1234",10),
    role: "superadmin"
  },
  {
    username: "agent",
    password: bcrypt.hashSync("1234",10),
    role: "agent"
  }
];

// 🔐 LOGIN API
app.post("/login", async (req,res)=>{

  const {username,password} = req.body;

  const user = users.find(u => u.username === username);

  if(!user){
    return res.json({error:"User not found"});
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match){
    return res.json({error:"Wrong password"});
  }

  const token = jwt.sign(
    {username:user.username,role:user.role},
    "SECRET_KEY"
  );

  res.json({
    token,
    role:user.role
  });
});


// 👑 CREATE USER (ANY ROLE CAN CREATE LOWER ROLE)
app.post("/create",(req,res)=>{

  const {username,password,role} = req.body;

  if(!username || !password || !role){
    return res.json({error:"Missing data"});
  }

  users.push({
    username,
    password: bcrypt.hashSync(password,10),
    role
  });

  res.json({success:true,users});
});


// 📊 GET ALL USERS
app.get("/users",(req,res)=>{
  res.json(users);
});

app.listen(5000,()=>{
  console.log("Backend running on port 5000");
});
