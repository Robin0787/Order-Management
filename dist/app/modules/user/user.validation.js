"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: "firstName is required",
        invalid_type_error: "firstName must be a string",
    }),
    lastName: zod_1.z.string({
        required_error: "lastName is required",
        invalid_type_error: "lastName must be a string",
    }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string({
        required_error: "street is required",
        invalid_type_error: "street must be a string",
    }),
    city: zod_1.z.string({
        required_error: "city is required",
        invalid_type_error: "city must be a string",
    }),
    country: zod_1.z.string({
        required_error: "country is required",
        invalid_type_error: "country must be a string",
    }),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: "userId is required",
        invalid_type_error: "userId must be a number",
    }),
    username: zod_1.z.string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
    }),
    password: zod_1.z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
    }),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number({
        required_error: "age is required",
        invalid_type_error: "age must be a number",
    }),
    email: zod_1.z
        .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
    })
        .email({ message: "{VALUE} is not a valid email" }),
    isActive: zod_1.z.boolean({
        required_error: "isActive is required",
        invalid_type_error: "isActive must be one of true or false",
    }),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressValidationSchema,
});
exports.default = UserValidationSchema;
