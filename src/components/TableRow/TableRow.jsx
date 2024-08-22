
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children , modalData , setEditModal , openModal}) {

    return (
        <>
            <tr className="bg-sand rounded-xl shadow-md text-center" >
                {children}
                <td className="py-2 gap-1 items-end" width={60}>
                    <EditBtn setEditModal={setEditModal} modalData={modalData} openModal={openModal} />
                </td>
            </tr>
        </>
    )
}

export default TableRow