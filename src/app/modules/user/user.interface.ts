import { Model } from "mongoose";

export interface TFullName {
  firstName: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: OrderedItem[];
}

export type OrderedItem = {
  productName: string;
  price: number;
  quantity: number;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
  hasOrder(userId: number): Promise<TUser | null>;
}
