require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("./config/passport.js");
const mongodb = require("./data/database.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Render runs behind a proxy.
app.set("trust proxy", 1);

// Read JSON request bodies.
app.use(express.json());

// Basic CORS setup.
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

// Login session.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  }),
);

// Passport must come after session middleware.
app.use(passport.initialize());
app.use(passport.session());

// Application routes.
app.use("/", require("./routes"));

// General error handler.
app.use((error, req, res, next) => {
  console.error("Application error:", error);

  res.status(500).json({
    message: "An unexpected server error occurred.",
    error: error.message,
  });
});

// Connect to MongoDB before starting the server.
mongodb.initDb((error) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
