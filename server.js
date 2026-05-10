const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let serverOn = true;

// middleware
app.use((req, res, next) => {
  if (!serverOn && req.path !== "/admin/cmd") {
    return res.status(503).send("Service Unavailable");
  }
  next();
});

// MAIN UI ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// admin control
app.post("/admin/cmd", (req, res) => {
  if (req.body.cmd === "/shutdown") serverOn = false;
  if (req.body.cmd === "/boot") serverOn = true;

  res.json({ serverOn });
});

app.listen(process.env.PORT || 3000);
