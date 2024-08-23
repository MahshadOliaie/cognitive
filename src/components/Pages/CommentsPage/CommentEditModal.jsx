import { useState } from "react"
import CancelBtn from "../../Modals/Btns/CancelBtn"
import EditDoneBtn from "../../Modals/Btns/EditDoneBtn"
import CheckBox from "../../Modals/Checkbox/CheckBox"
import ModalHeader from "../../Modals/ModalHeader/ModalHeader"
import { useForm } from "react-hook-form"


function CommentEditModal({ setIsModalOpen, modalData, setEditModal }) {
    const [isPublish, setIsPublish] = useState((modalData) ? modalData.publish : false)
    const { register, handleSubmit, formState: { errors }, unregister } = useForm()


    function handleClose() {
        setIsModalOpen(false)
        setEditModal({})
    }

    function handlePublish() {
        setIsPublish((prev) => !prev)
        unregister("reason")
    }

    function submit(data) {
        console.log(data)
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <form className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                        <ModalHeader title={"تنظیمات کامنت"} id={modalData.id} />

                        <div className="flex gap-5 items-end">
                            <div className="flex flex-col flex-1">
                                <p className="opacity-70 text-sm mb-1">متن کامنت: </p>
                                <p>{modalData.text}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="reply" className="opacity-70 text-sm mb-1">جواب</label>
                            <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="reply" id="reply" defaultValue={modalData.replies[0]} {...register("reply")} />
                            {errors.reply && <p style={{ color: "red", fontSize: "12px" }}>{errors.reply.message}</p>}
                        </div>


                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm">انتشار</label>
                            <CheckBox isActive={isPublish} onClick={handlePublish} />

                        </div>

                        {(!isPublish) &&
                            <div className="flex flex-col my-5 ">
                                <label htmlFor="desc" className="opacity-70 text-sm mb-1">دلیل لغو انتشار</label>
                                <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" defaultValue={modalData.unPublishReason} {...register("reason", {
                                    required: "فیلد را پر کنید"
                                })} />
                                {errors.reason && <p style={{ color: "red", fontSize: "12px" }}>{errors.reason.message}</p>}
                            </div>

                        }

                    </form>

                    <div className="flex justify-between gap-5 mt-5">
                        <EditDoneBtn onClick={handleSubmit(submit)} />
                        <CancelBtn handleClose={handleClose} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default CommentEditModal