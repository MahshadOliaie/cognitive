

function AddDoneBtn({onClick}) {
    return (
        <>
            <button onClick={onClick} type="submit" className="flex-1 p-2 bg-ocean rounded-md shadow-md hover:scale-105 duration-150">افزودن</button>
        </>
    )
}

export default AddDoneBtn