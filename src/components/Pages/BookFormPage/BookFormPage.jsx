import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import FileInput from "../../Modals/FileInput/FileInput";
import CategoryInput from "../../Modals/CategoryInput/CategoryInput";
import AuthorsInput from "../../Modals/AuthorsInput/AuthorsInput";
import TranslatorsInput from "../../Modals/TranslatorsInput/TranslatorsInput";
import PublishersInput from "../../Modals/PublishersInput/PublishersInput";
import CheckBox from "../../Modals/Checkbox/CheckBox";
import EditDoneBtn from "../../Modals/Btns/EditDoneBtn";
import AddDoneBtn from "../../Modals/Btns/AddDoneBtn";
import CancelBtn from "../../Modals/Btns/CancelBtn";
import TOKEN from "../../../../public/token";
import ModalHeader from "../../Modals/ModalHeader/ModalHeader";

function BookFormPage() {
    const location = useLocation();
    const { state: modalData } = location;
    const nav = useNavigate()

    const [isPublic, setIsPublic] = useState((modalData) ? modalData.public : false)
    const [isPublish, setIsPublish] = useState((modalData) ? modalData.publish : false)
    const [categoryValue, setCategoryValue] = useState((modalData) ? modalData.category.id : "")
    const [publisherValue, setPublisherValue] = useState((modalData) ? modalData.publisher.id : "")
    const [translatorValue, setTranslatorValue] = useState((modalData) ? modalData.translators.map(translator => translator.id) : [])
    const [authorValue, setAuthorValue] = useState((modalData) ? modalData.authors.map(author => author.id) : [])
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [image, setImage] = useState((modalData) ? modalData.coverImage : "")
    const [bookFile, setBookFile] = useState((modalData) ? modalData.file : "")

    function handleClose() {
        nav("/addBook")
    }

    function handlePublicity() {
        setIsPublic((prev) => !prev)
    }
    function handlePublish() {
        setIsPublish((prev) => !prev)
    }

    async function putData(data) {
        console.log(data)
        fetch(`https://cogcenter.ir/library/api/v1/manager/0/books/${data.id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'content-type': "application/json",
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: JSON.stringify(data)

        });
        await nav("/addBook")

    }

    async function postData(data) {
        fetch('https://cogcenter.ir/library/api/v1/manager/0/books', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'content-type': "application/json",
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: JSON.stringify(data)
        });
        await nav("/addBook")

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

    if (modalData) {
        register("id")
        setValue("id", (modalData.id))
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
        <div>
            <div className="pb-20">
                {(modalData?.id) &&
                    <div className="flex items-center justify-between py-5 pt-0 mb-4" style={{ borderBottom: "0.5px solid gray" }}>
                        <p className="text-xl font-bold text-dark">ویرایش</p>
                        <p className="text-lg font-bold text-dark"><span className="text-base font-normal">ID: </span>{(modalData?.id) ? (modalData.id) : ""}</p>
                    </div>
                }

                <form className="flex flex-col gap-3" style={{ minWidth: "650px" }}>
                    <div className="flex gap-5 items-end">
                        <FileInput setImage={setImage} image={image} modalData={{ original: modalData }} {...register("coverImage")} />

                        <div className="flex flex-col flex-1 border items-center justify-center py-6 bg-sand rounded-md shadow-inner" style={{ borderColor: "lightgray" }}>
                            {(bookFile) ?
                                (modalData.file) ?
                                    <label htmlFor="pdf" ><img src={`http://cogcenter.ir/api/fs/v1/files/download/${bookFile}?key=${modalData.fileKey}`} alt="" className="max-w-48" /></label>
                                    :
                                    <label htmlFor="pdf" >{bookFile.name}</label>
                                :
                                <label htmlFor="pdf" className="cursor-pointer opacity-70 text-sm p-2">آپلود کتاب</label>
                            }
                            <input type="file" name="pdf" id="pdf" accept="application/pdf" style={{ display: "none" }} {...register("file")} onChange={getFile} />
                        </div>

                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                        <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="name" id="name" defaultValue={(modalData) && modalData.name}
                            {...register("name", {
                                required: "فیلد را پر کنید"
                            })} />
                        {errors.bookName && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookName.message}</p>}
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="number" name="pages" id="pages" defaultValue={(modalData) && modalData.pageNumber}
                                {...register("pageNumber", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.pageNumber && <p style={{ color: "red", fontSize: "12px" }}>{errors.pageNumber.message}</p>}

                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="number" name="year" id="year" defaultValue={(modalData) && modalData.publicationYear}
                                {...register("publicationYear", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.publicationYear && <p style={{ color: "red", fontSize: "12px" }}>{errors.publicationYear.message}</p>}

                        </div>

                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <CategoryInput modalData={{ original: modalData }} setCategoryValue={setCategoryValue} floatAlways={true} categoryValue={categoryValue} {...register("categoryId", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.categoryId && <p style={{ color: "red", fontSize: "12px" }}>{errors.categoryId.message}</p>}
                        </div>
                        <div className="flex flex-col flex-1">
                            <PublishersInput modalData={{ original: modalData }} setPublisherValue={setPublisherValue} floatAlways={true} {...register("publisherId", {
                                required: "انتخاب کنید"
                            })} />
                            {errors.publisherId && <p style={{ color: "red", fontSize: "12px" }}>{errors.publisherId.message}</p>}

                        </div>
                    </div>



                    <div className="flex flex-col flex-1">
                        <AuthorsInput modalData={{ original: modalData }} setAuthorValue={setAuthorValue} authorValue={authorValue} floatAlways={true} {...register("authorIds", {
                            required: "انتخاب کنید"
                        })} />
                        {errors.authorIds && <p style={{ color: "red", fontSize: "12px" }}>{errors.authorIds.message}</p>}
                    </div>

                    <div className="flex flex-col flex-1">
                        <TranslatorsInput modalData={{ original: modalData }} setTranslatorValue={setTranslatorValue} translatorValue={translatorValue} {...register("translatorIds")} floatAlways={true} />
                    </div>





                    <div className="flex flex-col flex-1">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <textarea className="p-2 border rounded-md shadow-inner min-h-40" style={{ borderColor: "lightgray" }} type="text" name="desc" id="desc" defaultValue={(modalData) && modalData.description}
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
                    {(modalData) ?
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

export default BookFormPage