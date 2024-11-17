"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Close } from './Icons'



const EditItem = ({ itemData }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const itemId = searchParams.get("i");

    const handleItemSubmit = async (e) => {
        console.log("!");
        e.preventDefault();


        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
        const description = formData.get("description");
        console.log(title, description);

        const res = await fetch("/api/items", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: itemId,
                title,
                description
            })
        })

        router.push(`/${itemData.boardId}`)
        console.log("!");
    }

    const handleDelete = async () => {
        const res = await fetch("/api/items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: itemId
            })
        })

        router.push(`/${itemData.boardId}`)
    }

    if (!itemId) return "error";

    return <>
        <div className="fixed w-full h-full z-20 top-0 right-0 bg-black bg-opacity-75" />
        <div className="p-4 w-[300px] py-6 md:w-[420px] md:text-lg rounded-md bg-gray-100 bg-opacity-80 absolute top-20 z-20" style={{
            left: "50%",
            transform: "translate(-50%)",
        }}>
            <form onSubmit={handleItemSubmit}>

                <div className="flex justify-between gap-4">
                    <input name="title" type="text" className="bg-transparent text-lg px-1  md:text-2xl" defaultValue={itemData.title} placeholder="" />
                    <button type="button" onClick={() => {
                        console.log(`?i=${itemId}`);
                        router.push(`/${itemData.boardId}`)
                    }}><Close /></button>
                </div>
                
                <p className="text-sm text-gray-500 ml-1">{(new Date(itemData.createdAt)).toString().split(" ").filter((item, i) => i > 0 && i < 4).join(" ")}</p>
                <div className="mt-4">
                    <p className="text-md text-gray-500 ml-1">Description</p>
                    <textarea name="description" className="w-full h-[200px] overflow-y-scroll px-2 py-1 rounded-sm resize-none" placeholder={"Describe your item here..."} defaultValue={itemData.description} />
                </div>

                <div className="w-full flex items-center justify-center gap-4 mt-4">
                    <button type="submit" className="px-6 py-1 bg-primary rounded-sm text-white inline-block">Save and close</button>
                    <button type="button" className="px-6 py-1 bg-red-700 rounded-sm text-white inline-block" onClick={() => handleDelete()}>Delete</button>
                </div>
            </form>
        </div>
    </>
}

export default EditItem;