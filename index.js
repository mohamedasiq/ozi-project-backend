const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const roomRoute = require("./routes/rooms");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");

app.use(express.json());

mongoose.connect(
    'mongodb+srv://alliswell:alliswell123@cluster0.d0st0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/rooms", roomRoute);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);

  app.listen(8803, () => {
    console.log("Backend server is running!");
  });
