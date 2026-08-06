const mongodb = require("../data/database.js");
const { ObjectId } = require("mongodb");

const validateUser = (user) => {
  const validRoles = ["user", "admin"];

  return (
    typeof user.username === "string" &&
    user.username.trim() !== "" &&
    typeof user.displayName === "string" &&
    user.displayName.trim() !== "" &&
    typeof user.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) &&
    typeof user.role === "string" &&
    validRoles.includes(user.role) &&
    typeof user.isActive === "boolean" &&
    typeof user.createdAt === "string" &&
    !Number.isNaN(Date.parse(user.createdAt))
  );
};

const getAll = async (req, res) => {
  try {
    const users = await mongodb
      .getDatabase()
      .collection("users")
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    const user = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve the user.",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      role: req.body.role,
      isActive: req.body.isActive,
      createdAt: req.body.createdAt,
    };

    if (!validateUser(user)) {
      return res.status(400).json({
        message:
          "All user fields are required and must use the correct data types.",
      });
    }

    const existingUser = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({
        $or: [{ username: user.username }, { email: user.email }],
      });

    if (existingUser) {
      return res.status(400).json({
        message: "The username or email is already in use.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("users")
      .insertOne(user);

    res.status(201).json({
      message: "User created successfully.",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create the user.",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    const user = {
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      role: req.body.role,
      isActive: req.body.isActive,
      createdAt: req.body.createdAt,
    };

    if (!validateUser(user)) {
      return res.status(400).json({
        message:
          "All user fields are required and must use the correct data types.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("users")
      .replaceOne({ _id: new ObjectId(req.params.id) }, user);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to update the user.",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("users")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the user.",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
