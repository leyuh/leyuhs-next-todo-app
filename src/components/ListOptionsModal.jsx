"use client"

import { useRouter } from "next/navigation";

const ListOptionsModal = ({ modalRef, selectedListBtn, optionsModalListId, setShowRenameInput }) => {
    const router = useRouter();

    console.log(selectedListBtn, optionsModalListId);

    const handleListDelete = async () => {
        // delete list's items
        const itemsRes = await fetch("/api/items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                listId: optionsModalListId
            })
        })

        // delete list
        const listsRes = await fetch("/api/lists", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: optionsModalListId
            })
        })

        router.refresh();
    }

    const getModalPosition = () => {

        const buttonRect = selectedListBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = buttonRect.bottom - 60;
        let left = buttonRect.left - 295;
        
        return { top, left };
    }

    return <div ref={modalRef} className={`shadow-sm w-[180px] flex flex-col absolute z-10 gap-2 bg-zinc-100 rounded-sm p-2 flex-grow-0 h-min`} style={{...getModalPosition()}} >
        <button className="text-left" onClick={() => {
            setShowRenameInput(prev => !prev); 
        }}>Rename</button>
        <button
            className="text-left"
            onClick={() => handleListDelete()}
        >Delete</button>
    </div>
}

export default ListOptionsModal;