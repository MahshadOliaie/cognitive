import { useState } from "react"


function CommentTextTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <div className="relative flex items-center">
            <div className="relative flex overflow-hidden" style={{ flex: "8" }}>
                <div className="flex items-center justify-start flex-nowrap" style={{ width: "10rem" }} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue()}</p>
                </div>

            </div>
            {(props.getValue().length > 30) &&
                <p className="flex-1 left-0">...</p>
            }
            {(showFullName && (props.getValue().length > 30)) && <div className="absolute right-full bg-white rounded-md shadow-sm p-3 z-30 top-0 w-max max-w-64"><p>{props.getValue()}</p></div>}
        </div>
    )
}
export default CommentTextTd