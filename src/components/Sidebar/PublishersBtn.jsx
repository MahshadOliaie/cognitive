import { useState } from "react"
import { useNavigate } from "react-router-dom"


function PublishersBtn() {
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
            <h2 className="cursor-pointer relative font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/publishers')} style={(location.pathname == ("/publishers")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill={(location.pathname == ("/publishers")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" /></svg>
                <p className="text-white bg-sandals p-1 rounded-md absolute right-full mr-2" style={(isHover) ? { display: "inline-block" } : { display: "none" }}>ناشران</p>

            </h2>
        </>
    )
}

export default PublishersBtn