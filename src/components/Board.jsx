"use client"

import Image from "next/image";
import Link from "next/link";
import { FilledStar, HollowStar } from "./Icons";

const Board = ({ boardData }) => {
    return <Link href={`/${boardData.id}`} className="relative w-[160px] h-[120px] md:w-[200px] md:h-[150px] flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={boardData.bgImage} alt="" fill sizes="200px" className="hover:blur-sm hover:brightness-75 transition-all duration-300 cursor-pointer" />
        <h1 className="tracking-wide text-white text-lg md:text-xl font-bold z-10 absolute p-2 md:p-3">{boardData.title}</h1>

        <button className={`absolute right-0 bottom-0 p-2 text-white z-10 ${boardData.isStarred && "text-primary"}`}>
            {boardData.isStarred ? (
                <FilledStar />
            ) : (
                <HollowStar />
            )}
        </button>
    </Link>
}

export default Board;