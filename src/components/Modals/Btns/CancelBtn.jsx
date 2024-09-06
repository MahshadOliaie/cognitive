

function CancelBtn({handleClose}) {
    return (
        <>
            <p type="submit" className="text-center cursor-pointer flex-1 p-2 rounded-md shadow-md hover:scale-105 duration-150" style={{ backgroundColor: "lightgray" }} onClick={handleClose}>لغو</p>
        </>
    )
}

export default CancelBtn