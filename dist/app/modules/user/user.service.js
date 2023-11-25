"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserToDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(studentData.userId)) {
        throw new Error("User already exists");
    }
    const result = yield user_model_1.User.create(studentData);
    const removedPasswordResult = yield user_model_1.User.findById(result._id).select("-password");
    return removedPasswordResult;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, "userName fullName age email address").exec();
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId: userId });
    return result;
});
const updateUserInfoFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.updateOne({ userId }, { $set: Object.assign({}, userData) });
    return result;
});
const deleteUserByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User doesn't exist");
    }
    const result = yield user_model_1.User.deleteOne({ userId: userId });
    return result;
});
exports.userServices = {
    createUserToDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserInfoFromDB,
    deleteUserByUserIdFromDB,
};
