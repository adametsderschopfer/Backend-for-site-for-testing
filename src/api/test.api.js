import { Router } from "express";

import User from "../models/User";
import Test from "../models/Test";

const router = Router();

router.get("/:testId", async (req, res) => {
  const testId = req.params.testId;

  try {
    const findedTest = await Test.findById(testId);

    findedTest.views = findedTest.views + 1;
    await findedTest.save();

    res.json({ findedTest });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:testId/finish", async (req, res) => {
  const { points } = req.body;

  try {
    const _user = await User.findById(req.user.userId);

    _user.points = +_user.points + +points;
    await _user.save();

    res.status(200);
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  const { title, questions } = req.body;

  if (!title) {
    res.status(400);
  }

  if (!questions.length) {
    res.status(400);
  }

  try {
    const newTest = new Test({
      title,
      author: req.user.username,
      views: 0,
      questions,
    });

    await newTest.save();
    res.status(201).json({ msg: "Тест был создан!" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
