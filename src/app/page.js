import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import Board from "@/components/Board";
import CreateBoardButton from "@/components/CreateBoardButton";

import BoardModel from "./models/Board";
import connectDB from "@/config/database";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home({ params, searchParams }) {

  const session = await getServerSession(authOptions);
  console.log(session);

  const boardSearch = searchParams.title;

  const getBoardsData = async () => {
    await connectDB();
    let boardsData = await BoardModel.find();

    console.log(boardsData);
    return boardsData;
  }

  
  const boardsData = await getBoardsData();

  if (!session) redirect("/login");

  return <div className="p-2 md:p-4 px-4 md:px-8 md:mt-8">
    {boardsData.filter(b => b.isStarred).length > 0 && (
      <div className="sm:mb-12">
        <h1 className="text-2xl tracking-wide">Favorite Boards</h1>
        <div className="flex overflow-y-scroll gap-2 md:gap-4 mt-2">
          {boardsData.filter(b => b.isStarred).map((b, i) => <Board key={i} boardData={JSON.parse(JSON.stringify(b))} />)}
        </div>
      </div>
    )}

    <div className="mt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
        <h1 className="text-2xl tracking-wide">All Boards</h1>
        <SearchBar />
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-4 mt-4 w-full justify-center sm:justify-start">
        {boardsData.filter(b => (boardSearch == null || (b.title).toLowerCase().indexOf(boardSearch) != -1)).map((b, i) => <Board key={i} boardData={JSON.parse(JSON.stringify(b))} />)}
        <CreateBoardButton />
      </div>
    </div>
  </div>
}
