
import Image from "next/image";

import BoardNav from "@/components/BoardNav";
import List from "@/components/List";
import EditItem from "@/components/EditItem";

const BoardPage = async ({ params, searchParams }) => {

    const { boardId } = await params;
    const { i } = await searchParams || null;

    const boardsData = [
        {
          id: 0,
          title: "My board",
          bgImage: "/bg-1.jpg",
          isStarred: false,
          userId: "000",
        },
        {
          id: 1,
          title: "My second board",
          bgImage: "/bg-2.jpg",
          isStarred: false,
          userId: "000",
        },
        {
          id: 2,
          title: "My most favorite board",
          bgImage: "/bg-3.jpg",
          isStarred: true,
          userId: "000",
        }
    ]

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

    console.log(boardId);

    return <>
        <div className="flex">
            <Image src={boardsData.filter(b => b.id == boardId)[0].bgImage} priority quality={100} alt="" sizes="100%" fill className="absolute object-cover" />
            <BoardNav boardsData={boardsData} selectedBoardId={boardId} />
            <div className="flex gap-4 p-4 top-8 md:top-0 relative overflow-x-scroll h-[100vh]">
                {listsData.filter(l => l.boardId == boardId).map((l, i) => <List key={i} listData={l} itemsData={itemsData} />)}
            </div>
        </div>

        {i != null && i != undefined && <EditItem listsData={listsData} />}
    </>
}

export default BoardPage;