import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import ModalHeader from "./ModalHeader/ModalHeader"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import CancelBtn from "./Btns/CancelBtn"


function AuthorModal({ setIsModalOpen }) {
    const [lastId, setLastId] = useState([])
    const data = useFetch('/publishers.json')
    const [enable, setEnable] = useState(false)
    const [isTranslator , setIsTranslator] = useState(false)

    useEffect(() => {
        let id = data.length

        setLastId(id)

        return () => {

        }

    }, [data])

    function handleClose() {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <ModalHeader title={'افزودن نویسنده'} id={lastId + 1} />

                    <div className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="lastName" className="opacity-70 text-sm mb-1">نام خانوادگی</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="lastName" id="lastName" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                            <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" />
                        </div>

                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-2">
                                <EnableCheckbox enable={enable} setEnable={setEnable} />
                                <label htmlFor="enable" className="opacity-70 text-sm">فعال کردن</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <EnableCheckbox enable={isTranslator} setEnable={setIsTranslator} />
                                <label htmlFor="translator" className="opacity-70 text-sm">مترجم است</label>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between gap-5">
                        <button type="submit" className="flex-1 p-2 bg-ocean rounded-md shadow-md hover:scale-105 duration-150">افزودن</button>
                        <CancelBtn handleClose={handleClose} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthorModal