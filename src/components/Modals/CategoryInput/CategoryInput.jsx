import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"


function CategoryInput({ modalData, setCategoryValue }) {
    const [data, setData] = useState([])
    const categories = useFetch('/category.json')


    useEffect(() => {
        setData(categories)

        return () => {

        }

    }, [categories])

    function handleChange() {
        setCategoryValue(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="category" className="opacity-70 text-sm mb-1">ژانر</label>
                <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="category" id="category" defaultValue={(modalData.id) && modalData.original.category.title} onChange={handleChange}>
                    {(modalData.id) ?
                        <option value={modalData.original.category.id}>{modalData.original.category.title}</option>
                        :
                        <option value="default">انتخاب کنید</option>
                    }
                    {data.map(category => {
                        return <option value={category.id} key={category.id}>{category.title}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default CategoryInput