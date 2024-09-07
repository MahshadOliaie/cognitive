import { useState } from "react"


function BookNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <>
            <div className="relative flex">
                <div className="overflow-x-scroll flex items-center justify-start flex-nowrap max-w-16 m-auto" onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}>
                    <p className="text-nowrap">{props.getValue()}</p>
                </div>
                {(props.getValue().length > 10) &&
                    <p>...</p>
                }
                {(showFullName && (props.getValue().length > 10)) && <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-30"><p className="text-nowrap">{props.getValue()}</p></div>}
            </div>
        </>
    )
}

export default BookNameTd