import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '/logoCognitiv.png'


function Sidebar({ setTitle }) {
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

    return (
        <>
            <div className="bg-sand fixed right-0 top-0 w-52 h-full z-50 shadow-lg flex flex-col justify-between items-center py-16">
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


            </div>
        </>
    )
}

export default Sidebar;