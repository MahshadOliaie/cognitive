import { useEffect, useRef, useState } from "react"
import checkSvg from '/check.svg'


function FilterItems({ title, filterTitle, filteredList, setFilteredList }) {
    const [selected, setSelected] = useState(false)

    const ref = useRef()

    let obj = {
        "public": {
            true: "عمومی",
            false: "خصوصی"
        },
        "publish": {
            true: "منتشر شده",
            false: "لغو انتشار"
        },
        "enable": {
            true: "فعال",
            false: "غیر فعال"
        }
    }

    useEffect(() => {
        if (selected) {
            setFilteredList((prev) => ({ ...prev, [filterTitle]: [...prev[filterTitle], ref.current.textContent] }))
        }
        else {
            setFilteredList((prev) => ({ ...prev, [filterTitle]: [...prev[filterTitle].filter(item => item !== ref.current.textContent)] }))
        }

    }, [selected])

    function handleClick() {
        setSelected(prev => !prev)

    }


    return (
        <>
            <div className='flex gap-2 items-center cursor-pointer' onClick={handleClick}>
                <div className='w-4 h-4 rounded-md flex items-center justify-center p-0.5' style={(selected) ? { backgroundColor: "black" } : { border: "1px solid gray" }}>
                    <img src={checkSvg} alt="" />
                </div>
                <p style={{ fontSize: "15px" }} ref={ref}>{(filterTitle === "public" || filterTitle === "publish" || filterTitle === "enable") ? obj[filterTitle][title] : title}</p>
            </div>
        </>
    )
}

export default FilterItems