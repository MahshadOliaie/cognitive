
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children, selected }) {
    return (
        <>
            <tr className="bg-sand text-center" style={(selected) ? { backgroundColor: "lightgray" } : {}} >
                {children}
            </tr>
        </>
    )
}

export default TableRow