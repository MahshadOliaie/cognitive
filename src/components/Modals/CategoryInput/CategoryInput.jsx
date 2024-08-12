import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"


function CategoryInput() {
    const [data, setData] = useState([])
    const categories = useFetch('/category.json')


    useEffect(() => {
        setData(categories)

        return () => {

        }

    }, [categories])

    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="category" className="opacity-70 text-sm mb-1">ژانر</label>
                <select className="p-2 rounded-md shadow-inner focus-visible:border-2 border-dark outline-none" name="category" id="category">
                    <option value="default">انتخاب کنید</option>
                    {data.map(category => {
                        return <option value={category.id} key={category.id}>{category.title}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default CategoryInput