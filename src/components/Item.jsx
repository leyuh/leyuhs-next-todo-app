"use client"

const Item = ({ itemData }) => {
    return <li className="bg-zinc-100 px-2 py-1 rounded-md mt-2">
        <p>{itemData.title}</p>
    </li>
}

export default Item;