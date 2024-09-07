import { useState } from "react"


function AuthorsNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <>
            <div className="relative flex">
                <div className="overflow-x-scroll flex items-center justify-start flex-nowrap m-auto" style={{ maxWidth: "4.1rem" }} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue()[0].firstName + " " + props.getValue()[0].lastName}</p>
                </div>
                {((props.getValue()[0].firstName.length) + (props.getValue()[0].lastName.length) > 10 || props.getValue().length > 1) &&
                    <p>...</p>
                }
                {(showFullName && ((props.getValue()[0].firstName.length) + (props.getValue()[0].lastName.length) > 10 || props.getValue().length > 1)) &&
                    <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-30" style={{ display: "flex", alignItems: "center" }}>
                        {props.getValue().map((author, index) => {
                            return <p className="text-nowrap" key={author.id}>{(index > 0) && "، "}{author.firstName + " " + author.lastName}</p>
                        })}
                    </div>}
            </div>
        </>
    )
}

export default AuthorsNameTd