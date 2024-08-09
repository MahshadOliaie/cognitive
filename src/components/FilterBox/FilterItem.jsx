import { useState } from "react"


function FilterItem({ item }) {
    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <p className="text-base font-normal hover:bg-linen p-6 py-2 cursor-pointer" style={(isActive) ? { backgroundColor: "#D1BAA7" } : {}} onClick={() => { setIsActive((prev) => !prev) }}>{item}</p>
        </>
    )
}

export default FilterItem