import { useEffect, useState } from "react"
import CategoryCard from "../../CategoryCard/CategoryCard"
import useFetch from "../../../hooks/useFetch"


function CategoryPage() {
    const [categoryData, setCategoryData] = useState([])

    const data = useFetch('/category.json')

    useEffect(() => {

        setCategoryData(data)

        return () => {

        }
    }, [data])


    return (
        <div className="flex flex-wrap justify-center gap-7 gap-y-8">
            {categoryData.map(category => {
                return <CategoryCard key={category.id} category={category} />
            })}

        </div>
    )
}

export default CategoryPage