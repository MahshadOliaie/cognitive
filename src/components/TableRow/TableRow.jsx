
import EditBtn from "../Buttons/EditBtn"


function TableRow({ children , modalData , setEditModal , openModal}) {

    return (
        <>
            <tr className="bg-sand text-center" >
                {children}
                <td className="py-2 items-center" width={20}>
                    <EditBtn setEditModal={setEditModal} modalData={modalData} openModal={openModal} />
                </td>
            </tr>
        </>
    )
}

export default TableRow