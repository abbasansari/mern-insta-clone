import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";
import morgan from "morgan";
import { db } from "./utils/db.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcom to Instagram" });
});

//database
db();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is runing on port ${PORT}`.bgGreen);
});
