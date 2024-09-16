import { useState } from "react"


function PublisherTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)

    return (
        <div className="relative flex items-center">
            <div className="relative flex overflow-hidden" style={{flex: "8"}}>
                <div className="flex items-center justify-start flex-nowrap" style={{width: "3.5rem"}} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue().name}</p>
                </div>

            </div>
            {(props.getValue().name.length > 14) &&
                <p className="flex-1 left-0">...</p>
            }
            {(showFullName && (props.getValue().name.length > 14)) && <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-30 top-0"><p className="text-nowrap">{props.getValue().name}</p></div>}
        </div>
    )
}

export default PublisherTd