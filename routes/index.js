// Express Router
const express = require("express");
const router = express.Router();

// Models
const User = require("../models/User");

/**
 * @route   GET /api/users
 * @desc    Get all records
 * @access  Public
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).sort({ credits: -1 });
    const length = users.length;

    // No users found
    if (!users || length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Records found!" });
    }

    // Return all the users
    return res.status(200).json({ success: true, count: length, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

/**
 * @route   GET /api/users/count
 * @desc    Get all records
 * @access  Public
 */
router.get("/users/count", async (req, res) => {
  try {
    const users = await User.find({}).select("_id");
    const lengthOfUsers = users.length;

    // No users found
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No Records found!", count: 0 });
    }

    // Return the count
    return res.status(200).json({ success: true, count: lengthOfUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get a particular reocord
 * @access  Public
 */
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found!" });
    }

    // Return the user
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

/**
 * @route   POST /api/users
 * @desc    Create a new reocord
 * @access  Public
 */
router.post("/users", async (req, res) => {
  try {
    const { name, avatar, credits } = req.body;

    // Check for incomplete fields
    if (!name || !avatar || !credits) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    // Create new user object and save in the DB
    const userObj = new User(req.body);
    await userObj.save();

    // Return success
    return res.status(201).json({
      success: true,
      message: "Record added successfully",
      user: userObj,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update a particular reocord
 * @access  Public
 */
router.put("/users/:id", async (req, res) => {
  try {
    const newData = req.body;

    const user = await User.findById(req.params.id).select("id");

    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found!" });
    }

    // Update the record and return
    await User.findByIdAndUpdate(req.params.id, newData, { new: true });

    const users = await User.find();

    return res
      .status(200)
      .json({ success: true, message: "Record updated successfully", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a particular reocord
 * @access  Public
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("id");

    // No user found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found!" });
    }

    // Delete and return success
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
