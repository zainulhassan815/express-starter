import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 8,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
