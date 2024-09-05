import { useForm } from "react-hook-form"
import ModalHeader from "../../Modals/ModalHeader/ModalHeader"
import EditDoneBtn from "../../Modals/Btns/EditDoneBtn"
import CancelBtn from "../../Modals/Btns/CancelBtn"
import { useEffect, useRef } from "react"
import TOKEN from "../../../../public/token"


function CommentsReplyModal({ setIsReplyOpen, modalData, setEditModal }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const ref = useRef()
    const containerRef = useRef()


    useEffect(() => {

        function clickHandler() {
            if (!ref.current.contains(event.target) && event.target == containerRef.current) {
                setIsReplyOpen(false)
            }
        }

        document.addEventListener("click", clickHandler)

        return () => {
            document.removeEventListener("click", clickHandler)
        }
    }, [])


    function handleClose() {
        setIsReplyOpen(false)
        setEditModal({})
    }

    async function submit(data) {
        fetch(`https://cogcenter.ir/feedback/api/v1/comments/${modalData.id}/reply`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        await setIsReplyOpen(false)
    }


    return (
        <>
            <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }} ref={containerRef}>
                <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" ref={ref}>
                    <form className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                        <ModalHeader title={"پاسخ به کامنت"} id={modalData.id} />
                        <div className="flex flex-col">
                            <label htmlFor="reply" className="opacity-70 text-sm mb-1">جواب</label>
                            <textarea className="p-4 border rounded-md shadow-inner" style={{ borderColor: "lightgray" }} type="text" name="reply" id="reply" defaultValue={modalData.replies[0]?.text} {...register("text", {
                                required: "فیلد را پر کنید"
                            })} />
                            {errors.text && <p style={{ color: "red", fontSize: "12px" }}>{errors.text.message}</p>}
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