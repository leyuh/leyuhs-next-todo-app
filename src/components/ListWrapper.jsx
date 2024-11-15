"use client"

import List from "./List";
import CreateListButton from "./CreateListButton";

const ListWrapper = ({ listsData, itemsData, boardData }) => {
 
    return <>
        <div className="flex gap-4 p-4 top-8 md:top-0 relative overflow-x-scroll h-[100vh]">
            {listsData.map((list, i) => <List
                key={i}
                listData={JSON.parse(JSON.stringify(list))}
                itemsData={JSON.parse(JSON.stringify(itemsData.filter(item => item.listId.toString() == list._id.toString())))}
            />)}
            <CreateListButton boardId={(boardData._id).toString()} />
        </div>

    </>
}

export default ListWrapper;