import { useEffect, useRef, useState } from "react"
import ModalHeader from "./ModalHeader/ModalHeader"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import CancelBtn from "./Btns/CancelBtn"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"
import { useForm } from "react-hook-form"
import FileInput from "./FileInput/FileInput"
import TOKEN from "../../../public/token"


function AuthorModal({ setIsModalOpen, modalData, setEditModal }) {
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

    async function putData(data) {
        fetch(`https://cogcenter.ir/library/api/v1/manager/0/authors/${data.id}`, {
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
            body: JSON.stringify(data)
        });
        await setIsModalOpen(false)
    }


    async function postData(data) {
        fetch('https://cogcenter.ir/library/api/v1/manager/0/authors', {
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
            body: JSON.stringify(data)
        });
        await setIsModalOpen(false)
    }

    setValue("enable", enable)
    if (modalData.id) {
        register("id")
        setValue("id", (modalData.original.id))
    }
    setValue("coverImage", image)


    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }} ref={containerRef}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
                    <ModalHeader title={(modalData.id) ? "ویرایش نویسنده" : 'افزودن نویسنده'} id={(modalData.id) ? modalData.original.id : ""} />

                    <form className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>
                        <FileInput setImage={setImage} image={image} modalData={modalData} {...register("coverImage")} />
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام</label>
                            <input type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.firstName} className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }}
                                {...register("firstName", {
                                    required: " فیلد را پر کنید"
                                })} />
                            {errors.firstName && <p style={{ color: "red", fontSize: "12px" }}>{errors.firstName.message}</p>}
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="lastName" className="opacity-70 text-sm mb-1">نام خانوادگی</label>
                            <input type="text" name="lastName" id="lastName" defaultValue={(modalData.id) && modalData.original.lastName} className="p-2 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} {...register("lastName", {
                                required: "فیلد را پر کنید"
                            })} />
                            {errors.lastName && <p style={{ color: "red", fontSize: "12px" }}>{errors.lastName.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                            <textarea type="text" name="desc" id="desc" defaultValue={(modalData.id) && modalData.original.description} className="p-4 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }}  {...register("description")} />
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