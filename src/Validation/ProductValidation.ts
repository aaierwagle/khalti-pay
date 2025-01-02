import * as Yup from 'yup';

export const ProductValidationSchema = Yup.object({
  name: Yup.string().required("Product id is required.").trim(),
  description: Yup.string().required("Product id is required.").trim(),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1.")
    .required("Quantity is required."), // Ensure this field is required
    price: Yup.number()
    .min(1, "Price must be at least 1.")
    .required("Price is required."), 
  });
