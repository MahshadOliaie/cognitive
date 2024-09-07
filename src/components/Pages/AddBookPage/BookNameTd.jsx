import { useState } from "react"


function BookNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <div className="relative">
            <div className="relative flex overflow-hidden">
                <div className="flex items-center justify-start flex-nowrap max-w-16" style={(props.getValue().length > 10) ? { maxWidth: "4.9rem", overflow: "hidden" } : {}} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}>
                    <p className="text-nowrap">{props.getValue()}</p>
                </div>
                {(props.getValue().length > 10) &&
                    <p className="absolute left-0">...</p>
                }
            </div>
            {(showFullName && (props.getValue().length > 10)) && <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-40" style={{top: "0"}}><p className="text-nowrap">{props.getValue()}</p></div>}
        </div>
    )
}

export default BookNameTd