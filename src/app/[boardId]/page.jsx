import BoardModel from "../models/Board";
import connectDB from "@/config/database";

import Image from "next/image";

import BoardNav from "@/components/BoardNav";
import List from "@/components/List";
import EditItem from "@/components/EditItem";

const BoardPage = async ({ params, searchParams }) => {

    const { boardId } = await params;
    const { i } = await searchParams || null;

    const getBoardsData = async () => {
        await connectDB();
        let boardsData = await BoardModel.find();

        return boardsData;
    }

    const listsData = [
        {
            id: 0,
            boardId: 0,
            title: "My List",
        },
        {
            id: 1,
            boardId: 0,
            title: "My 2nd List",
        },
    ]

    const itemsData = [
        {
            id: 0,
            title: "My item",
            description: "Description",
            boardId: 0,
            listId: 0,
        },
        {
            id: 1,
            title: "My 2nd item",
            description: "Description",
            boardId: 0,
            listId: 1,
        },
    ]

    const boardsData = await getBoardsData();
    const boardData = boardsData.filter(b => b._id == boardId)[0];
    console.log(boardData);

    return <>
        <div className="flex">
            <Image src={boardData.backgroundImage} priority quality={100} alt="" sizes="100%" fill className="absolute object-cover" />
            <BoardNav boardsData={JSON.parse(JSON.stringify(boardsData))} selectedBoardId={(boardData._id).toString()} />
            <div className="flex gap-4 p-4 top-8 md:top-0 relative overflow-x-scroll h-[100vh]">
                {listsData.filter(l => l.boardId == boardId).map((l, i) => <List key={i} listData={l} itemsData={itemsData} />)}
            </div>
        </div>

        {i != null && i != undefined && <EditItem listsData={listsData} />}
    </>
}

export default BoardPage;