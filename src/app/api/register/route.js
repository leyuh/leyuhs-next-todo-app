import connectDB from "@/config/database";
import UserModel from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json();

        const hashedPass = await bcrypt.hash(password, 10);

        await connectDB();
        await UserModel.create({ name, email, password: hashedPass });

        return Response.json({ message: "User registered." }, { status: 201 });
    } catch (err) {
        return Response.json(
            { message: "An error occurred" },
            { status: 500 }
        )
    }
}
