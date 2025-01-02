// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import User from "@/model/UserModel/UserModel";

// export const isUser = async (req: NextRequest, res: NextResponse) => {
//   // Extract token from req.headers
//   const authorization = req.headers.get("authorization");
//   const splittedValues = authorization?.split(" ");

//   const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

//   if (!token) {
//     return new NextResponse(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
//   }

//   let payload;
//   try {
//     payload = jwt.verify(
//       token,
//       "82cda72d3ab0b655d3fbe871fa4fcf8d21649364de17d66a622bd565a192d6628c3b3122bfa39227c83fcca4c8adc913b7b723eaa62b3931a27c37d091254b17"
//     );
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
//   }

//   // Find user using userId from payload
//   const user = await User.findOne({ _id: payload.userId });

//   // If no user, return unauthorized
//   if (!user) {
//     return new NextResponse(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
//   }

//   // Store the userId in the request for further use
//   (req as any).loggedInUserId = user._id;

//   // Return the modified request and response to proceed
//   return NextResponse.next();
// };
