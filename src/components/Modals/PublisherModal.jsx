import { useEffect, useRef, useState } from "react"
import CancelBtn from "./Btns/CancelBtn"
import ModalHeader from "./ModalHeader/ModalHeader"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"
import { useForm } from "react-hook-form"
import FileInput from "./FileInput/FileInput"
import TOKEN from "../../../public/token"


function PublisherModal({ setIsModalOpen, modalData, setEditModal }) {
    const [image, setImage] = useState((modalData.id) ? modalData.original.coverImage : "")
    const [enable, setEnable] = useState((modalData.id) ? modalData.original.enable : false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
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

    setValue("enable", enable)
    setValue("coverImage", image)
    if (modalData.id) {
        register("id")
        setValue("id", (modalData.original.id))
    }


    async function putData(data) {

        fetch(`https://cogcenter.ir/library/api/v1/manager/0/publishers/${data.id}`, {
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
        await setIsModalOpen(false)
        setTimeout(() => { window.location.reload() }, 300)

    }

    async function postData(data) {
        fetch('https://cogcenter.ir/library/api/v1/manager/0/publishers', {
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
        await setIsModalOpen(false)
        setTimeout(() => { window.location.reload() }, 300)


    }
    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }} ref={containerRef}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
                    <ModalHeader title={(modalData.id) ? "ویرایش ناشر" : 'افزودن ناشر'} id={(modalData.id) ? modalData.original.id : ""} />

                    <form className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>
                        <FileInput setImage={setImage} image={image} modalData={modalData} {...register("coverImage")} />

                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام ناشر</label>
                            <input className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.name}
                                {...register("name", {
                                    required: "فیلد را پر کنید"
                                })} />
                            {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name.message}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <EnableCheckbox enable={enable} setEnable={setEnable} {...register("enable")} />
                            <label htmlFor="enable" className="opacity-70 text-sm">فعال</label>
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

export default PublisherModal