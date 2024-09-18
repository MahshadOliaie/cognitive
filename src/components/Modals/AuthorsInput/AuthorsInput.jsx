import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []


function AuthorsInput({ modalData, setAuthorValue, floatAlways, authorValue }) {

    const authors = useFetch('https://cogcenter.ir/library/api/v1/authors?page=0')
    const [isFloat, setIsFloat] = useState(false)
    const [options, setOptions] = useState([])


    useEffect(() => {
        (authors.content)?.map(author => {
            setOptions((prev) => [...prev, { value: author.id, label: `${author.firstName + " " + author.lastName}` }])
        })


    }, [authors])


    function handleChange(selectedOption) {
        arr = []
        selectedOption.map(item => {
            arr.push(item.value)
        })
        setAuthorValue(arr)
        if (selectedOption.length > 0) {
            setIsFloat(true)
        }
        else
            setIsFloat(false)
    }

    const style = {
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: "40px",
            overflow: "scroll !important"
        }),
        multiValue: (provide) => ({
            ...provide,
            '&>div:hover': {
                textOverflow: "inherit"
            },
        })
    }



    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="authors" className="opacity-70 text-sm mb-1">نویسندگان</label>
                    }
                    {(authorValue?.length > 0) &&
                        <p className="ml-2 text-sm">{authorValue.length} مورد</p>
                    }
                </div>
                <Select styles={style} options={options} onChange={handleChange} placeholder={(floatAlways) ? "" : "نویسندگان"} isMulti defaultValue={modalData.original?.authors.map(author => { return { label: `${author.firstName + " " + author.lastName}`, value: author.id } })} />
            </div>

        </>
    )
}

export default AuthorsInput