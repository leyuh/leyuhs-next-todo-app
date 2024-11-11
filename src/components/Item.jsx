"use client"

import { useRouter } from 'next/navigation'

const Item = ({ itemData }) => {

    const router = useRouter();
    
    return <li className="bg-zinc-100 px-2 py-1 rounded-md mt-2">
        <button className="w-full text-left" onClick={() => {
            router.push(`?i=${itemData.id}`)
        }}>{itemData.title}</button>
    </li>
}

export default Item;