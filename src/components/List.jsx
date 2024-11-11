"use client"

import Item from "./Item";
import { EllipsisVertical } from "./Icons";

const List = ({ listData, itemsData }) => {
    return <div className="flex text-lg flex-col p-2 w-[260px] rounded-md bg-zinc-100 bg-opacity-80 flex-shrink-0 h-min">
        <div className="flex justify-between items-center ml-1 mt-2">
            <h3 className="">{listData.title}</h3>
            <button className="text-zinc-500 p-1 -mt-1"><EllipsisVertical dimensions="size-4" /></button>
        </div>
        <ul>
            {itemsData.filter(item => item.listId == listData.id).map((item, i) => <Item key={i} itemData={item} />)}
            <li className="px-2 py-1 mt-2 text-zinc-500">
                <button className="flex gap-2">
                    +
                    <span>Add item</span>
                </button>
            </li>
        </ul>
    </div>
}

export default List;