const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://aksh:aka123@atlascluster.zjyi9.mongodb.net/";

mongoose.connect(mongoURI, {
  dbName: "food-order-app"
})
.then(() => {
  console.log("Connected to MongoDB successfully.");
})
.catch((error) => {
  console.error("Error occurred while connecting to MongoDB:", error);
});

