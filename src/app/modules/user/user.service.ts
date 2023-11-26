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
  const result = await User.updateOne(
    { userId },
    { $push: { orders: orderedItem } }
  );
  return result;
};

const getUserOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }
  if (!(await User.hasOrder(userId))) {
    throw new Error("User has no orders");
  }
  const result = await User.findOne({ userId }, { _id: 0, orders: 1 });
  return result;
};

const UserTotalPriceFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User doesn't exist");
  }

  if (!(await User.hasOrder(userId))) {
    return { totalPrice: 0 };
  }

  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $unwind: "$orders",
    },
    {
      $group: {
        _id: "$_id",
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  return result[0];
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInfoFromDB,
  deleteUserByUserIdFromDB,
  addOrderToUserInDB,
  getUserOrdersFromDB,
  UserTotalPriceFromDB,
};
