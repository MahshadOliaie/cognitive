import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []


function CategoryInput({ modalData, setCategoryValue, multi }) {
    const categories = useFetch('https://cogcenter.ir/library/api/v1/categories')
    const [options, setOptions] = useState([])

    useEffect(() => {
        categories.map(category => {
            setOptions((prev) => [...prev, { value: category.id, label: category.title }])
        })

        console.log(options)
        return () => {

        }

    }, [categories])

    function handleChange(selectedOption) {
        if (multi) {
            arr = []
            selectedOption.map(item => {
                arr.push(item.value)
            })
            console.log(arr)
            setCategoryValue(arr)
        }
        else {
            console.log(selectedOption)
            setCategoryValue(selectedOption.value)
        }

    }


    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="category" className="opacity-70 text-sm mb-1">دسته بندی</label>
                <Select options={options} onChange={handleChange} placeholder="انتخاب کنید" isMulti={multi} defaultInputValue={(modalData.id) ? modalData.original.category.title : ""} />
            </div>
        </>
    )
}

export default CategoryInput