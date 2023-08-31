import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Required !!"],
  },
  about:String,
  profileURL: String,
});
UserSchema.index({ email: 1 }, { unique: true });
export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
