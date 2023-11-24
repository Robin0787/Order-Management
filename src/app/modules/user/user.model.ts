import { Schema, model } from "mongoose";
import { Address, FullName, User } from "./user.interface";

const FullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const UserSchema = new Schema<User>({
  userId: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: AddressSchema, required: true },
});

export const UserModel = model<User>("user", UserSchema);
