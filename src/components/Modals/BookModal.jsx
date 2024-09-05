
import CancelBtn from "./Btns/CancelBtn"
import CheckBox from "./Checkbox/CheckBox"
import ModalHeader from "./ModalHeader/ModalHeader"
import CategoryInput from "./CategoryInput/CategoryInput"
import AuthorsInput from "./AuthorsInput/AuthorsInput"
import PublishersInput from "./PublishersInput/PublishersInput"
import FileInput from "./FileInput/FileInput"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import TranslatorsInput from "./TranslatorsInput/TranslatorsInput"
import TOKEN from "../../../public/token"

function BookModal({ setIsModalOpen, modalData, setEditModal }) {

    const [isPublic, setIsPublic] = useState((modalData.id) ? modalData.original.public : false)
    const [isPublish, setIsPublish] = useState((modalData.id) ? modalData.original.publish : false)
    const [categoryValue, setCategoryValue] = useState((modalData.id) ? modalData.original.category.id : "")
    const [publisherValue, setPublisherValue] = useState((modalData.id) ? modalData.original.publisher.id : "")
    const [translatorValue, setTranslatorValue] = useState((modalData.id) ? modalData.original.translators.map(translator => translator.id) : [])
    const [authorValue, setAuthorValue] = useState((modalData.id) ? modalData.original.authors.map(author => author.id) : [])
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [image, setImage] = useState((modalData.id) ? modalData.original.coverImage : "")
    const [bookFile, setBookFile] = useState((modalData.id) ? modalData.original.file : "")
    const ref = useRef()
    const containerRef = useRef()



    useEffect(() => {

        function clickHandler() {
            if (!ref.current.contains(event.target) && event.target == containerRef.current) {
                handleClose()
            }
        }

        document.addEventListener("click", clickHandler)

        return () => {
            document.removeEventListener("click", clickHandler)
        }
    }, [])

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

    async function putData(data) {
        const { authorIds, categoryId, coverImage, description, file, id, name, pageNumber, publicationYear, publish, publisherId, scopeId, translatorIds
        } = data
        const formData = new FormData()
        formData.append("authorIds", authorIds)
        formData.append("categoryId", categoryId)
        formData.append("coverImage", coverImage)
        formData.append("description", description)
        formData.append("file", file)
        formData.append("id", id)
        formData.append("name", name)
        formData.append("pageNumber", pageNumber)
        formData.append("publicationYear", publicationYear)
        formData.append("publish", publish)
        formData.append("public", data.public)
        formData.append("publisherId", publisherId)
        formData.append("scopeId", scopeId)
        formData.append("translatorIds", translatorIds)

        fetch(`https://cogcenter.ir/library/api/v1/manager/0/books/${data.id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: formData
        });
        await setIsModalOpen(false)
    }

    async function postData(data) {
        const { authorIds, categoryId, coverImage, description, file, id, name, pageNumber, publicationYear, publish, publisherId, scopeId, translatorIds
        } = data
        const formData = new FormData()
        formData.append("authorIds", authorIds)
        formData.append("categoryId", categoryId)
        formData.append("coverImage", coverImage)
        formData.append("description", description)
        formData.append("file", file)
        formData.append("name", name)
        formData.append("pageNumber", pageNumber)
        formData.append("publicationYear", publicationYear)
        formData.append("publish", publish)
        formData.append("public", data.public)
        formData.append("publisherId", publisherId)
        formData.append("scopeId", scopeId)
        formData.append("translatorIds", translatorIds)

        fetch('https://cogcenter.ir/library/api/v1/manager/0/books', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: formData
        });
        await setIsModalOpen(false)
    }

    setValue("categoryId", categoryValue)
    setValue("authorIds", authorValue)
    setValue("publisherId", publisherValue)
    setValue("publish", isPublish)
    setValue("public", isPublic)
    setValue("coverImage", image)
    register("scopeId")
    setValue("scopeId", 0)
    register("file")
    setValue("file", bookFile)
    setValue("translatorIds", translatorValue)

    if (modalData.id) {
        register("id")
        setValue("id", (modalData.original.id))
    }

    async function getFile() {
        const formData = new FormData();
        formData.append("modelTypeId", 6);
        formData.append("scopeId", 0);
        formData.append("file", event.target.files[0]);

        await fetch("https://cogcenter.ir/api/fs/v1/files", {
            method: "POST",
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => setBookFile(data.fileName))
    }



    return (
        <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }} ref={containerRef}>
            <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
                <ModalHeader title={(modalData.id) ? "ویرایش کتاب" : 'افزودن کتاب'} id={(modalData.id) ? (modalData.original.id) : ""} />

                <form className="flex flex-col gap-3" style={{ minWidth: "650px" }}>
                    <div className="flex gap-5 items-end">
                        <FileInput setImage={setImage} image={image} modalData={modalData} {...register("coverImage")} />
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                                <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name}
                                    {...register("name", {
                                        required: "فیلد را پر کنید"
                                    })} />
                                {errors.bookName && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookName.message}</p>}
                            </div>
                            <div className="flex flex-col flex-1 border items-center justify-center bg-sand rounded-md shadow-inner" style={{ borderColor: "lightgray" }}>
                                {(bookFile) ?
                                    (modalData.original.file) ?
                                        <label htmlFor="pdf" ><img src={`http://cogcenter.ir/api/fs/v1/files/download/${bookFile}?key=${modalData.original.fileKey}`} alt="" className="max-w-48" /></label>
                                        :
                                        <label htmlFor="pdf" >{bookFile.name}</label>
                                    :
                                    <label htmlFor="pdf" className="cursor-pointer opacity-70 text-sm p-2">آپلود کتاب</label>
                                }
                                <input type="file" name="pdf" id="pdf" accept="application/pdf" style={{ display: "none" }} {...register("file")} onChange={getFile} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="number" name="pages" id="pages" defaultValue={(modalData.id) && modalData.original.pageNumber}
                                {...register("pageNumber", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.pageNumber && <p style={{ color: "red", fontSize: "12px" }}>{errors.pageNumber.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <CategoryInput modalData={modalData} setCategoryValue={setCategoryValue} floatAlways={true} {...register("categoryId", {
                                required: "انتخاب کنید" 
                            })} />
                            {errors.categoryId && <p style={{ color: "red", fontSize: "12px" }}>{errors.categoryId.message}</p>}
                        </div>

                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <AuthorsInput modalData={modalData} setAuthorValue={setAuthorValue} floatAlways={true} {...register("authorIds", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.authorIds && <p style={{ color: "red", fontSize: "12px" }}>{errors.authorIds.message}</p>}
                        </div>

                        <div className="flex flex-col flex-1">
                            <TranslatorsInput modalData={modalData} setTranslatorValue={setTranslatorValue} {...register("translatorIds")} floatAlways={true} />
                        </div>

                    </div>


                    <div className="flex justify-between gap-5">

                        <div className="flex flex-col flex-1">
                            <PublishersInput modalData={modalData} setPublisherValue={setPublisherValue} floatAlways={true} {...register("publisherId", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.publisherId && <p style={{ color: "red", fontSize: "12px" }}>{errors.publisherId.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="number" name="year" id="year" defaultValue={(modalData.id) && modalData.original.publicationYear}
                                {...register("publicationYear", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.publicationYear && <p style={{ color: "red", fontSize: "12px" }}>{errors.publicationYear.message}</p>}

                        </div>

                    </div>


                    <div className="flex flex-col flex-1">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <textarea className="p-2 border rounded-md shadow-inner min-h-40" style={{ borderColor: "lightgray" }} type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description}
                            {...register("description")} />
                    </div>

                    <div className="flex justify-between px-5 pb-5">
                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm mb-1">انتشار</label>
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