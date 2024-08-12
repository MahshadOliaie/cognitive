

function CancelBtn({handleClose}) {
    return (
        <>
            <button type="submit" className="flex-1 p-2 rounded-md shadow-md hover:scale-105 duration-150" style={{ backgroundColor: "lightgray" }} onClick={handleClose}>لغو</button>
        </>
    )
}

export default CancelBtn