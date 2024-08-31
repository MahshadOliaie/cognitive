
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children , modalData , setEditModal , openModal}) {

    return (
        <>
            <tr className="bg-sand text-center" >
                {children}
            </tr>
        </>
    )
}

export default TableRow