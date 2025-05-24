const MongoDB = require("mongodb").MongoClient;
require("dotenv").config();

const URI = process.env.DB_URI;

const initDB = async () => {
  try {
    const db = await MongoDB.connect(URI);
    if (!db) {
      throw new Error({
        message: "Failed to connect to MongoDB",
        status: "500",
      });
    } else {
      return {
        db,
        status: "Success",
        message: "Successfully Connected to MongoDB",
      };
    }
  } catch (error) {
    return error;
  }
};

const getDB = async () => {
  try {
    const connection = await MongoDB.connect(URI);
    const db = connection.db("users").collection("users")
    if (!db) {
      throw new Error({
        message: "Failed connecting to DB and Collection",
        status: "Error",
      });
    }
    return db;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDB,
  initDB,
};
