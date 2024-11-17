import Image from "next/image";

import connectDB from "@/config/database";

import BoardModel from "../models/Board";
import ListModel from "../models/List";
import ItemModel from "../models/Item";

import BoardNav from "@/components/BoardNav";
import List from "@/components/List";
import EditItem from "@/components/EditItem";
import CreateListButton from "@/components/CreateListButton";
import NavBar from "@/components/NavBar";

import { Plus } from "@/components/Icons";
import { redirect } from "next/navigation";
import ListWrapper from "@/components/ListWrapper";

const BoardPage = async ({ params, searchParams }) => {

    const { boardId } = await params;
    const { i } = await searchParams || null;

    const getBoardsData = async () => {
        await connectDB();
        let boardsData = await BoardModel.find();

        return boardsData;
    }
    const boardsData = await getBoardsData();
    const boardData = boardsData.filter(b => b._id == boardId)[0];

    if (boardId == "0") {
        if (!boardsData.length) redirect("/");

        return <>
            <NavBar />
            <BoardNav boardsData={JSON.parse(JSON.stringify(boardsData))} selectedBoardId={null} backgroundColor={"#18181B"} />
        </>
    }

    const getBoardListsData = async () => {
        await connectDB();
        const listsData = await ListModel.find({ boardId });

        return listsData;
    }
    const listsData = await getBoardListsData();

    const getBoardItemsData = async () => {
        await connectDB();
        const itemsData = await ItemModel.find({ boardId });

        console.log("!!", itemsData);
        return itemsData;
    }
    const itemsData = await getBoardItemsData();

    console.log(listsData.map(list => list._id));
    console.log(itemsData.map(item => item.listId));

    return <>
        <NavBar backgroundColor={boardData.backgroundColor} />
        <div className={`flex w-[100vw] overflow-hidden bg-[${boardData.backgroundColor}]`}>
            <Image src={boardData.backgroundImage} priority quality={100} alt="" sizes="100%" fill className="absolute object-cover object-center" />
            <BoardNav
                boardsData={JSON.parse(JSON.stringify(boardsData))}
                selectedBoardId={(boardData._id).toString()}
                backgroundColor={boardData.backgroundColor}
            />
            <ListWrapper
                listsData={JSON.parse(JSON.stringify(listsData))}
                itemsData={JSON.parse(JSON.stringify(itemsData))}
                boardData={JSON.parse(JSON.stringify(boardData))}
            />
        </div>

        {i != null && i != undefined && <EditItem itemData={JSON.parse(JSON.stringify(itemsData.filter(item => item._id == i).length ? itemsData.filter(item => item._id == i)[0] : []))} />}
    </> 
}

export default BoardPage;