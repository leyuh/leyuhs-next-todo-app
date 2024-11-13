import connectDB from "@/config/database";
import BoardModel from "@/app/models/Board";

import { NextResponse } from "next/server";

export async function GET (req, { params }) {
    const { boardId } = params;

    await connectDB();
    const board = await BoardModel.findOne({ _id: boardId });

    return NextResponse.json({ board }, { status: 200 });
}