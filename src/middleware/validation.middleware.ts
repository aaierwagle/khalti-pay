import { NextRequest, NextResponse } from "next/server";
import { AnySchema } from "yup"; // Import the type for the validation schema

const validateReqBody = (validationSchema: AnySchema) => {
  return async (req: NextRequest, res: NextResponse, next: () => void) => {
    // extract new values from req.body
    const newData = await req.json(); // Use await req.json() to parse the request body
    try {
      const validatedData = await validationSchema.validate(newData);
      req.body = validatedData; // Add the validated data to req.body (Note: req.body might not exist in this context)
    } catch (error) {
      return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }

    // call next function
    next();
  };
};

export default validateReqBody;
