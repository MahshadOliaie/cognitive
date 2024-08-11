import { useEffect, useState } from "react"
import BookCard from "../../BookCard/BookCard"
import useFetch from "../../../hooks/useFetch"

function BooksPage() {
    const [data, setData] = useState([])
    const books = useFetch('/books.json')

    useEffect(() => {
        setData(books)

        return () => {

        }

    }, [books])

    return (
        <div className="flex flex-col gap-6">
            {data.map(book => {
                return <BookCard key={book.id} data={book} />
            })}
        </div>
    )
}

export default BooksPage