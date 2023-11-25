import { z } from "zod";

const FullNameValidationSchema = z.object({
  firstName: z.string({
    required_error: "firstName is required",
    invalid_type_error: "firstName must be a string",
  }),
  lastName: z.string({
    required_error: "lastName is required",
    invalid_type_error: "lastName must be a string",
  }),
});

const AddressValidationSchema = z.object({
  street: z.string({
    required_error: "street is required",
    invalid_type_error: "street must be a string",
  }),
  city: z.string({
    required_error: "city is required",
    invalid_type_error: "city must be a string",
  }),
  country: z.string({
    required_error: "country is required",
    invalid_type_error: "country must be a string",
  }),
});

const UserValidationSchema = z.object({
  userId: z.number({
    required_error: "userId is required",
    invalid_type_error: "userId must be a number",
  }),
  username: z.string({
    required_error: "username is required",
    invalid_type_error: "username must be a string",
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
  fullName: FullNameValidationSchema,
  age: z.number({
    required_error: "age is required",
    invalid_type_error: "age must be a number",
  }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email({ message: "{VALUE} is not a valid email" }),
  isActive: z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive must be one of true or false",
  }),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
});

export default UserValidationSchema;
