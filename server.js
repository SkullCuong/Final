"use strict";

const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Website running on: http://localhost:3000");
});
app.get("/", (req, res) => {
  response.send("'Welcome to manage toy application");
});
