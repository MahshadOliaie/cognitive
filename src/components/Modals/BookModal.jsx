import { useEffect, useState } from "react"
import CancelBtn from "./Btns/CancelBtn"
import CheckBox from "./Checkbox/CheckBox"
import ModalHeader from "./ModalHeader/ModalHeader"
import useFetch from "../../hooks/useFetch"
import CategoryInput from "./CategoryInput/CategoryInput"
import AuthorsInput from "./AuthorsInput/AuthorsInput"
import PublishersInput from "./PublishersInput/PublishersInput"
import FileInput from "./FileInput/FileInput"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"

function BookModal({ setIsModalOpen, modalData, setEditModal }) {
    const [lastId, setLastId] = useState(0)

    const data = useFetch('/books.json')

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
        <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
            <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >

                <ModalHeader title={(modalData.id) ? "ویرایش کتاب" : 'افزودن کتاب'} id={(modalData.id) ? (modalData.original.id) : lastId + 1} />

                <div className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                    <div className="flex gap-5 items-end">
                        <FileInput modalData={modalData} />
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name} />
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="pages" id="pages" defaultValue={(modalData.id) && modalData.original.pageNumber} />
                        </div>

                        <CategoryInput modalData={modalData} />
                    </div>

                    <AuthorsInput modalData={modalData} />

                    <div className="flex justify-between gap-5">
                        <PublishersInput modalData={modalData} />

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="year" id="year" defaultValue={(modalData.id) && modalData.original.publicationYear} />
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description} />
                    </div>

                    <div className="flex justify-between px-5 pb-5">
                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm mb-1"> منتشر کردن</label>
                            <CheckBox modalData={(modalData.id) ? (modalData.original.publish) : false} />

                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="public" className="opacity-70 text-sm mb-1">عمومی</label>
                            <CheckBox modalData={(modalData.id) ? (modalData.original.public) : false} />
                        </div>
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
    )
}


export default BookModal