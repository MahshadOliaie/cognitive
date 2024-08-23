import { useForm } from "react-hook-form"
import ModalHeader from "../../Modals/ModalHeader/ModalHeader"
import EditDoneBtn from "../../Modals/Btns/EditDoneBtn"
import CancelBtn from "../../Modals/Btns/CancelBtn"


function CommentsReplyModal({ setIsReplyOpen, modalData, setEditModal }) {
    const { register, handleSubmit, formState: { errors } } = useForm()


    function handleClose() {
        setIsReplyOpen(false)
        setEditModal({})
    }

    function submit(data) {
        console.log(data)
        setIsReplyOpen(false)
    }


    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                    <form className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                        <ModalHeader title={"پاسخ به کامنت"} id={modalData.id} />
                        <div className="flex flex-col">
                            <label htmlFor="reply" className="opacity-70 text-sm mb-1">جواب</label>
                            <textarea className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="reply" id="reply" defaultValue={modalData.replies[0]} {...register("reply")} />
                            {errors.reply && <p style={{ color: "red", fontSize: "12px" }}>{errors.reply.message}</p>}
                        </div>

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
export default CommentsReplyModal