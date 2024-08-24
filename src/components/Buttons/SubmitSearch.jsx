

function SubmitSearch({onClick}) {
    return (
        <>
            <button onClick={onClick} type="submit" className="flex-1 p-2 bg-ocean rounded-md shadow-md hover:scale-105 duration-150 flex-grow-0">جستجو</button>
        </>
    )
}

export default SubmitSearch