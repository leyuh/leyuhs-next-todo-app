"use client"

import Item from "./Item";
import { EllipsisVertical } from "./Icons";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import ListOptionsModal from "./ListOptionsModal";

const List = ({ listData, itemsData }) => {

    const router = useRouter();

    const btnRef = useRef();
    const modalRef = useRef();
    const renameRef = useRef();

    const [optionsModalListId, setOptionsModalListId] = useState(null);
    const [showRenameInput, setShowRenameInput] = useState(false);


    // Close modal on outside click
    useEffect(() => {
        const handleClick = (e) => {

            if (!btnRef.current.contains(e.target)) setOptionsModalListId(null);
            
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleRename = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");

        const res = await fetch("/api/lists", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: listData._id,
                title
            })
        });

        setShowRenameInput(false);
        router.refresh();
    }

    useEffect(() => {
        if (!showRenameInput) return;

        renameRef.current.focus();
        renameRef.current.value = "";
    }, [showRenameInput])



    const createItem = async () => {

        const res = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                listId: listData._id,
                boardId: listData.boardId
            })
        });

        if (res.ok) router.refresh();
    }

    return <>
        <div className="flex shadow-md text-lg flex-col p-2 w-[260px] rounded-md bg-gray-100 bg-opacity-80 flex-shrink-0 h-min">
            <div className="flex justify-between items-center ml-1 mt-2">

                
                <form onSubmit={handleRename}>
                    <input
                        ref={renameRef}
                        type="text"
                        name="title"
                        className={`w-full pl-1 -ml-1 bg-transparent ${(showRenameInput) ? "" : "outline-none"} flex-wrap`}
                        style={(showRenameInput) ? {} : {"caretColor": "transparent"}}
                        defaultValue={listData.title}
                        placeholder={listData.title}
                        disabled={(showRenameInput) ? false : true}
                        onBlur={() => {
                            renameRef.current.value = listData.title;
                            setShowRenameInput(false);
                        }}
                    />
                </form>

                <button
                    ref={btnRef}
                    className="text-zinc-500 p-1 -mt-1"
                    onClick={(e) => {
                        console.log("!");
                        setOptionsModalListId(prev => prev == listData._id ? null : listData._id);
                    }}
                ><EllipsisVertical dimensions="size-4" /></button>
            </div>
            <ul>
                {itemsData.map((item, i) => <Item key={i} itemData={JSON.parse(JSON.stringify(item))} />)}
                <li className="px-2 py-1 mt-2 text-zinc-500">
                    <button className="flex gap-2" onClick={() => createItem()}>
                        +
                        <span>Add item</span>
                    </button>
                </li>
            </ul>
        </div>

        {optionsModalListId && <ListOptionsModal 
            modalRef={modalRef}
            selectedListBtn={btnRef.current}
            optionsModalListId={optionsModalListId}
            setShowRenameInput={setShowRenameInput}
        />}
    </>
}

export default List;