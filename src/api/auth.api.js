import { Router } from "express";
import Cookies from "cookies";

import User from "../models/User";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cookie = new Cookies(req, res);

    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ msg: "Вы не указали имя пользователя!" });
    }

    const newUser = new User({ username, points: 0 });

    await newUser.save((err, { _id, username }) => {
      cookie.set("userId", _id);
      cookie.set("username", username, { httpOnly: false });
      res.status(200).json({ msg: "Пользователь успешно создан" });
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
