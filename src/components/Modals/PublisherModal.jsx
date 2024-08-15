import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import CancelBtn from "./Btns/CancelBtn"
import ModalHeader from "./ModalHeader/ModalHeader"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"


function PublisherModal({ setIsModalOpen, modalData, setEditModal }) {
    const [lastId, setLastId] = useState([])
    const data = useFetch('/publishers.json')
    const [enable, setEnable] = useState((modalData.id) ? modalData.original.enable : false)

    useEffect(() => {
        let id = data.length

        setLastId(id)

        return () => {

        }

    }, [data])

    function handleClose() {
        setIsModalOpen(false)
        setEditModal({})
    }

    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <ModalHeader title={(modalData.id) ? "ویرایش ناشر" : 'افزودن ناشر'} id={(modalData.id) ? modalData.original.id : lastId + 1} />

                    <div className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام ناشر</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name} />
                        </div>

                        <div className="flex items-center gap-2">
                            <EnableCheckbox enable={enable} setEnable={setEnable} />
                            <label htmlFor="enable" className="opacity-70 text-sm">فعال </label>
                        </div>

                    </div>

                    <div className="flex justify-between gap-5">
                        {(modalData.id) ?
                            <EditDoneBtn />
                            :
                            <AddDoneBtn />
                        }
                        <CancelBtn handleClose={handleClose} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublisherModal