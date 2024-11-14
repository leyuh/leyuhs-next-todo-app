"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Plus } from "./Icons";

const CreateBoardButton = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const createBoard = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: session.user._id })
        });

        if (res.ok) {
            router.refresh();
        }
    }

    console.log(session);

    return <button
        className="text-zinc-500 flex flex-col items-center justify-center gap-2 relative w-[160px] h-[120px] md:w-[200px] md:h-[150px] flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100"
        onClick={(e) => createBoard(e)}
    >
        <Plus/>
        <span>Create new board</span>
    </button>
}

export default CreateBoardButton;