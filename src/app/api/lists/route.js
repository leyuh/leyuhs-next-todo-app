import connectDB from "@/config/database";
import ListModel from "@/app/models/List";
import ItemModel from "@/app/models/Item";

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

export const PUT = async (req) => {
    try {
        const {_id, ...body} = await req.json();

        await connectDB();

        await ListModel.findByIdAndUpdate(_id, body);

        return NextResponse.json({ message: "List updated." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}

export const DELETE = async (req) => {
    try {
        const { _id } = await req.json();

        await connectDB();

        await ItemModel.deleteMany({ listId: _id });
        await ListModel.deleteOne({ _id });
        
        return NextResponse.json({ message: "List deleted." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}