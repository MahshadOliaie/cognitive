
function CheckBox({ isActive , onClick }) {


    return (
        <>
            <div className="flex w-12 rounded-full p-1 justify-start bg-ocean cursor-pointer duration-200" style={(isActive) ? { backgroundColor: "#A1CED6", justifyContent: "flex-start" } : { justifyContent: "flex-end", backgroundColor: "lightgray" }} onClick={onClick}>
                <div className="bg-sand rounded-full w-4 h-4"></div>
            </div>
        </>
    )
}

export default CheckBox