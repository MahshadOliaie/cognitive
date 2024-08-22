import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'


function CategoryInput({ modalData, setCategoryValue }) {
    const categories = useFetch('https://cogcenter.ir/library/api/v1/categories')
    const [options , setOptions] = useState([])


    useEffect(() => {
        categories.map(category => {
            setOptions((prev) => [...prev , {value: category.id , label:category.title}])
        })

        console.log(options)
        return () => {

        }

    }, [categories])

    function handleChange(selectedOption) {
        setCategoryValue(selectedOption.value)
        console.log(selectedOption)
    }


    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="category" className="opacity-70 text-sm mb-1">ژانر</label>
                <Select options={options} onChange={handleChange} placeholder="انتخاب کنید" />
            </div>
        </>
    )
}

export default CategoryInput