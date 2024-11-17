"use client"

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

        let top = buttonRect.bottom + 4;
        let left = Math.min(buttonRect.left, (viewportWidth - 165));
        
        return { top, left };
    }

    return <div ref={modalRef} className="flex gap-2 absolute" style={{...getModalPosition()}}>
        <div className={`flex modal shadow-sm flex-col z-10 bg-zinc-100 rounded-sm flex-grow-0 h-min w-[180px]`}>
            <button onClick={() => {
                setShowRenameInput(prev => !prev); 
                setShowBoardOptionsModal(false)
            }}>Rename</button>
            <button onClick={() => setShowBackgroundModal(prev => !prev)}>Change Background</button>
            <button onClick={() => handleBoardDelete()}>Delete</button>
        </div>
        {showBackgroundModal && <BackgroundModal
            setShowBackgroundModal={setShowBackgroundModal} 
            boardId={boardId}
        />}
    </div>
}

export default BoardOptionsModal;