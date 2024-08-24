

function DeleteFilter({onClick}) {
    return (
        <>
            <button onClick={onClick} className=" p-2 rounded-md shadow-md hover:scale-105 duration-150 flex-grow-0" style={{backgroundColor: "#f7000094"}}>حذف فیلتر</button>

        </>
    )
}

export default DeleteFilter