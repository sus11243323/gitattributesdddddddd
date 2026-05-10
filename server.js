const express = require("express");
const app = express();

app.use(express.json());

let serverOn = true;

// middleware MUST come before static + routes
app.use((req, res, next) => {
  if (!serverOn && req.path !== "/admin/cmd") {
    return res.status(503).send("Service Unavailable");
  }
  next();
});

// admin control
app.post("/admin/cmd", (req, res) => {
  if (req.body.cmd === "/shutdown") serverOn = false;
  if (req.body.cmd === "/boot") serverOn = true;

  res.json({ serverOn });
});

// static AFTER middleware
app.use(express.static("public"));

// main route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || 3000);
