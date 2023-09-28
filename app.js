const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { json } = require("body-parser");
const PORT = 3000;
const app = express();
let currData = "data";
let pastData = null;

app.set("view engine", "ejs");
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.static("styles"));

app.get("/api", (req, res) => {
  // res.status(200);
  // res.setHeader("Content-Type", "application/json");
  res.json(JSON.parse(fs.readFileSync("db.json")));
});

app.get("/", (req, res) => {
  const title = "MINI-SERVER";
  res.render("index.ejs", { title, currData, pastData });
});

app.post("/", (req, res) => {
  pastData = currData;
  currData = JSON.stringify(req.body);
  res.send("Received data");
});
