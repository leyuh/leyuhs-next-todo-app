import connectDB from "@/config/database";
import ListModel from "@/app/models/List";

import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();

        await connectDB();

        await ListModel.create({
            title: "My list",
            boardId: body.boardId
        });

        return NextResponse.json({ message: "List created." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}