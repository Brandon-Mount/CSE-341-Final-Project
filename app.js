require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("./config/passport.js");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));

app.use((error, req, res, next) => {
  console.error("Application error:", error);

  res.status(500).json({
    message: "An unexpected server error occurred.",
    error: error.message,
  });
});

module.exports = app;
