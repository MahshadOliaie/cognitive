

function AddDoneBtn({ onClick }) {
    return (
        <>
            <p onClick={onClick} type="submit" className="text-center cursor-pointer flex-1 p-2 bg-ocean rounded-md shadow-md hover:scale-105 duration-150">افزودن</p>
        </>
    )
}

export default AddDoneBtn