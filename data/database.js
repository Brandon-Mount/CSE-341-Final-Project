const { MongoClient } = require("mongodb");

let database;

const initDb = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db(process.env.DATABASE_NAME);

    console.log("Connected to MongoDB");

    callback(null, database);
  } catch (error) {
    callback(error);
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
