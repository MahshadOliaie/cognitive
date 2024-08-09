import { useEffect, useState } from "react"
import CategoryCard from "../../CategoryCard/CategoryCard"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"


function CategoryPage() {
    const [categoryData, setCategoryData] = useState([])
    const [filteredData , setFilteredData] = useState([])

    const data = useFetch('/category.json')

    useEffect(() => {

        setCategoryData(data)
        setFilteredData(data)

        return () => {

        }
    }, [data])


    return (
        <>
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar setFilteredData={setFilteredData} data={categoryData} page="category" />
                <AddBtn />
            </div>
            <div className="flex flex-wrap justify-center gap-7 gap-y-8 pt-11">
                {filteredData.map(category => {
                    return <CategoryCard key={category.id} category={category} />
                })}

            </div>
        </>
    )
}

export default CategoryPage