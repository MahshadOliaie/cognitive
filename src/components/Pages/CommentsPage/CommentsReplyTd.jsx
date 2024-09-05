import { useState } from "react"
import RepliesModal from "./RepliesModal"


function CommentsReplyTd({ props }) {
    const [show, setShow] = useState(false)
    return (
        <>
            <p className="hover:underline text-sm opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShow(true)}>نمایش</p>
            {(show) && <RepliesModal props={props} setShow={setShow} />}
        </>
    )
}

export default CommentsReplyTd