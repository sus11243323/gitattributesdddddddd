const express = require("express");
const app = express();

app.use(express.json());

let serverOn = true;

// HARD GATE: runs BEFORE EVERYTHING
app.use((req, res, next) => {
  if (!serverOn) {
    return res.status(503).send("Service Unavailable");
  }
  next();
});

// admin control (still accessible even when off)
app.post("/admin/cmd", (req, res) => {
  if (req.body.cmd === "/shutdown") serverOn = false;
  if (req.body.cmd === "/boot") serverOn = true;

  res.json({ serverOn });
});

// ONLY serve static if serverOn is true (after middleware already checked it)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || 3000);
