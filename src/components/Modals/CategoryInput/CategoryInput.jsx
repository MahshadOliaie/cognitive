import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []


function CategoryInput({ modalData, setCategoryValue, categoryValue, multi, floatAlways }) {
    const categories = useFetch('https://cogcenter.ir/library/api/v1/categories')
    const [isFloat, setIsFloat] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        categories.map(category => {
            setOptions((prev) => [...prev, { value: category.id, label: category.title }])
        })

        return () => {

        }

    }, [categories])

    function handleChange(selectedOption) {
        if (multi) {
            arr = []
            selectedOption.map(item => {
                arr.push(item.value)
            })
            setCategoryValue(arr)
        }
        else {
            setCategoryValue(selectedOption.value)
        }

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
    }




    return (
        <>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="category" className="opacity-70 text-sm mb-1">دسته بندی</label>
                    }
                    {(categoryValue?.length > 0) &&
                        <p className="ml-2 text-sm">{categoryValue.length} مورد</p>
                    }
                </div>
                <Select options={options} styles={style} onChange={handleChange} placeholder={(floatAlways) ? "" : "دسته بندی"} isMulti={multi} defaultInputValue={(modalData.original) ? modalData.original.category.title : ""} />
            </div>
        </>
    )
}

export default CategoryInput