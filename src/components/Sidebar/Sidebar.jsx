import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '/logoCognitiv.png'


function Sidebar({ setTitle }) {
    let obj = {
        "/": "داشبورد",
        "/categories": "مدیریت کتگوری‌ها",
        "/books": "لیست کتاب‌ها",
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
            <div className="bg-sand fixed right-0 top-0 w-56 h-full z-50 shadow-lg flex flex-col justify-between items-center py-16">
                <div className="flex flex-col justify-center gap-3">
                    <div className="rounded-full w-24 h-24 bg-sandals"></div>
                    <h1 className="font-bold text-xl text-sandals">مهشاد علیایی</h1>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/')} style={(location.pathname == ("/")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>داشبورد</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/books')} style={(location.pathname == ("/books")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>لیست کتاب‌ها</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/addBook')} style={(location.pathname == ("/addBook")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>افزودن کتاب</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/categories')} style={(location.pathname == ("/categories")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت کتگوری‌ها</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/authors')} style={(location.pathname == ("/authors")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت نویسندگان</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/publishers')} style={(location.pathname == ("/publishers")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت ناشران</h2>
                    <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200" onClick={() => nav('/comments')} style={(location.pathname == ("/comments")) ? { backgroundColor: "#84664B", color: "white", padding: "5px 20px", borderRadius: "1000px" } : {}}>مدیریت کامنت‌ها</h2>
                </div>


                <img src={logo} alt="" className="w-2/4"/>


            </div>
        </>
    )
}

export default Sidebar;