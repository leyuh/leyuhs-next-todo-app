"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundModal from "./BackgroundModal";

const BoardOptionsModal = ({ btnRef, modalRef, boardId, setShowRenameInput, setShowBoardOptionsModal }) => {

    const router = useRouter();

    const [showBackgroundModal, setShowBackgroundModal] = useState(false);

    const handleBoardDelete = async () => {
        router.push("/0");

        const res = await fetch("/api/boards", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: boardId })
        });

        router.refresh();
    }

    const getModalPosition = () => {
        const buttonRect = btnRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = buttonRect.bottom - 55;
        let left = Math.min(buttonRect.left, (viewportWidth - 185));
        
        return { top, left };
    }

    return <div ref={modalRef} className="flex gap-2 absolute" style={{...getModalPosition()}}>
        <motion.div
            className={`flex modal shadow-sm flex-col z-10 bg-zinc-100 rounded-sm flex-grow-0 h-min w-[180px]`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
        >
            <button onClick={() => {
                setShowRenameInput(prev => !prev); 
                setShowBoardOptionsModal(false)
            }}>Rename</button>
            <button onClick={() => setShowBackgroundModal(prev => !prev)}>Change Background</button>
            <button onClick={() => handleBoardDelete()}>Delete</button>
        </motion.div>
        {showBackgroundModal && <BackgroundModal
            setShowBackgroundModal={setShowBackgroundModal} 
            boardId={boardId}
        />}
    </div>
}

export default BoardOptionsModal;