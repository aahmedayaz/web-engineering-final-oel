const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const Transaction = require("../models/Transaction");

// @route   GET /transaction
// @desc    Get Transaction
// @access  Private
router.get("/", authToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ owner_id: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /transaction
// @desc    Add Transaction
// @access  Private
router.post("/", authToken, async (req, res) => {
  let { title, price, type } = req.body;
  title = title?.trim();
  type = type?.trim();

  // =============================================================================================
  // Data Validation
  // =============================================================================================
  if (!title || title === "" || !type || type === "" || !price) {
    return res.status(400).json({
      error: "Bad Request: Some credentials are missing.",
    });
  }

  try {
    const newTransaction = new Transaction({
      title,
      price,
      type,
      owner_id: req.user.id,
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /transaction
// @desc    Update Transaction
// @access  Private
router.put("/:id", authToken, async (req, res) => {
  let { title, price, type } = req.body;

  const transactionFields = {};
  // add fields into transactionFields Object that are available in the body to update
  if (title) transactionFields.title = title;
  if (price) transactionFields.price = price;
  if (type) transactionFields.type = type;

  try {
    // Check if transactions exist
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "This transaction does not exist." });

    // Check if user is authorized
    if (transaction.owner_id.toString() !== req.user.id)
      return res.status(401).json({
        msg: "You do not have the correct authorization to update this transaction.",
      });

    // Find and Update the transaction
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    );

    res.json({ transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /transaction
// @desc    Delete Transaction
// @access  Private
router.delete("/:id", authToken, async (req, res) => {
  try {
    // Check if transaction exist
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ msg: "This transaction does not exist." });

    // Check if user is authorized
    if (transaction.owner_id.toString() !== req.user.id)
      return res.status(401).json({
        msg: "You do not have the correct authorization to delete this transaction.",
      });

    // Find and remove the transaction from MongoDB
    await Transaction.findByIdAndRemove(req.params.id);

    // Return a confirmation message
    res.json({ msg: "This transaction has been removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
