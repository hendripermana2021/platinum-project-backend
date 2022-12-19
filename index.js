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

// io.on("connection", (socket) => {
//   securityContext.verifySocketToken(socket, socketUtils.socketUtility);
// });

// verifySocketToken = (socket, callback) => {
//   let token = socket.request.headers.bearertoken;
//   if (token === null || typeof token === "undefined") {
//     return new Error("Unauthorized (token not valid)");
//   }
//   try {
//     var payload = jwt.verify(token, this.config.secretKey, {
//       algorithms: ["RS256"],
//     });
//     socket.request.tenantId = payload.tenantId;
//     socket.request.userId = payload._id;
//     callback(socket);
//   } catch (ex) {
//     return new Error("Unauthorized (token not valid)");
//   }
// };

// socketUtility = (socket) => {
//   socket.on("subscribe", (filter) => {
//     let filterSerialized = JSON.stringify(filter);
//     socket.join(filterSerialized);
//     socket
//       .to(filterSerialized)
//       .emit(
//         "response",
//         JSON.stringify({ status: "Subscribed", id: socket.id })
//       );
//   });

// Runs when client disconnects
// socket.on("disconnect", () => {
//   console.log("Disconnected!!");
// });

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
