import connectDB from "@/config/database";
import ItemModel from "@/app/models/Item";

import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();

        await connectDB();

        await ItemModel.create({
            title: "My Item",
            description: "",
            listId: body.listId,
            boardId: body.boardId
        });

        return NextResponse.json({ message: "Item created." }, { status: 201 });
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

        await ItemModel.findByIdAndUpdate(_id, body);

        return NextResponse.json({ message: "Item updated." }, { status: 201 });
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

        await ItemModel.deleteMany({ _id });

        return NextResponse.json({ message: "Item(s) deleted." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}