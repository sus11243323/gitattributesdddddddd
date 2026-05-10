const express = require("express");
const app = express();

app.use(express.json());

let serverOn = true;

// 🔥 THIS is the key: global block middleware
app.use((req, res, next) => {
  if (!serverOn) {
    return res
      .status(503)
      .send("503 Service Unavailable - Server is currently offline");
  }
  next();
});

// normal route
app.get("/", (req, res) => {
  res.send("Website is ONLINE");
});

// admin command (you trigger shutdown here)
app.post("/admin/cmd", (req, res) => {
  const cmd = req.body.cmd;

  if (cmd === "/shutdown") {
    serverOn = false;
  }

  if (cmd === "/boot") {
    serverOn = true;
  }

  res.json({ serverOn });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});