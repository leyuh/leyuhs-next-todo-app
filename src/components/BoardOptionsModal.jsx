"use client"

import { useState } from "react";
import BackgroundModal from "./BackgroundModal";

const BoardOptionsModal = ({ btnRef, modalRef, boardId }) => {

    const [showBackgroundModal, setShowBackgroundModal] = useState(false);

    const getModalPosition = () => {
        const buttonRect = btnRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = buttonRect.bottom + 4;
        let left = Math.min(buttonRect.left, (viewportWidth - 165));
        
        return { top, left };
    }

    return <div ref={modalRef} className="flex gap-2 absolute" style={{...getModalPosition()}}>
        <div className={`flex flex-col z-10 gap-2 bg-zinc-100 rounded-sm p-2 flex-grow-0 h-min`}>
            <button className="text-left">Rename</button>
            <button className="text-left" onClick={() => setShowBackgroundModal(prev => !prev)}>Change Background</button>
            <button className="text-left">Delete</button>
        </div>
        {showBackgroundModal && <BackgroundModal
            setShowBackgroundModal={setShowBackgroundModal} 
            boardId={boardId}
        />}
    </div>
}

export default BoardOptionsModal;