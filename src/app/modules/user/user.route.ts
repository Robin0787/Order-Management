import express from "express";
import { userControllers } from "./user.controller";

export const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:userId", userControllers.getSingleUser);
router.put("/:userId", userControllers.updateUser);
router.delete("/:userId", userControllers.deleteUserByUserId);

// user order related routes
router.put("/:userId/orders", userControllers.addOrderToUser);
router.get("/:userId/orders", userControllers.getUserOrders);
router.get(
  "/:userId/orders/total-price",
  userControllers.getUserOrdersTotalPrice
);
