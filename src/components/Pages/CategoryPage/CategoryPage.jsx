import { useEffect, useState } from "react"
import CategoryCard from "../../CategoryCard/CategoryCard"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"
import CategoryModal from "../../Modals/CategoryModal"


function CategoryPage() {
    const [categoryData, setCategoryData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const data = useFetch('/category.json')

    useEffect(() => {

        setCategoryData(data)
        setFilteredData(data)

        return () => {

        }
    }, [data])

    function openModal() {
        setIsModalOpen(true)
    }


    return (
        <>
            {(isModalOpen) && <CategoryModal setIsModalOpen={setIsModalOpen} />}
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar setFilteredData={setFilteredData} data={categoryData} page="category" />
                <AddBtn onClick={openModal} />
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