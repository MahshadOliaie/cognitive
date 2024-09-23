import { useState } from "react"


function AuthorsNameTd({ props }) {
    const [showFullName, setShowFullName] = useState(false)
    return (
        <div className="relative flex items-center">
            {(props.getValue()[0]) ?
                <>
                    <div className="relative flex overflow-hidden" style={{ flex: "8" }}>
                        <div className="flex items-center justify-start flex-nowrap" style={{ maxWidth: "3rem" }} onMouseEnter={() => setShowFullName(true)} onMouseLeave={() => setShowFullName(false)}><p className="text-nowrap">{props.getValue()[0].firstName + " " + props.getValue()[0].lastName}{(props.getValue().length > 1) && "، " + props.getValue()[1].firstName + " " + props.getValue()[1].lastName}</p>
                        </div>

                    </div>
                    {((props.getValue()[0].firstName.length) + (props.getValue()[0].lastName.length) > 11 || props.getValue().length > 1) &&
                        <p className="left-0 flex-1">...</p>
                    }
                    {(showFullName && ((props.getValue()[0].firstName.length) + (props.getValue()[0].lastName.length) > 11 || props.getValue().length > 1)) &&
                        <div className="absolute right-24 bg-white rounded-md shadow-sm p-3 z-30 w-max max-w-2xl" style={{ display: "flex", alignItems: "center", top: "0" }}>
                            {props.getValue().map((author, index) => {
                                return <p key={author.id}>{(index > 0) && "، "}{author.firstName + " " + author.lastName}</p>
                            })}
                        </div>}
                </>
                :
                <p className="m-auto">-</p>
                }
        </div>
    )
}

export default AuthorsNameTd