"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import BoardOptionsModal from "./BoardOptionsModal";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "./Icons";

const BoardNav = ({ boardsData, selectedBoardId }) => {

    const router = useRouter();

    // for mobile
    const [showNav, setShowNav] = useState(false);

    const [showBoardOptionsModal, setShowBoardOptionsModal] = useState(false);
    const [showRenameInput, setShowRenameInput] = useState(false);

    const btnRef = useRef();
    const modalRef = useRef();
    const renameRef = useRef();

    const handleBoardNameClick = async (e, boardId) => {
        console.log(showRenameInput);
        if (!showRenameInput) renameRef.current.blur();

        if (!showRenameInput) router.push(`/${boardId}`);
        setShowRenameInput(false);
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (!btnRef.current || (!btnRef.current.contains(e.target)) && (modalRef.current == null || !modalRef.current.contains(e.target))) {
                setShowBoardOptionsModal(false);
            }

        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        console.log(showRenameInput);
        if (!showRenameInput) return;

        renameRef.current.focus();
    }, [showRenameInput])

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

                    <input
                        ref={b._id == selectedBoardId ? renameRef : null}
                        type="text"
                        className={`bg-transparent ${b._id == selectedBoardId && showRenameInput ? "" : "outline-none"} flex-wrap hover:underline cursor-pointer ${selectedBoardId == b._id && "font-bold"}`}
                        style={b._id == selectedBoardId && showRenameInput ? {}: {"caretColor": "transparent"}}
                        defaultValue={b.title}

                        onClick={(e) => handleBoardNameClick(e, b._id)}
                    />

                    {selectedBoardId == b._id && (
                        <button ref={btnRef} className="text-white modal-btn" onClick={() => setShowBoardOptionsModal(prev => !prev)}><EllipsisVertical dimensions="size-5" /></button>
                    )}
         
                </li>)}
            </ul>
        </div>

        {showBoardOptionsModal && <BoardOptionsModal
            btnRef={btnRef}
            modalRef={modalRef}
            boardId={selectedBoardId}
            setShowRenameInput={setShowRenameInput}
        />}
    </>
    

}

export default BoardNav;