import { z } from "zod";

const FullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: "{VALUE} is not a valid email" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
});

export default UserValidationSchema;
