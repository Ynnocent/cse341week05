const mongoDB = require("../db/connect.js");
const ObjectID = require("mongodb").ObjectId;

// GET
const getAll = async (req, res, next) => {
  const db = await mongoDB.getDB();
  try {
    results = db.find();
    results.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting list of users" });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      res.status(500).json({
        message: "Invalid ID",
      });
    }
    const userID = ObjectID.createFromHexString(id);
    const db = await mongoDB.getDB();
    const user = await db.findOne({ _id: userID });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// POST
const createUser = async (req, res, next) => {
  try {
    const { username, password, birthdate, country } = req.body;

    const newUser = {
      username,
      password,
      birthdate,
      country,
    };

    const db = await mongoDB.getDB();

    await db.insertOne(newUser);
    res.status(201).json({
      message: "Successfully created a new user",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating a new user",
    });
  }
};

// DELETE
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const db = await mongoDB.getDB();
    if (!ObjectID.isValid(id)) {
      return res.status(500).json({ message: "Invalid ID" });
    }

    const userID = ObjectID.createFromHexString(id);
    const deletedUser = await db.deleteOne({ _id: userID });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// PUT
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, password, birthdate, country } = req.body;

    const updatedUser = {
      username,
      password,
      birthdate,
      country,
    };

    const db = await mongoDB.getDB();
    if (!ObjectID.isValid(id)) {
      return res.status(500).json({ message: "Invalid ID" });
    }
    const userID = ObjectID.createFromHexString(id);

    const result = await db.updateOne({ _id: userID }, { $set: updatedUser });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Successfully updated User" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  deleteUser,
  updateUser,
};
