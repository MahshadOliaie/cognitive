

import { useState } from "react"
import { useNavigate } from "react-router-dom"


function BookformBtn() {
    const nav = useNavigate()
    const [isHover, setIsHover] = useState(false)

    function handleHover() {
        setIsHover(true)
    }

    function handleUnHover() {
        setIsHover(false)
    }

    return (
        <>
            <h2 className="cursor-pointer relative font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/bookForm')} style={(location.pathname == ("/bookForm")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={(location.pathname == ("/bookForm")) ? "#FFFFFF" : "#D1BAA7"} className="w-5" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
                <p className="text-white bg-sandals p-1 rounded-md absolute right-full mr-2 text-nowrap" style={(isHover) ? { display: "inline-block" } : { display: "none" }}>افزودن کتاب</p>
            </h2>
        </>
    )
}

export default BookformBtn