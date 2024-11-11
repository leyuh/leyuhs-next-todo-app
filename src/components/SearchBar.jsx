"use client"

import { Search } from "./Icons";

const handleSearch = (e) => {
    e.preventDefault();
}

const SearchBar = () => {
    return <form onSubmit={handleSearch} className="flex bg-zinc-100 rounded-md px-2 py-1 text-md md:text-lg w-[280px] gap-4 items-center">
        <input className="grow bg-transparent w-[calc(100%-24px)] placeholder-gray-400 outline-none" type="text" placeholder="Search boards" />
        <div className="w-6 text-gray-400"><Search /></div>

    </form>
}

export default SearchBar;