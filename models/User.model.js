const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    surname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['GUEST', 'ADMIN'],
      default: 'GUEST',
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: Number,
        required: true
      }
    },
    phoneNumber: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: false
    },
    myFavorites: [{ type: String, }]

  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
