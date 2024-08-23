import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import ModalHeader from "./ModalHeader/ModalHeader"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import CancelBtn from "./Btns/CancelBtn"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"
import { useForm } from "react-hook-form"
import FileInput from "./FileInput/FileInput"


function AuthorModal({ setIsModalOpen, modalData, setEditModal }) {
    const [lastId, setLastId] = useState([])
    const data = useFetch('https://cogcenter.ir/library/api/v1/manager/0/books?page=0&size=1')
    const [image, setImage] = useState("")
    const [enable, setEnable] = useState((modalData.id) ? modalData.original.enable : false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        let id =  data.totalElements

        setLastId(id)

        return () => {

        }

    }, [data])

    function handleClose() {
        setIsModalOpen(false)
        setEditModal({})

    }

    function putData(data) {
        console.log(data)
    }

    async function postData(data) {
        console.log(data)
        fetch('https://cogcenter.ir/library/api/v1/manager/0/authors', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6NywiZmlyc3ROYW1lIjoiYWxpIiwibGFzdE5hbWUiOiJlc21haWxpIiwidXNlckltYWdlIjoiMzg1NjZiNTMtMzY0MS00YzkzLWI4OWEtMTRkY2Y0NDRmNmIxIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiIsIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXSwiYXV0aG9yaXRpZXMiOnsiMCI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdLCIxIjpbIk9QX0FERF9VUERBVEVfQ0FURUdPUlkiLCJPUF9BRERfVVBEQVRFX1RPUElDIiwiT1BfUkVBRCIsIk9QX0NPTU1FTlRfUkVQT1JUIiwiT1BfQVVUSE9SU19SRVBPUlQiLCJPUF9UT1BJQ19NRVNTQUdFX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUk9MRSIsIk9QX1BVQkxJU0hfVU5QVUJMSVNIX05FV1MiLCJPUF9BRERfVVBEQVRFX0FVVEhPUiIsIk9QX1RPUElDX01FU1NBR0VfUFVCTElTSCIsIk9QX1RPUElDX1JFUE9SVCIsIk9QX0FERF9ST0xFX1RPX1VTRVIiLCJPUF9BRERfVVBEQVRFX0JPT0siLCJPUF9BRERfVVBEQVRFX05FV1MiLCJPUF9CT09LX1JFUE9SVCIsIk9QX1VTRVJfUkVQT1JUIiwiT1BfUFVCTElTSEVSX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUFVCTElTSEVSIiwiT1BfQUREX1RBRyIsIk9QX0JMT0NLX1VOQkxPQ0tfVVNFUiIsIk9QX05FV1NfUkVQT1JUIl0sIjIiOlsiT1BfQUREX1VQREFURV9DQVRFR09SWSIsIk9QX0FERF9VUERBVEVfVE9QSUMiLCJPUF9SRUFEIiwiT1BfQ09NTUVOVF9SRVBPUlQiLCJPUF9BVVRIT1JTX1JFUE9SVCIsIk9QX1RPUElDX01FU1NBR0VfUkVQT1JUIiwiT1BfQUREX1VQREFURV9ST0xFIiwiT1BfUFVCTElTSF9VTlBVQkxJU0hfTkVXUyIsIk9QX0FERF9VUERBVEVfQVVUSE9SIiwiT1BfVE9QSUNfTUVTU0FHRV9QVUJMSVNIIiwiT1BfVE9QSUNfUkVQT1JUIiwiT1BfQUREX1JPTEVfVE9fVVNFUiIsIk9QX0FERF9VUERBVEVfQk9PSyIsIk9QX0FERF9VUERBVEVfTkVXUyIsIk9QX0JPT0tfUkVQT1JUIiwiT1BfVVNFUl9SRVBPUlQiLCJPUF9QVUJMSVNIRVJfUkVQT1JUIiwiT1BfQUREX1VQREFURV9QVUJMSVNIRVIiLCJPUF9BRERfVEFHIiwiT1BfQkxPQ0tfVU5CTE9DS19VU0VSIiwiT1BfTkVXU19SRVBPUlQiXSwiMyI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdfSwiaWF0IjoxNzI0MzYwMzk5LCJleHAiOjE3MjQ0NDY3OTl9.pkrFofqzsFoGLnjHiiuZinJXu9ZQ-EiWtF_vbVxc4uDmr8D4QCz7eLm2fDSqOHh-vOsVh9J-vpJVMjwcdePyzg",
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

    setValue("enable", enable)
    setValue("id", (modalData.id) ? (modalData.original.id) : lastId + 1)
    register("id")
    setValue("coverImage", image)


    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <ModalHeader title={(modalData.id) ? "ویرایش نویسنده" : 'افزودن نویسنده'} id={(modalData.id) ? modalData.original.id : lastId + 1} />

                    <form className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>
                    <FileInput modalData={modalData} setImage={setImage} image={image} {...register("coverImage")} />
                    <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام</label>
                            <input type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.firstName} className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none"
                                {...register("firstName", {
                                    required: " فیلد را پر کنید"
                                })} />
                            {errors.firstName && <p style={{ color: "red", fontSize: "12px" }}>{errors.firstName.message}</p>}
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="lastName" className="opacity-70 text-sm mb-1">نام خانوادگی</label>
                            <input type="text" name="lastName" id="lastName" defaultValue={(modalData.id) && modalData.original.lastName} className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" {...register("lastName", {
                                required: "فیلد را پر کنید"
                            })} />
                            {errors.lastName && <p style={{ color: "red", fontSize: "12px" }}>{errors.lastName.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                            <input type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description} className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none"  {...register("description")} />
                        </div>

                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-2">
                                <EnableCheckbox enable={enable} setEnable={setEnable} {...register("enable")} />
                                <label htmlFor="enable" className="opacity-70 text-sm">فعال </label>
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
        </>
    )
}

export default AuthorModal