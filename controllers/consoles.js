const mongodb = require("../data/database.js");
const { ObjectId } = require("mongodb");

const validateConsole = (consoleData) => {
  return (
    typeof consoleData.name === "string" &&
    consoleData.name.trim() !== "" &&
    typeof consoleData.manufacturer === "string" &&
    consoleData.manufacturer.trim() !== "" &&
    typeof consoleData.releaseYear === "number" &&
    Number.isInteger(consoleData.releaseYear) &&
    typeof consoleData.generation === "string" &&
    consoleData.generation.trim() !== "" &&
    typeof consoleData.storage === "string" &&
    consoleData.storage.trim() !== "" &&
    typeof consoleData.supportsOnline === "boolean"
  );
};

const getAll = async (req, res) => {
  try {
    const consoles = await mongodb
      .getDatabase()
      .collection("consoles")
      .find()
      .toArray();

    res.status(200).json(consoles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve consoles.",
      error: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid console ID.",
      });
    }

    const consoleData = await mongodb
      .getDatabase()
      .collection("consoles")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!consoleData) {
      return res.status(404).json({
        message: "Console not found.",
      });
    }

    res.status(200).json(consoleData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve the console.",
      error: error.message,
    });
  }
};

const createConsole = async (req, res) => {
  try {
    const consoleData = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      releaseYear: req.body.releaseYear,
      generation: req.body.generation,
      storage: req.body.storage,
      supportsOnline: req.body.supportsOnline,
    };

    if (!validateConsole(consoleData)) {
      return res.status(400).json({
        message:
          "All console fields are required and must use the correct data types.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("consoles")
      .insertOne(consoleData);

    res.status(201).json({
      message: "Console created successfully.",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create the console.",
      error: error.message,
    });
  }
};

const updateConsole = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid console ID.",
      });
    }

    const consoleData = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      releaseYear: req.body.releaseYear,
      generation: req.body.generation,
      storage: req.body.storage,
      supportsOnline: req.body.supportsOnline,
    };

    if (!validateConsole(consoleData)) {
      return res.status(400).json({
        message:
          "All console fields are required and must use the correct data types.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("consoles")
      .replaceOne({ _id: new ObjectId(req.params.id) }, consoleData);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Console not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to update the console.",
      error: error.message,
    });
  }
};

const deleteConsole = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid console ID.",
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("consoles")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Console not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the console.",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createConsole,
  updateConsole,
  deleteConsole,
};
