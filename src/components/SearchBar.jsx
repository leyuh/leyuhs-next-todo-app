"use client"

import { Search } from "./Icons";
import { useRouter, useSearchParams } from "next/navigation";

const handleSearch = (e) => {
    e.preventDefault();
}

const SearchBar = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("title");

    return <form className="flex bg-zinc-100 rounded-md px-2 py-1 text-md md:text-lg w-[280px] gap-4 items-center">
        <input className="grow bg-transparent w-[calc(100%-24px)] placeholder-zinc-400 outline-none" type="text" name="title" placeholder="Search boards" defaultValue={search} />
        <button type="submit" className="w-6 text-zinc-500 cursor-pointer"><Search /></button>
    </form>
}

export default SearchBar;