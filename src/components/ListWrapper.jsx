"use client"

import List from "./List";
import CreateListButton from "./CreateListButton";
import { useEffect, useRef, useState } from "react";
import ListOptionsModal from "./ListOptionsModal";

const ListWrapper = ({ listsData, itemsData, boardData }) => {

    const modalRef = useRef();

    const [selectedListBtn, setSelectedListBtn] = useState(null);
    const [optionsModalListId, setOptionsModalListId] = useState(null);

    useEffect(() => {console.log(selectedListBtn)}, [selectedListBtn]);
    // Close modal on outside click
    useEffect(() => {
        const handleClick = (e) => {

            setOptionsModalListId(null);
            setSelectedListBtn(null);
            
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
    }, []);
 
    return <>
        <div className="flex gap-4 p-4 top-8 md:top-0 relative overflow-x-scroll h-[100vh]">
            {listsData.map((list, i) => <List
                key={i}
                listData={JSON.parse(JSON.stringify(list))}
                itemsData={JSON.parse(JSON.stringify(itemsData.filter(item => item.listId.toString() == list._id.toString())))}
                setSelectedListBtn={setSelectedListBtn}
                optionsModalListId={optionsModalListId}
                setOptionsModalListId={setOptionsModalListId}
            />)}
            <CreateListButton boardId={(boardData._id).toString()} />
        </div>

        {selectedListBtn && optionsModalListId && <ListOptionsModal 
            modalRef={modalRef}
            selectedListBtn={selectedListBtn}
            optionsModalListId={optionsModalListId}
        />}
    </>
}

export default ListWrapper;