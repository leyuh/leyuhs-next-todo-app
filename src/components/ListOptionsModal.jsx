"use client"

const ListOptionsModal = ({ modalRef, selectedListBtn, optionsModalListId }) => {

    const handleListDelete = async () => {
        // delete list's items
        const itemsRes = await fetch("/api/items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                listId: optionsModalListId
            })
        })

        // delete list
        const listsRes = await fetch("/api/lists", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: optionsModalListId
            })
        })
    }

    const getModalPosition = () => {

        const buttonRect = selectedListBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = buttonRect.bottom + 4;
        let left = Math.min(buttonRect.left, (viewportWidth - 165));
        
        return { top, left };
    }

    return <div ref={modalRef} className={` w-[180px] flex flex-col absolute z-10 gap-2 bg-zinc-100 rounded-sm p-2 flex-grow-0 h-min`} style={{...getModalPosition()}} >
        <button className="text-left" onClick={() => {
            //setShowRenameInput(prev => !prev); 
            //setShowBoardOptionsModal(false)
        }}>Rename</button>
        <button
            className="text-left"
            onClick={() => handleListDelete()}
        >Delete</button>
    </div>
}

export default ListOptionsModal;