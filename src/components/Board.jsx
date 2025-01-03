"use client"

import Image from "next/image";
import Link from "next/link";
import { FilledStar, HollowStar, Open } from "./Icons";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";

const Board = ({ boardData }) => {

    const router = useRouter();

    const btnsRef = useRef();

    const handleStar = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/boards", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: boardData._id,
                isStarred: !boardData.isStarred
            })
        });

        if (res.ok) router.refresh();
    }


    return <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
        onClick={(e) => {
            if (btnsRef.current.contains(e.target)) return;
            
            router.push(`/${boardData._id}`);
        }
    } className="hover:shadow-none cursor-pointer transition-all shadow-sm relative w-[160px] h-[120px] md:w-[200px] md:h-[150px] flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={boardData.backgroundImage} alt="" fill sizes="200px" className="hover:blur-sm hover:brightness-75 transition-all duration-300" />
        <h1 className="tracking-wide text-white text-lg md:text-xl font-bold z-10 absolute p-2 md:p-3">{boardData.title}</h1>

        <div ref={btnsRef} className="flex gap-1 items-center justify-center absolute right-0 bottom-0 p-2 text-white z-10">

            <button className={`flex items-center justify-center size-8 ${boardData.isStarred && "text-primary stroke-1 stroke-white"}`} onClick={(e) => handleStar(e)}>
                <div className="hover:size-8 size-7 transition-all">
                    {boardData.isStarred ? (
                        <FilledStar dimensions="size-full" />
                    ) : (
                        <HollowStar dimensions="size-full" />
                    )}
                </div>
                
            </button>
        </div>
        
    </motion.div>
}

export default Board;