const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const common = require("./lib/util");
const commonResponseType = require("./static/static.json");
const usersRouter = require("./modules/users/routers/users.route");

//defined port
const PORT = 8000;

const app = express();

dotenv.config();

//connect database
connectDB();

// enable cors
app.use(cors());

app.use(express.json());

app.use("/api/users", usersRouter);

// error handler
app.use((err, req, res, next) => {
  // render the error page
  let response = common.commonResponse(
    commonResponseType.RESPONSE_SUCCESS.FALSE,
    {},
    commonResponseType.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    commonResponseType.RESPONSE_FAIL.TRUE
  );

  return res
    .status(commonResponseType.HTTP_RESPONSE.HTTP_BAD_REQUEST)
    .json(response);
});

app.listen(PORT, () => console.log("Backend server is running!"));
