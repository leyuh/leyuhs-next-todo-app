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

    const [optionsModalListId, setOptionsModalListId] = useState(null);

    useEffect(() => {console.log(btnRef.current)}, [btnRef]);
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
        <div className="flex shadow-md text-lg flex-col p-2 w-[260px] rounded-md bg-zinc-100 bg-opacity-80 flex-shrink-0 h-min">
            <div className="flex justify-between items-center ml-1 mt-2">

                <h3>{listData.title}</h3>
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
        />}
    </>
}

export default List;