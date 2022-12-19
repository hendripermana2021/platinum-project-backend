import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//socket IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ["polling"],
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("create", function (room) {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

global.io = io;

const { PORT = 8000 } = process.env;

httpServer.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
