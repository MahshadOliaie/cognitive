import { useState } from "react"


function BookNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <div className="relative flex items-center">
            <div className="relative flex overflow-hidden" style={{flex: "15"}}>
                <div className="flex items-center justify-start flex-nowrap" style={{maxWidth: "3rem"}} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}>
                    <p className="text-nowrap">{props.getValue()}</p>
                </div>

            </div>
            {(props.getValue().length > 10) &&
                <p className="flex-1 left-0">...</p>
            }
            {(showFullName && (props.getValue().length > 10)) && <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-40" style={{ top: "0" }}><p className="text-nowrap">{props.getValue()}</p></div>}
        </div>
    )
}

export default BookNameTd