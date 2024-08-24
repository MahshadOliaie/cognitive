
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
import { useState } from "react"
import TranslatorsInput from "./TranslatorsInput/TranslatorsInput"

function BookModal({ setIsModalOpen, modalData, setEditModal }) {

    const [isPublic, setIsPublic] = useState((modalData.id) ? modalData.original.public : false)
    const [file, setFile] = useState((modalData.id) ? modalData.original.fileKey : "")
    const [isPublish, setIsPublish] = useState((modalData.id) ? modalData.original.publish : false)
    const [categoryValue, setCategoryValue] = useState((modalData.id) ? modalData.original.category.id : "")
    const [publisherValue, setPublisherValue] = useState((modalData.id) ? modalData.original.publisher.id : "")
    const [translatorValue, setTranslatorValue] = useState((modalData.id) ? modalData.original.authors[0].id : "")
    const [authorValue, setAuthorValue] = useState((modalData.id) ? modalData.original.authors[0].id : "")
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [image, setImage] = useState((modalData.id) ? modalData.original.coverImage : "")



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
        console.log(data)
        fetch(`https://cogcenter.ir/library/api/v1/manager/0/books/${data.id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6NywiZmlyc3ROYW1lIjoiYWxpIiwibGFzdE5hbWUiOiJlc21haWxpIiwidXNlckltYWdlIjoiMzg1NjZiNTMtMzY0MS00YzkzLWI4OWEtMTRkY2Y0NDRmNmIxIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiIsIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXSwiYXV0aG9yaXRpZXMiOnsiMCI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdLCIxIjpbIk9QX0FERF9VUERBVEVfQ0FURUdPUlkiLCJPUF9BRERfVVBEQVRFX1RPUElDIiwiT1BfUkVBRCIsIk9QX0NPTU1FTlRfUkVQT1JUIiwiT1BfQVVUSE9SU19SRVBPUlQiLCJPUF9UT1BJQ19NRVNTQUdFX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUk9MRSIsIk9QX1BVQkxJU0hfVU5QVUJMSVNIX05FV1MiLCJPUF9BRERfVVBEQVRFX0FVVEhPUiIsIk9QX1RPUElDX01FU1NBR0VfUFVCTElTSCIsIk9QX1RPUElDX1JFUE9SVCIsIk9QX0FERF9ST0xFX1RPX1VTRVIiLCJPUF9BRERfVVBEQVRFX0JPT0siLCJPUF9BRERfVVBEQVRFX05FV1MiLCJPUF9CT09LX1JFUE9SVCIsIk9QX1VTRVJfUkVQT1JUIiwiT1BfUFVCTElTSEVSX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUFVCTElTSEVSIiwiT1BfQUREX1RBRyIsIk9QX0JMT0NLX1VOQkxPQ0tfVVNFUiIsIk9QX05FV1NfUkVQT1JUIl0sIjIiOlsiT1BfQUREX1VQREFURV9DQVRFR09SWSIsIk9QX0FERF9VUERBVEVfVE9QSUMiLCJPUF9SRUFEIiwiT1BfQ09NTUVOVF9SRVBPUlQiLCJPUF9BVVRIT1JTX1JFUE9SVCIsIk9QX1RPUElDX01FU1NBR0VfUkVQT1JUIiwiT1BfQUREX1VQREFURV9ST0xFIiwiT1BfUFVCTElTSF9VTlBVQkxJU0hfTkVXUyIsIk9QX0FERF9VUERBVEVfQVVUSE9SIiwiT1BfVE9QSUNfTUVTU0FHRV9QVUJMSVNIIiwiT1BfVE9QSUNfUkVQT1JUIiwiT1BfQUREX1JPTEVfVE9fVVNFUiIsIk9QX0FERF9VUERBVEVfQk9PSyIsIk9QX0FERF9VUERBVEVfTkVXUyIsIk9QX0JPT0tfUkVQT1JUIiwiT1BfVVNFUl9SRVBPUlQiLCJPUF9QVUJMSVNIRVJfUkVQT1JUIiwiT1BfQUREX1VQREFURV9QVUJMSVNIRVIiLCJPUF9BRERfVEFHIiwiT1BfQkxPQ0tfVU5CTE9DS19VU0VSIiwiT1BfTkVXU19SRVBPUlQiXSwiMyI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdfSwiaWF0IjoxNzI0NDQ4MjUyLCJleHAiOjE3MjQ1MzQ2NTJ9.i3aFU-S7P-kiWQEcs9AGoYZpqEymeeMUs-8sqCQX9PFTrqdKy6vaCd3waR6mhP-cxZk7MezBUwrGpZNbwtDMqw",
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: JSON.stringify(data)
        });
        await setIsModalOpen(false)
    }

    async function postData(data) {
        console.log(data)
        fetch('https://cogcenter.ir/library/api/v1/manager/0/books', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6NywiZmlyc3ROYW1lIjoiYWxpIiwibGFzdE5hbWUiOiJlc21haWxpIiwidXNlckltYWdlIjoiMzg1NjZiNTMtMzY0MS00YzkzLWI4OWEtMTRkY2Y0NDRmNmIxIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiIsIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXSwiYXV0aG9yaXRpZXMiOnsiMCI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdLCIxIjpbIk9QX0FERF9VUERBVEVfQ0FURUdPUlkiLCJPUF9BRERfVVBEQVRFX1RPUElDIiwiT1BfUkVBRCIsIk9QX0NPTU1FTlRfUkVQT1JUIiwiT1BfQVVUSE9SU19SRVBPUlQiLCJPUF9UT1BJQ19NRVNTQUdFX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUk9MRSIsIk9QX1BVQkxJU0hfVU5QVUJMSVNIX05FV1MiLCJPUF9BRERfVVBEQVRFX0FVVEhPUiIsIk9QX1RPUElDX01FU1NBR0VfUFVCTElTSCIsIk9QX1RPUElDX1JFUE9SVCIsIk9QX0FERF9ST0xFX1RPX1VTRVIiLCJPUF9BRERfVVBEQVRFX0JPT0siLCJPUF9BRERfVVBEQVRFX05FV1MiLCJPUF9CT09LX1JFUE9SVCIsIk9QX1VTRVJfUkVQT1JUIiwiT1BfUFVCTElTSEVSX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUFVCTElTSEVSIiwiT1BfQUREX1RBRyIsIk9QX0JMT0NLX1VOQkxPQ0tfVVNFUiIsIk9QX05FV1NfUkVQT1JUIl0sIjIiOlsiT1BfQUREX1VQREFURV9DQVRFR09SWSIsIk9QX0FERF9VUERBVEVfVE9QSUMiLCJPUF9SRUFEIiwiT1BfQ09NTUVOVF9SRVBPUlQiLCJPUF9BVVRIT1JTX1JFUE9SVCIsIk9QX1RPUElDX01FU1NBR0VfUkVQT1JUIiwiT1BfQUREX1VQREFURV9ST0xFIiwiT1BfUFVCTElTSF9VTlBVQkxJU0hfTkVXUyIsIk9QX0FERF9VUERBVEVfQVVUSE9SIiwiT1BfVE9QSUNfTUVTU0FHRV9QVUJMSVNIIiwiT1BfVE9QSUNfUkVQT1JUIiwiT1BfQUREX1JPTEVfVE9fVVNFUiIsIk9QX0FERF9VUERBVEVfQk9PSyIsIk9QX0FERF9VUERBVEVfTkVXUyIsIk9QX0JPT0tfUkVQT1JUIiwiT1BfVVNFUl9SRVBPUlQiLCJPUF9QVUJMSVNIRVJfUkVQT1JUIiwiT1BfQUREX1VQREFURV9QVUJMSVNIRVIiLCJPUF9BRERfVEFHIiwiT1BfQkxPQ0tfVU5CTE9DS19VU0VSIiwiT1BfTkVXU19SRVBPUlQiXSwiMyI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdfSwiaWF0IjoxNzI0NDQ4MjUyLCJleHAiOjE3MjQ1MzQ2NTJ9.i3aFU-S7P-kiWQEcs9AGoYZpqEymeeMUs-8sqCQX9PFTrqdKy6vaCd3waR6mhP-cxZk7MezBUwrGpZNbwtDMqw",
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
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
    setValue("coverImage", image)
    register("scopeId")
    setValue("scopeId", 0)
    register("file")
    setValue("file", file)
    setValue("translatorIds", translatorValue)

    if (modalData.id) {
        register("id")
        setValue("id", (modalData.original.id))
    }


    return (
        <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
            <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >

                <ModalHeader title={(modalData.id) ? "ویرایش کتاب" : 'افزودن کتاب'} id={(modalData.id) ? (modalData.original.id) : ""} />

                <form className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                    <div className="flex gap-5 items-end">
                        <FileInput setImage={setImage} image={image} setFile={setFile} {...register("coverImage")} />
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name}
                                {...register("name", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.bookName && <p style={{ color: "red", fontSize: "12px" }}>{errors.bookName.message}</p>}
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
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="number" name="year" id="year" defaultValue={(modalData.id) && modalData.original.publicationYear}
                                {...register("publicationYear", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.publicationYear && <p style={{ color: "red", fontSize: "12px" }}>{errors.publicationYear.message}</p>}

                        </div>

                    </div>
                    <div className="flex flex-col flex-1">
                        <TranslatorsInput modalData={modalData} setTranslatorValue={setTranslatorValue} {...register("translatorIds")}  />
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <textarea className="p-4 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description}
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