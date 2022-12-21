import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import bodyParser from "body-parser";
import { createServer } from "http";
// import { Server } from "socket.io";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { Server } from "socket.io";

//socket IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ["polling"],
  cors: {
    origin: "*",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    //FUNCTION FOR SAVE DATA ONLINE USERS
    addNewUser(username, socket.id);
    console.log("user connected");
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

global.io = io;

const { PORT = 8000 } = process.env;

httpServer.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
