"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import BoardOptionsModal from "./BoardOptionsModal";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "./Icons";

const BoardNav = ({ boardsData, selectedBoardId, backgroundColor, defaultShowNav=false }) => {

    const router = useRouter();

    // for mobile
    const [showNav, setShowNav] = useState(defaultShowNav);

    const [showBoardOptionsModal, setShowBoardOptionsModal] = useState(false);
    const [showRenameInput, setShowRenameInput] = useState(false);

    const btnRef = useRef();
    const modalRef = useRef();
    const renameRef = useRef();

    const handleRename = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");

        const res = await fetch("/api/boards", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: selectedBoardId,
                title
            })
        });

        setShowRenameInput(false);
        router.refresh();
    }

    const handleBoardNameClick = async (e, boardId) => {
        e.preventDefault();

        if (!showRenameInput) {
            renameRef.current && renameRef.current.blur();
            router.push(`/${boardId}`);
            setShowRenameInput(false);
        }
    }

    // Close modal on outside click
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
        renameRef.current.value = "";
    }, [showRenameInput])

    console.log(backgroundColor);
    return <>
        {!showNav && <button className="md:hidden mt-4 ml-4 z-20 absolute text-white" onClick={() => setShowNav(true)}>
            <ChevronRight />
        </button>}
        <AnimatePresence>
            {(showNav || window.innerWidth >= 768) && <motion.div
                className={`transition-colors duration-100 md:block text-white p-4 w-[300px] h-[calc(100vh-64px)] relative flex-shrink-0`}
                style={{ backgroundColor: backgroundColor + "AA", zIndex: "10 !important" }}
                initial={(window.innerWidth <  768 && !defaultShowNav) ? { x: -300, opacity: 0 } : { x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={(window.innerWidth <  768  && !defaultShowNav) ? { x: -300, opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.1, ease: "linear" }}
            >
                {!defaultShowNav && <button className="md:hidden right-0 absolute mr-4" onClick={() => setShowNav(false)}>
                    <ChevronLeft />
                </button>}
                <ul className="text-lg mt-8 md:mt-0">
                    {boardsData.map((b, i) => <li className="flex justify-between mt-2 mb-4 pl-2 text-xl gap-1 items-center" key={i}>

                        <form onSubmit={handleRename}>
                            <input
                                ref={b._id == selectedBoardId ? renameRef : null}
                                type="text"
                                name="title"
                                className={`w-full pl-1 -ml-1 bg-transparent ${b._id == selectedBoardId && showRenameInput ? "" : "outline-none hover:underline cursor-pointer"} flex-wrap ${(selectedBoardId == b._id && !showRenameInput) && "font-bold"}`}
                                style={b._id == selectedBoardId && showRenameInput ? {}: {"caretColor": "transparent"}}
                                placeholder={b.title}
                                defaultValue={b.title}
                                readOnly={!(b._id == selectedBoardId && showRenameInput)}
                                onBlur={() => {
                                    renameRef.current.value = b.title; 
                                    setShowRenameInput(false);
                                }}
                                onClick={(e) => handleBoardNameClick(e, b._id)}
                            />
                        </form>

                        {selectedBoardId == b._id && (
                            <button ref={btnRef} className="text-white modal-btn" onClick={() => setShowBoardOptionsModal(prev => !prev)}><EllipsisVertical dimensions="size-5" /></button>
                        )}
            
                    </li>)}
                </ul>
            </motion.div>}
        </AnimatePresence>
        

        {showBoardOptionsModal && <BoardOptionsModal
            btnRef={btnRef}
            modalRef={modalRef}
            boardId={selectedBoardId}
            setShowRenameInput={setShowRenameInput}
            setShowBoardOptionsModal={setShowBoardOptionsModal}
        />}
    </>
    

}

export default BoardNav;