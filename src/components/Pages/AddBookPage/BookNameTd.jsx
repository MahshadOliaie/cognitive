import { useState } from "react"


function BookNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <>
            <div className="relative">
                <div className="overflow-x-scroll flex items-center justify-start flex-nowrap max-w-14 m-auto" onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue()}</p>
                </div>
                {(showFullName) && <div className="absolute top-full bg-white rounded-md shadow-sm p-3 z-30"><p className="text-nowrap">{props.getValue()}</p></div>}
            </div>
        </>
    )
}

export default BookNameTd