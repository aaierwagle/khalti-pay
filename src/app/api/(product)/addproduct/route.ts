import connectDB from "@/database/database.db";
import validateReqBody from "@/middleware/validation.middleware";
import { Product } from "@/model/ProductModel/Product.model";
import { ProductValidationSchema } from "@/Validation/ProductValidation";



import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {

        // Get Data From Fronend
        const Data = await request.json();
        console.log(Data)

        // Validated Data
         validateReqBody(ProductValidationSchema)
        
        // call Databae
        await  connectDB()
        
        // Sava in DataBase Bro
        await Product.create(Data);

        // send Sucess Response Bro
        return NextResponse.json({ message: "Bro Happy This Process Is Sucess", Data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something Is Wrong Bro" , error}, { status: 400 });
    }

}