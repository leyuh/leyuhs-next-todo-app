"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Close, Search } from "./Icons";
import { useRouter } from "next/navigation";

const PaginationBtn = ({ dir, page, setPage, itemCount, IMAGES_PER_PAGE }) => {
    let enabled = (dir == "right" && page < Math.floor(itemCount / IMAGES_PER_PAGE)) || (dir == "left" && page > 1);

    return <button onClick={() => {
        if (!enabled) return;
        setPage(prev => dir == "left" ? prev - 1 : prev + 1);

    }} className={`p-1 rounded-sm bg-primary ${enabled ? "bg-primary" : "bg-zinc-300"} size-6 flex items-center justify-center text-white`}>
        {dir == "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
}

const BackgroundModal = ({ setShowBackgroundModal, boardId }) => {

    const router = useRouter();

    const IMAGES_PER_PAGE = 8;

    const [images, setImages] = useState([]);
    const [pageImages, setPageImages] = useState([]);

    const [page, setPage] = useState(1);

    const getImagesData = async (search="nature") => {
        const res = await fetch(`https://api.pexels.com/v1/search?page=1&per_page=80&orientation=landscape&query=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.PEXELS_KEY
            }
        })
        
        let data = await res.json();
        console.log(data);
        setImages(data.photos);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") || "nature";

        getImagesData(title.toLowerCase());
        setPage(1);
    }

    const handleImageClick = async (imageData) => {
        console.log(imageData, boardId);
        const res = await fetch("/api/boards", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: boardId,
                backgroundImage: imageData.src.large2x,
                backgroundColor: imageData.avg_color
            })
        });

        router.refresh();
    }

    useEffect(() => {
        setPageImages(images.filter((image, i) => (i >= (page-1)*8 && i < page*8)));
    }, [images, page]);

    useEffect(() => {
        getImagesData();
    }, [])

    return <div className="bg-white rounded-sm p-[10px] w-[325px] z-20 fixed top-8 sm:top-0 left-[50%] -translate-x-1/2 sm:relative sm:left-0 sm:translate-x-0">
        <div className="w-full flex justify-between items-center mt-2">

            <form onSubmit={handleSearch} className="flex bg-zinc-100 rounded-md px-2 py-1 text-md gap-4 items-center">
                <input className="grow bg-transparent w-[calc(100%-24px)] placeholder-zinc-400 outline-none" type="text" name="title" placeholder="Search images" />
                <button type="submit" className="w-6 text-zinc-500 cursor-pointer"><Search /></button>
            </form>

            <button onClick={() => setShowBackgroundModal(prev => !prev)}>
                <Close />
            </button>
        </div>
        <div className="w-full flex flex-wrap gap-[5px] overflow-y-scroll mt-2">
            {pageImages.map((image, i) => <button key={image.id} className="rounded-md relative w-[150px] h-[100px] overflow-hidden" onClick={() => handleImageClick(image)}>
                <Image alt={image.alt} src={image.src.original} fill sizes="100px" className="object-cover" />
            </button>)}
        </div>
        <div className="flex gap-2 items-center justify-center w-full my-2">
            <PaginationBtn dir="left" page={page} setPage={setPage} itemCount={images.length} IMAGES_PER_PAGE={IMAGES_PER_PAGE} />
            <span>{page}</span>
            <PaginationBtn dir="right" page={page} setPage={setPage} itemCount={images.length} IMAGES_PER_PAGE={IMAGES_PER_PAGE} />
        </div>
        <p className="text-zinc-500 text-sm">Images provided by <a className="text-primary underline" href="http://pexels.com" target={"_blank"}>pexels.com</a>.</p>
    </div>
}

export default BackgroundModal;