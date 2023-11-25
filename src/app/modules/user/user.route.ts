import express from "express";
import { userControllers } from "./user.controller";

export const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:userId", userControllers.getSingleUser);
