"use client"

const BoardOptionsModal = ({ btnRef, modalRef }) => {

    const getModalPosition = () => {
        const buttonRect = btnRef.current.getBoundingClientRect();
    
        let top = buttonRect.bottom + 4;
        let left = buttonRect.left;
    
        console.log(top, left);
        return { top, left };
    }

    return <div ref={modalRef} className={`flex flex-col z-10 gap-2 absolute bg-zinc-100 rounded-sm p-2`} style={{...getModalPosition()}}>
        <button className="text-left">Rename</button>
        <button className="text-left">Change Background</button>
        <button className="text-left">Delete</button>
    </div>
}

export default BoardOptionsModal;