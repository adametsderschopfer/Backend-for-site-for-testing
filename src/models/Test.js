import { Schema, model } from "mongoose";

const Test = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  questions: [
    {
      questionTitle: {
        type: String,
        required: true,
      },
      answers: [
        {
          answer: {
            type: String,
            required: true,
          },
          isRight: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
});

export default model("Test", Test);
