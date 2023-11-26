import z from "zod";

const OrderedItemValidationSchema = z.object({
  productName: z.string({
    required_error: "productName is required",
    invalid_type_error: "productName must be a string",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a number",
  }),
  quantity: z.number({
    required_error: "quantity is required",
    invalid_type_error: "quantity must be a number",
  }),
});

export default OrderedItemValidationSchema;
