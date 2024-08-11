import deleteSvg from '/delete.svg'

function DeleteBtn({ bgColor }) {
    return (
        <>
            <p className="flex items-center justify-center shadow-md w-11 h-11 rounded-full p-2 cursor-pointer hover:scale-105 duration-150" style={(bgColor) ? { backgroundColor: bgColor } : { backgroundColor: "#cf3535" }}>
                <img src={deleteSvg} alt="" />
            </p>

        </>
    )
}

export default DeleteBtn