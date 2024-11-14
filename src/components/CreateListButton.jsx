"use client"

import { Plus } from "./Icons"
import { useRouter } from "next/navigation"

const CreateListButton = ({ boardId }) => {

    const router = useRouter();

    const createList = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ boardId })
        });

        if (res.ok) router.refresh();
    }


    return <button
        className="shadow-md flex items-center gap-2 text-zinc-500 flex-row text-lg p-2 w-[260px] h-[40px] rounded-md bg-zinc-100 bg-opacity-80 flex-shrink-0"
        onClick={(e) => createList(e)}
    >
        <Plus /> <span>Create new list</span>
    </button>
}

export default CreateListButton;