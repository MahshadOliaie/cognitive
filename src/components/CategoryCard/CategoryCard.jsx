import { useState } from "react"
import DeleteBtn from "../Buttons/DeleteBtn"
import EditBtn from "../Buttons/EditBtn"


function CategoryCard({ category }) {
    const { title, children } = category

    const [openSub, setOpenSub] = useState(false)

    function handleOpen() {
        setOpenSub((prev) => !prev)
    }

    return (
        <div className="flex flex-col" style={{ width: "31%" }}>
            <div className="categoryContainer flex items-center justify-between p-8 relative rounded-xl shadow-lg bg-sand" style={(children.length > 0) ? { cursor: "pointer" } : {}} >
                <EditBtn />
                <p className="text-lg font-semibold">{title}</p>
                <DeleteBtn />

                {(children.length > 0) ?
                    (openSub) ?
                        <div className="moreBtn w-10 h-10 flex items-center justify-center absolute -bottom-4 shadow-md p-3 rounded-full bg-sandals cursor-pointer hover:scale-105 duration-150" style={{ left: "calc(50% - 1.25rem)" }} onClick={handleOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512" style={{ rotate: "180deg", transition: "300ms" }}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </div>
                        :
                        <div className="moreBtn w-10 h-10 flex items-center justify-center absolute -bottom-2 shadow-md p-3 rounded-full bg-sandals cursor-pointer hover:scale-105 duration-150 opacity-0" style={{ left: "calc(50% - 1.25rem)" }} onClick={handleOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512" style={{ transition: "300ms" }}><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </div>
                    :
                    <></>
                }
            </div>

            {(openSub) && children.map(sub => {
                return <div className="flex items-center justify-center mb-0.5 p-4 rounded-lg shadow-lg bg-sand" >
                    <p className="text-md font-medium">{sub}</p>
                </div>
            })}

        </div>

    )
}

export default CategoryCard