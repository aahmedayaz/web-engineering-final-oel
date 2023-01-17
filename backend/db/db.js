const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB is Connected.");
    })
    .catch((error) => {
      console.log("MONGO ERROR >> ", error);
    });
};

module.exports = connectDB;
