import DeleteBtn from "../Buttons/DeleteBtn"
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children }) {
    return (
        <>
            <tr className="bg-sand rounded-xl shadow-md text-center" >
                {children}
                <td className="py-2 gap-1 items-end" width={60}>
                    <EditBtn />
                    <DeleteBtn />
                </td>
            </tr>
        </>
    )
}

export default TableRow