import { useEffect, useState } from "react"
import BookCard from "../../BookCard/BookCard"
import useFetch from "../../../hooks/useFetch"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"

function BooksPage() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const books = useFetch('/books.json')

    useEffect(() => {
        setData(books)
        setFilteredData(books)

        return () => {

        }

    }, [books])

    return (
        <>
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar setFilteredData={setFilteredData} data={data}/>
            </div>
            <div className="flex flex-col gap-6 py-7">
                {filteredData.map(book => {
                    return <BookCard key={book.id} data={book} />
                })}
            </div>
        </>
    )
}

export default BooksPage