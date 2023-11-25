import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserToDB = async (studentData: User) => {
  const result = await UserModel.create(studentData);
  const removedPasswordResult = await UserModel.findById(result._id).select(
    "-password"
  );
  return removedPasswordResult;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    "userName fullName age email address"
  ).exec();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId });
  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
