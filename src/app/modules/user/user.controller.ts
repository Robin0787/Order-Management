import { Request, Response } from "express";
import OrderedItemValidationSchema from "./order.validation";
import { userServices } from "./user.service";
import UserValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // user data validation using zod library;
    const zodParsedData = UserValidationSchema.parse(userData);
    const result = await userServices.createUserToDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userServices.updateUserInfoFromDB(
      Number(userId),
      userData
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const deleteUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserByUserIdFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: {
        code: 404,
        description: error.message || "User not found!",
      },
    });
  }
};

const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderedItem = req.body;
    // validating ordered item data before storing
    const zodParsedData = OrderedItemValidationSchema.parse(orderedItem);
    const result = await userServices.addOrderToUserInDB(
      Number(userId),
      zodParsedData
    );
    res.status(200).json({
      success: true,
      message: "Order added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: {
        code: 404,
        description: error.message || "User not found!",
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUserByUserId,
  addOrderToUser,
};
