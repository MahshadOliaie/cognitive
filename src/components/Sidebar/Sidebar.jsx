import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '/logoCognitiv.png'
import collapseLogo from '/brain.png'


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


                <div className="bg-sand fixed right-0 top-0 w-max h-full p-2 z-50 shadow-lg flex flex-col justify-between items-center py-16 duration-300">
                    <div className="flex flex-col justify-center gap-3">
                        <div className="rounded-full w-10 h-10 bg-sandals overflow-hidden flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/')} style={(location.pathname == ("/")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={(location.pathname == ("/")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                        </h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/addBook')} style={(location.pathname == ("/addBook")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill={(location.pathname == ("/addBook")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                        </h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/categories')} style={(location.pathname == ("/categories")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={(location.pathname == ("/categories")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" /></svg>
                        </h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/authors')} style={(location.pathname == ("/authors")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={(location.pathname == ("/authors")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.7-9.2L288 94.6z" /></svg>
                        </h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/publishers')} style={(location.pathname == ("/publishers")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill={(location.pathname == ("/publishers")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" /></svg>
                        </h2>
                        <h2 className="cursor-pointer font-medium hover:scale-105 duration-200 hover:duration-200 aspect-square flex items-center justify-center" onClick={() => nav('/comments')} style={(location.pathname == ("/comments")) ? { backgroundColor: "#D1BAA7", padding: "10px 9px", borderRadius: "1000px" } : {}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={(location.pathname == ("/comments")) ? "#FFFFFF" : "#D1BAA7"} className="w-5"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                        </h2>
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