
import { useEffect, useState } from "react"


function FileInput({ modalData, register }) {
    const [value, setValue] = useState((modalData.id) ? modalData.original.coverImage : false)



    function handleChange() {
        setValue(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center bg-sand py-3 rounded-md shadow-inner max-w-52">
                {(value) ?
                    <label htmlFor="image" > <img src={value} className="w-20 cursor-pointer" /></label>
                    :
                    <label htmlFor="image" className="cursor-pointer opacity-70 text-sm p-5">انتخاب عکس</label>
                }
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" style={{ display: "none" }}{...register("bookImage")} onChange={handleChange} />
            </div>

        </>
    )
}

export default FileInput