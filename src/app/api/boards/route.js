import connectDB from "@/config/database";
import BoardModel from "@/app/models/Board";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        console.log("!", body._id);

        await connectDB();

        await BoardModel.create({
            title: "My board",
            backgroundImage: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
            backgroundColor: "#bbc4c4",
            isStarred: false,
            userId: body._id
        });

        return NextResponse.json({ message: "Board created." }, { status: 201 });
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

        await BoardModel.findByIdAndUpdate(_id, body);

        return NextResponse.json({ message: "Board updated." }, { status: 201 });
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

        await BoardModel.deleteOne({ _id });

        return NextResponse.json({ message: "Board deleted." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}