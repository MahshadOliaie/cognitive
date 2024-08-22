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
    const [publisherValue, setPublisherValue] = useState((modalData.id) ? modalData.original.publisher.id : "")
    const [authorValue, setAuthorValue] = useState((modalData.id) ? modalData.original.authors[0].id : "")
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const data = useFetch('https://cogcenter.ir/library/api/v1/manager/0/books?page=0&size=1')

    useEffect(() => {

        let id = data.totalElements

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

    function putData(data) {
        console.log(data)
    }

    async function postData(data) {
        console.log(data)
        fetch('url', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        await setIsModalOpen(false)
    }

    setValue("categoryId", categoryValue)
    setValue("authorIds", authorValue)
    setValue("publisherId", publisherValue)
    setValue("publish", isPublish)
    setValue("public", isPublic)
    setValue("id", (modalData.id) ? (modalData.original.id) : lastId + 1)
    register("id")



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
                                {...register("name", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.bookName && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookName.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="pages" id="pages" defaultValue={(modalData.id) && modalData.original.pageNumber}
                                {...register("pageNumber", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.pageNumber && <p style={{ color: "red", fontSize: "12px" }}>{errors.pageNumber.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <CategoryInput modalData={modalData} setCategoryValue={setCategoryValue} {...register("categoryId", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.categoryId && <p style={{ color: "red", fontSize: "12px" }}>{errors.categoryId.message}</p>}
                        </div>

                    </div>

                    <div className="flex flex-col flex-1">
                        <AuthorsInput modalData={modalData} setAuthorValue={setAuthorValue} {...register("authorIds", {
                            required: "انتخاب کنید"
                        })} />
                        {errors.authorIds && <p style={{ color: "red", fontSize: "12px" }}>{errors.authorIds.message}</p>}
                    </div>

                    <div className="flex justify-between gap-5">

                        <div className="flex flex-col flex-1">
                            <PublishersInput modalData={modalData} setPublisherValue={setPublisherValue} {...register("publisherId", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.publisherId && <p style={{ color: "red", fontSize: "12px" }}>{errors.publisherId.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="year" id="year" defaultValue={(modalData.id) && modalData.original.publicationYear}
                                {...register("publicationYear", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.publicationYear && <p style={{ color: "red", fontSize: "12px" }}>{errors.publicationYear.message}</p>}

                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description}
                            {...register("description")} />
                    </div>

                    <div className="flex justify-between px-5 pb-5">
                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm mb-1"> منتشر کردن</label>
                            <CheckBox isActive={isPublish} onClick={handlePublish} {...register("publish")} />

                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="public" className="opacity-70 text-sm mb-1">عمومی</label>
                            <CheckBox isActive={isPublic} onClick={handlePublicity} {...register("public")} />
                        </div>
                    </div>
                </form>

                <div className="flex justify-between gap-5">
                    {(modalData.id) ?
                        <EditDoneBtn onClick={handleSubmit(putData)} />
                        :
                        <AddDoneBtn onClick={handleSubmit(postData)} />
                    }
                    <CancelBtn handleClose={handleClose} />
                </div>
            </div>
        </div>
    )
}


export default BookModal