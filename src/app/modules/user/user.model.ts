import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TUser,
  UserMethods,
  UserModel,
} from "./user.interface";

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const UserSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: AddressSchema,
    required: true,
  },
});

UserSchema.methods.isUserExists = async function (userId: number) {
  const existedUser = await User.findOne({ userId });
  return existedUser;
};

export const User = model<TUser, UserModel>("user", UserSchema);
