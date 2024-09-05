import { useState } from "react"


function AuthorsNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <>
            <div className="relative">
                <div className="overflow-x-scroll flex items-center justify-start flex-nowrap max-w-16 m-auto" onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue()[0].firstName + " " + props.getValue()[0].lastName}</p>
                </div>
                {(showFullName) && <div className="absolute top-full bg-white rounded-md shadow-sm p-3 z-30" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {props.getValue().map(author => {
                        return <p className="text-nowrap" key={author.id}>{author.firstName + " " + author.lastName}</p>
                    })}
                </div>}
            </div>
        </>
    )
}

export default AuthorsNameTd