const express = require("express");
require("dotenv").config();
const connectDB = require("./db/db");

// Connect Database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Backend of Expense Tracker.",
  });
});

// Routes
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/transaction", require("./routes/transaction"));

app.listen(PORT, () => {
  console.log(`Server has started at http://localhost:${PORT}`);
});
