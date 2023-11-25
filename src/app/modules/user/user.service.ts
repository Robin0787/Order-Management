import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async (studentData: TUser) => {
  const user = new User(studentData);

  if (await user.isUserExists(studentData.userId)) {
    throw new Error("User already exists");
  }
  const result = await user.save();

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

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
