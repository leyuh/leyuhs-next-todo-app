import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import Board from "@/components/Board";

import BoardModel from "./models/Board";
import connectDB from "@/config/database";


export default async function Home() {

  const getBoards = async () => {
    await connectDB();
    const boardsData = await BoardModel.find();

    return boardsData;
  }
  
  const boardsData = await getBoards();
  /*const boardsData = [
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
  ]*/

  return <div className="p-2 md:p-4 px-4 md:px-8 md:mt-8">
    <div>
      <h1 className="text-2xl tracking-wide">Favorite Boards</h1>
      <div className="flex overflow-y-scroll gap-2 md:gap-4 mt-2">
        {boardsData.filter(b => b.isStarred).map((b, i) => <Board key={i} boardData={b} />)}
      </div>
    </div>

    <div className="mt-6 sm:mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
        <h1 className="text-2xl tracking-wide">All Boards</h1>
        <SearchBar />
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-4 mt-4 w-full justify-center sm:justify-start">
        {boardsData.map((b, i) => <Board key={i} boardData={b} />)}
        <button className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100">Add New</button>
      </div>
    </div>
  </div>
}
