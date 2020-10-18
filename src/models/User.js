import {Schema, model} from "mongoose"

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  }                      
});

export default model("Users", User)