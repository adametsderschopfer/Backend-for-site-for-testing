import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { isProduction, isDevelopment } from "./utils/config";
import authMiddleware from "./middleware/auth.middleware";
import authApi from "./api/auth.api";
import testApi from "./api/test.api";
import Test from "./models/Test";
import User from "./models/User";

/*
 * INIT & CONFIGURATE -> APP
 */
const root = path.join.bind(this, __dirname);
const app = express();

// Cross-origin resource sharing
app.use(cors());

// parse cookies
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json({ extended: true }));

// secure Express apps by setting various HTTP headers.
app.use(helmet());

// logger if isDevelopment
if (isDevelopment) {
  app.use(morgan("dev"));
}

/*
 * API
 */

app.get("/", async (req, res) => {
  try {
    const tests = await Test.find().select("views _id title author questions");
    const users = await User.find();

    res.status(200).json({
      users,
      tests,
    });
  } catch (error) {
    console.log(error);
  }
});
// auth
app.use("/auth", authApi);
app.use("/test", authMiddleware, testApi);

// 404
app.use((req, res) => {
  res.status(404).json({
    msg: "404 NOT FOUND",
  });
});

/*
 * Return SPA - application
 */

if (isProduction) {
  app.use("/", express.static(root("../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;

// await new Test({
//   title: "ТЫ ТОЧНО ЗНАЕШЬ ВСЕ ПРО ЭТОГО БЛОГЕРА?",
//   author: "вася пупкин",
//   views: 0,
//   questions: [
//     {
//       questionTitle: "ЧЕТА ТАМ",
//       answers: [
//         {
//           answer: "жопа",
//           isRight: false,
//         },
//         {
//           answer: "ты прав",
//           isRight: true,
//         },
//       ],
//     },
//   ],
// }).save();
