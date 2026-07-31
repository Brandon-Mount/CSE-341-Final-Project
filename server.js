require("dotenv").config();

const express = require("express");
const mongodb = require("./data/database.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/", require("./routes"));

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

mongodb.initDb((error) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
