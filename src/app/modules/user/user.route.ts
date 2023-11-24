import express from "express";
import { userControllers } from "./user.controller";

export const router = express.Router();

router.post("/create-user", userControllers.createUser);
router.get("/all-users", userControllers.getAllUsers);
