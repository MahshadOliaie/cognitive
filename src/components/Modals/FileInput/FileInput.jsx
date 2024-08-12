import { flattenBy } from "@tanstack/react-table"
import { useState } from "react"


function FileInput() {
    const [value , setValue] = useState(false)


    function handleChange(){
        setValue(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center bg-sand py-3 rounded-md shadow-inner max-w-52">
                <label htmlFor="image" className=" cursor-pointer opacity-70 text-sm p-5">{(value)? value : "انتخاب عکس"}</label>
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }} onChange={handleChange} />
            </div>

        </>
    )
}

export default FileInput