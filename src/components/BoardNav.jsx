"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import BoardOptionsModal from "./BoardOptionsModal";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "./Icons";

const BoardNav = ({ boardsData, selectedBoardId }) => {

    // for mobile
    const [showNav, setShowNav] = useState(false);
    const [showBoardOptionsModal, setShowBoardOptionsModal] = useState(false);

    const showBoardOptionsModalBtnRef = useRef();
    const boardOptionsModalRef = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            console.log(e)
            if (!showBoardOptionsModalBtnRef.current.contains(e.target) && (boardOptionsModalRef.current == null || !boardOptionsModalRef.current.contains(e.target))) {
                setShowBoardOptionsModal(false);
            }
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
    }, []);

    return <>
        {!showNav && <button className="md:hidden mt-4 ml-4 z-20 absolute text-white" onClick={() => setShowNav(true)}>
            <ChevronRight />
        </button>}
        <div className={`${!showNav && "hidden"} bg-zinc-900 md:block bg-opacity-85 text-white p-4 w-[300px] h-[calc(100vh-64px)] relative flex-shrink-0`}>
            <button className="md:hidden right-0 absolute mr-4" onClick={() => setShowNav(false)}>
                <ChevronLeft />
            </button>
            <ul className="text-lg mt-8 md:mt-0">
                {boardsData.map((b, i) => <li className="flex justify-between mt-2 mb-4 pl-2 text-xl gap-1 items-center" key={i}>
                    <Link href={`/${b.id}`} className={`flex-wrap hover:underline 
                    ${selectedBoardId == b.id && "font-bold"}`}>{b.title}</Link>
                    {selectedBoardId == b.id && (
                        <button ref={showBoardOptionsModalBtnRef} className="text-white modal-btn" onClick={() => setShowBoardOptionsModal(prev => !prev)}><EllipsisVertical dimensions="size-5" /></button>
                    )}
                </li>)}
            </ul>
        </div>

        {showBoardOptionsModal && <BoardOptionsModal btnRef={showBoardOptionsModalBtnRef} modalRef={boardOptionsModalRef} />}
    </>
    

}

export default BoardNav;