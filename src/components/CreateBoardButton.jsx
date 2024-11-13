"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

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
        className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100"
        onClick={(e) => createBoard(e)}
    >Add New</button>
}

export default CreateBoardButton;