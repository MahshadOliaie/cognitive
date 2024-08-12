import CancelBtn from "./Btns/CancelBtn"
import CheckBox from "./Checkbox/CheckBox"

function BookModal({ setIsModalOpen }) {

    function handleClose() {
        setIsModalOpen(false)
    }

    return (
        <div className="flex items-center justify-center top-0 right-0 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.1)", backdropFilter: "blur(3px)" }}>
            <div className="shadow-md rounded-lg p-10 pt-0 bg-linen" >
                <div className="flex items-center justify-between py-5 mb-4" style={{ borderBottom: "0.5px solid gray" }}>
                    <p className="text-xl font-bold text-dark">افزودن کتاب</p>
                    <p className="text-lg font-bold text-dark"><span className="text-base font-normal">ID: </span>3</p>
                </div>
                <div className="flex flex-col gap-6" style={{ minWidth: "450px" }}>
                    <div className="flex gap-5 items-end">
                        <div className="flex flex-col flex-1 items-center justify-center bg-sand py-3 rounded-md shadow-inner">
                            <label htmlFor="image" className=" cursor-pointer opacity-70 text-sm p-5">انتخاب عکس</label>
                            <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }} />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="name" id="name" />
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="pages" className="opacity-70 text-sm mb-1">تعداد صفحات</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="pages" id="pages" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="category" className="opacity-70 text-sm mb-1">ژانر</label>
                            <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="category" id="category">
                                <option value="default">انتخاب کنید</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="authors" className="opacity-70 text-sm mb-1">نویسندگان</label>
                        <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="authors" id="authors">
                            <option value="default">انتخاب کنید</option>
                        </select>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                            <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="publisher" id="publisher">
                                <option value="default">انتخاب کنید</option>
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="year" className="opacity-70 text-sm mb-1">سال انتشار</label>
                            <input className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="number" name="year" id="year" />
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="desc" className="opacity-70 text-sm mb-1">توضیحات</label>
                        <input className="p-4 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" type="text" name="desc" id="desc" />
                    </div>

                    <div className="flex justify-between px-5 pb-5">
                        <div className="flex items-center gap-2">
                            <label htmlFor="publish" className="opacity-70 text-sm mb-1"> منتشر کردن</label>
                            <CheckBox />

                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="public" className="opacity-70 text-sm mb-1">عمومی</label>
                            <CheckBox />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-5">
                    <button type="submit" className="flex-1 p-2 bg-ocean rounded-md shadow-md hover:scale-105 duration-150">افزودن</button>
                    <CancelBtn handleClose={handleClose} />
                </div>
            </div>
        </div>
    )
}


export default BookModal