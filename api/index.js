import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";
import morgan from "morgan";
import { db } from "./utils/db.js";
import { configDotenv } from "dotenv";
import authRouter from "./routes/authRouter.js";

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

//Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Routes
app.use("/api/user", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcom to Instagram" });
});

//database
db();

const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`App is runing on port ${process.env.PORT}`.bgGreen);
});
