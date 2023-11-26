import { OrderedItem, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async (studentData: TUser) => {
  if (await User.isUserExists(studentData.userId)) {
    throw new Error("User already exists");
  }
  const result = await User.create(studentData);
  const removedPasswordResult = await User.findById(result._id).select(
    "-password"
  );
  return removedPasswordResult;
};

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    "userName fullName age email address"
  ).exec();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId: userId });
  return result;
};

const updateUserInfoFromDB = async (userId: number, userData: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }
  const result = await User.updateOne({ userId }, { $set: { ...userData } });
  return result;
};

const deleteUserByUserIdFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }
  const result = await User.deleteOne({ userId: userId });
  return result;
};

const addOrderToUserInDB = async (userId: number, orderedItem: OrderedItem) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }
  const user: any = await User.findOne({ userId });
  if (!user.orders) {
    const result = await User.updateOne(
      { userId },
      { $set: { orders: { $push: orderedItem } } }
    );
    return result;
  } else {
    const result = await User.updateOne(
      { userId },
      { $push: { orders: orderedItem } }
    );
    return result;
  }
};

const getUserOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }
  const result = await User.findOne({ userId }, { _id: 0, orders: 1 });
  // console.log(result);
  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInfoFromDB,
  deleteUserByUserIdFromDB,
  addOrderToUserInDB,
  getUserOrdersFromDB,
};
