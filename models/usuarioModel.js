const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome Obrigatório"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email Obrigatório"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Senha Obrigatória"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
