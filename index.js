import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import bodyParser from "body-parser";
// import config from "./config/config.json" assert { type: "json" };

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

// app.listen(8000 || DB_PORT, () => console.log("Server running at port 8000"));
