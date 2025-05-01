const dotenv = require("dotenv");
dotenv.config(); // Load .env file

const MongoClient = require("mongodb").MongoClient; // Use MongoDB's native client
let _db;

// Initialize the database connection
const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client; // Save the client connection for reuse
      callback(null, _db);
    })
    .catch((err) => {
      callback(err); // Pass any connection error to the callback
    });
};

// Getter to use the db elsewhere
const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = { initDb, getDb };
