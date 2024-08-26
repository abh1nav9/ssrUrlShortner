const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://abh1nav9:Abh1nav%4009@urlshortner.prcf6.mongodb.net/";

async function connectToMongoDb() {
  return mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = {
  connectToMongoDb,
};
