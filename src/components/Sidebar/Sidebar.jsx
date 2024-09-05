import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '/logoCognitiv.png'
import collapseLogo from '/brain.png'
import DashboardBtn from "./DashboardBtn";
import BooksBtn from "./BooksBtn";
import CategoryBtn from "./CategoryBtn";
import AuthorsBtn from "./AuthorsBtn";
import PublishersBtn from "./PublishersBtn";
import CommentsBtn from "./CommentsBtn";


function Sidebar({ setTitle }) {
    const [isOpen, setIsOpen] = useState(true)
    let obj = {
        "/": "داشبورد",
        "/categories": "مدیریت دسته‌ بندی",
        "/addBook": "افزودن کتاب",
        "/publishers": "مدیریت ناشران",
        "/authors": "مدیریت نویسندگان",
        "/comments": "مدیریت کامنت‌ها"
    }

    useEffect(() => {
        setTitle(obj[location.pathname])
    }, [location.pathname])

    const nav = useNavigate();

    function handleClose() {
        setIsOpen(false)
        document.body.style.paddingRight = "7rem"
        document.getElementById("myHeader").style.paddingRight = "7rem"
    }

    function handleOpen() {
        setIsOpen(true)
        document.body.style.paddingRight = "16rem"
        document.getElementById("myHeader").style.paddingRight = ""
    }

    function hoverHandler() {
        console.log(event.target)
    }

    return (
        <>

            {(isOpen) ?
                <div className="bg-sand fixed right-0 top-0 w-52 h-full z-50 shadow-lg flex flex-col justify-between items-center py-16 duration-300">
                    <div className="flex flex-col justify-center gap-3">
                        <div className="rounded-full w-24 h-24 bg-sandals overflow-hidden flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                        </div>
                        <h1 className="font-bold text-xl text-dark">مهشاد علیایی</h1>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/')} style={(location.pathname == ("/")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>داشبورد</h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/addBook')} style={(location.pathname == ("/addBook")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>افزودن کتاب</h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/categories')} style={(location.pathname == ("/categories")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت دسته‌ بندی</h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/authors')} style={(location.pathname == ("/authors")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت نویسندگان</h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/publishers')} style={(location.pathname == ("/publishers")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت ناشران</h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/comments')} style={(location.pathname == ("/comments")) ? { backgroundColor: "#D1BAA7", color: "#101321", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت کامنت‌ها</h2>
                    </div>


                    <img src={logo} alt="" className="w-2/4" />

                    <div className="absolute top-3 -left-7 p-2 bg-linen rounded-sm shadow-sm cursor-pointer" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 hover:scale-110 duration-300 rotate-180" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </div>

                </div>

                :

                <div className="bg-sand fixed right-0 top-0 w-16 h-full p-2 z-50 shadow-lg flex flex-col justify-between items-center py-16 duration-300">
                    <div className="flex flex-col justify-center gap-3">
                        <div className="rounded-full w-10 h-10 bg-sandals overflow-hidden flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <DashboardBtn />
                        <BooksBtn />
                        <CategoryBtn />
                        <AuthorsBtn />
                        <PublishersBtn />
                        <CommentsBtn />
                    </div>


                    <img src={collapseLogo} alt="" className="w-2/4" />

                    <div className="absolute top-3 -left-7 p-2 bg-linen rounded-sm shadow-sm cursor-pointer" onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 hover:scale-110 duration-300 " viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </div>
                </div>
            }



        </>
    )
}

export default Sidebar;