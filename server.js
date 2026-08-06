require("dotenv").config();

const app = require("./app.js");
const mongodb = require("./data/database.js");

const PORT = process.env.PORT || 3000;

mongodb.initDb((error) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
