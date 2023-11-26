import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import {
  OrderedItem,
  TAddress,
  TFullName,
  TUser,
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

const OrderedItemSchema = new Schema<OrderedItem>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<TUser, UserModel>({
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
  orders: {
    type: [OrderedItemSchema],
    required: false,
    select: false,
  },
});

// pre save middleware for hashing password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// creating a custom static method
UserSchema.statics.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("user", UserSchema);
