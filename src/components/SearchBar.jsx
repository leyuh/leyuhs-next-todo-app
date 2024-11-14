"use client"

import { Search } from "./Icons";
import { useRouter } from "next/navigation";

const handleSearch = (e) => {
    e.preventDefault();
}

const SearchBar = () => {

    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
    
        router.push(`?title=${title.toLowerCase()}`);
    }

    return <form onSubmit={handleSearch} className="flex bg-zinc-100 rounded-md px-2 py-1 text-md md:text-lg w-[280px] gap-4 items-center">
        <input className="grow bg-transparent w-[calc(100%-24px)] placeholder-zinc-400 outline-none" type="text" name="title" placeholder="Search boards" />
        <button type="submit" className="w-6 text-zinc-500 cursor-pointer"><Search /></button>
    </form>
}

export default SearchBar;