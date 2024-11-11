"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Close } from './Icons'

const TEMP_ITEM_DATA = {
    id: 0,
    title: "My Item",
    description: "This is my description",
    boardId: 0,
    listId: 0
}

const EditItem = ({ listsData }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const itemId = searchParams.get("i");

    const handleItemSubmit = (e) => {
        e.preventDefault();
        console.log("!");
    }

    if (!itemId) return "error";

    return <>
        <div className="fixed w-full h-full z-20 top-0 right-0 bg-black bg-opacity-75" />
        <div className="p-4 w-[300px] py-6 md:w-[420px] md:text-lg rounded-md bg-zinc-100 bg-opacity-80 absolute top-20 z-20" style={{
            left: "50%",
            transform: "translate(-50%)",
        }}>
            <form onSubmit={handleItemSubmit}>

                <div className="flex justify-between gap-4">
                    <input type="text" className="bg-transparent text-lg md:text-xl" defaultValue={TEMP_ITEM_DATA.title} placeholder="" />
                    <button type="button text-zinc-500" onClick={() => {
                        router.back();
                    }}><Close /></button>
                </div>
                

                <div className="mt-4">
                    <p className="text-md text-zinc-500">Description</p>
                    <textarea className="w-full h-40 px-2 py-1 rounded-sm" placeholder={"Describe your item here..."} defaultValue={TEMP_ITEM_DATA.description} />
                </div>
            </form>
        </div>
    </>
}

export default EditItem;