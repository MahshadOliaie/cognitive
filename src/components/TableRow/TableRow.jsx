import DeleteBtn from "../Buttons/DeleteBtn"
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children }) {
    return (
        <>
            <tr className="bg-sand rounded-full shadow-md text-center" >
                {children}
                <td className="py-6 gap-2 items-end" width={60}>
                    <EditBtn />
                    <DeleteBtn />
                </td>
            </tr>
        </>
    )
}

export default TableRow