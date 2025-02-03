const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://yashwanth:Yash%40123@cluster0.sg1s0.mongodb.net/Management"; //Need to create .env (Not Created)

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
