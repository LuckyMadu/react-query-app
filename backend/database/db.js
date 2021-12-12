const mongoose = require("mongoose");
const constants = require("../static/static.json");

const connectDB = async () => {
  try {
    //construct the db connection uri
    let connectionURI = null;

    if (process.env.APP_ENV == "local") {
      connectionURI = `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    }

    //connect to the mongodb database
    await mongoose
      .connect(connectionURI, {
        useNewUrlParser: true,
      })
      .then(() => console.log("mongoDB connected!"));
  } catch (err) {
    //log the database error
    console.log(
      constants.LOGGER.INFO,
      constants.LOGGER.COULD_NOT_CONNECT_TO_THE_DATABASE +
        JSON.stringify(err.message)
    );
  }
};

module.exports = connectDB;
