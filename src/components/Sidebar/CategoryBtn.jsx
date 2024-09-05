import { useState } from "react"
import { useNavigate } from "react-router-dom"


function CategoryBtn() {
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
            <h2 className="cursor-pointer relative font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/categories')} style={(location.pathname == ("/categories")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={(location.pathname == ("/categories")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" /></svg>
                <p className="text-white bg-sandals p-1 rounded-md absolute right-full mr-2" style={(isHover) ? { display: "inline-block" } : { display: "none" }}>دسته‌بندی</p>
            </h2>
        </>
    )
}

export default CategoryBtn