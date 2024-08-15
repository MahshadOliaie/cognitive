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
import { useForm } from "react-hook-form"

function BookModal({ setIsModalOpen, modalData, setEditModal }) {
    const [lastId, setLastId] = useState(0)
    const [isPublic, setIsPublic] = useState((modalData.id) ? modalData.original.public : false)
    const [isPublish, setIsPublish] = useState((modalData.id) ? modalData.original.publish : false)
    const [categoryValue, setCategoryValue] = useState((modalData.id) ? modalData.original.category.title : "")
    const [publisherValue, setPublisherValue] = useState((modalData.id) ? modalData.original.publisher.name : "")
    const [authorValue, setAuthorValue] = useState((modalData.id) ? `${modalData.original.authors[0].firstName + modalData.original.authors[0].lastName}` : "")
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

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

    function handlePublicity() {
        setIsPublic((prev) => !prev)
    }
    function handlePublish() {
        setIsPublish((prev) => !prev)
    }

    function submit(data) {
        console.log(data)
    }

    setValue("bookCategory", categoryValue)
    setValue("bookAuthor", authorValue)
    setValue("bookPublisher", publisherValue)
    setValue("publishBook", isPublish)
    setValue("publicBook", isPublic)




    return (
        <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
            <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >

                <ModalHeader title={(modalData.id) ? "ویرایش کتاب" : 'افزودن کتاب'} id={(modalData.id) ? (modalData.original.id) : lastId + 1} />

                <form className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                    <div className="flex gap-5 items-end">
                        <FileInput modalData={modalData} register={register} />
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name}
                                {...register("bookName", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.bookName && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookName.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="pages" id="pages" defaultValue={(modalData.id) && modalData.original.pageNumber}
                                {...register("bookPages", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.bookPages && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookPages.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <CategoryInput modalData={modalData} setCategoryValue={setCategoryValue} {...register("bookCategory", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.bookCategory && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookCategory.message}</p>}
                        </div>

                    </div>

                    <div className="flex flex-col flex-1">
                        <AuthorsInput modalData={modalData} setAuthorValue={setAuthorValue} {...register("bookAuthor", {
                            required: "انتخاب کنید"
                        })} />
                        {errors.bookAuthor && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookAuthor.message}</p>}
                    </div>

                    <div className="flex justify-between gap-5">

                        <div className="flex flex-col flex-1">
                            <PublishersInput modalData={modalData} setPublisherValue={setPublisherValue} {...register("bookPublisher", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.bookPublisher && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookPublisher.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="year" id="year" defaultValue={(modalData.id) && modalData.original.publicationYear}
                                {...register("publishYear", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.publishYear && <p style={{ color: "red", fontSize: "12px" }}>{errors.publishYear.message}</p>}

                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description}
                            {...register("bookDesc")} />
                    </div>

                    <div className="flex justify-between px-5 pb-5">
                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm mb-1"> منتشر کردن</label>
                            <CheckBox isActive={isPublish} onClick={handlePublish} {...register("publishBook")} />

                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="public" className="opacity-70 text-sm mb-1">عمومی</label>
                            <CheckBox isActive={isPublic} onClick={handlePublicity} {...register("publicBook")} />
                        </div>
                    </div>
                </form>

                <div className="flex justify-between gap-5">
                    {(modalData.id) ?
                        <EditDoneBtn onClick={handleSubmit(submit)} />
                        :
                        <AddDoneBtn onClick={handleSubmit(submit)} />
                    }
                    <CancelBtn handleClose={handleClose} />
                </div>
            </div>
        </div>
    )
}


export default BookModal