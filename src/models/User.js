import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "O campo USERNAME é obrigatório!"],
  },
  password: {
    type: String,
    required: [true, "O campo PASSWORD é obrigatório!"],
  },
});

const user = mongoose.model("user", userSchema);

export default user;
