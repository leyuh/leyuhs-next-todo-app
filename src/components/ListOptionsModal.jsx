"use client"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListOptionsModal = ({ modalRef, selectedListBtn, optionsModalListId, setShowRenameInput }) => {
    const router = useRouter();

    const handleListDelete = async () => {
 
        const res = await fetch("/api/lists", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: optionsModalListId
            })
        })

        router.refresh();
    }

    const getModalPosition = () => {

        const buttonRect = selectedListBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = viewportWidth >= 768 ? (buttonRect.bottom - 60) : buttonRect.bottom - 90;
        let left = Math.min((viewportWidth >= 768 ? (buttonRect.left - 295) : buttonRect.left), (viewportWidth - 185));
        
        return { top, left };
    }

    return <motion.div
        ref={modalRef}
        className={`modal shadow-sm w-[180px] flex flex-col absolute z-10 bg-zinc-100 rounded-sm flex-grow-0 h-min`}
        style={{...getModalPosition()}}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
    >
        <button onClick={() => {
            setShowRenameInput(prev => !prev); 
        }}>Rename</button>
        <button onClick={() => handleListDelete()}>Delete</button>
    </motion.div>
}

export default ListOptionsModal;