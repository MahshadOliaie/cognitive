import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import ModalHeader from "./ModalHeader/ModalHeader"
import CancelBtn from "./Btns/CancelBtn"
import EnableCheckbox from "./EnableCheckbox/EnableCheckbox"
import AddDoneBtn from "./Btns/AddDoneBtn"
import EditDoneBtn from "./Btns/EditDoneBtn"
import { useForm } from "react-hook-form"
import FileInput from "./FileInput/FileInput"


function CategoryModal({ setIsModalOpen, modalData, setEditModal }) {
    const [lastId, setLastId] = useState(0)
    const [enable, setEnable] = useState((modalData.id) ? modalData.original.enable : false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()


    const data = useFetch('/category.json')

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

    register("id")
    register("scopeId")


    setValue("enable", enable)
    setValue("scopeId", 0)
    setValue("id", (modalData.id) ? (modalData.original.id) : lastId + 1)



    function putData(data) {
        console.log(data)
    }

    async function postData(data) {
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


    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <ModalHeader title={(modalData.id) ? "ویرایش کتگوری" : 'افزودن کتگوری'} id={(modalData.id) ? modalData.original.id : lastId + 1} />


                    <form className="flex flex-col gap-6 py-5 pb-7" style={{ minWidth: "450px" }}>
                        <FileInput modalData={modalData} register={register} />
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">عنوان کتگوری</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" defaultValue={(modalData.id) && modalData.original.title} {...register("title", {
                                required: "فیلد را پر کنید"
                            })} />
                            {errors.title && <p style={{ color: "red", fontSize: "12px" }}>{errors.title.message}</p>}

                        </div>

                        <div className="flex items-center gap-2">
                            <EnableCheckbox enable={enable} setEnable={setEnable} {...register("enable")} />
                            <label htmlFor="enable" className="opacity-70 text-sm">فعال کردن</label>
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

export default CategoryModal