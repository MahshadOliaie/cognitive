import { useState } from "react"
import { useNavigate } from "react-router-dom"


function BooksBtn() {
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
            <h2 className="cursor-pointer relative font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/addBook')} style={(location.pathname == ("/addBook")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill={(location.pathname == ("/addBook")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                <p className="text-white bg-sandals p-1 rounded-md absolute right-full mr-2" style={(isHover) ? { display: "inline-block" } : { display: "none" }}>کتاب‌ها</p>
            </h2>
        </>
    )
}

export default BooksBtn