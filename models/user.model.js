const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-email");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "firstName cannot be empty",
  },
  lastName: {
    type: String,
    required: "lastName cannot be empty",
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: "email field cannot be empty",
    unique: true,
  },
  password: {
    type: String,
    required: "password field cannot be empty",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
