import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentsCard from "../../CommentsCard/CommentsCard"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"


function CommentsPage() {
    const [data, setData] = useState([])
    const [filteredData , setFilteredData] = useState([])

    const comments = useFetch('https://jsonplaceholder.typicode.com/comments')

    useEffect(() => {
        setData(comments)
        setFilteredData(comments)

        return () => {

        }

    }, [comments])

    return (
        <>
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar data={comments} setFilteredData={setFilteredData}  page="comments" />
            </div>
            <div className="flex flex-col gap-6 pt-11">

                {filteredData.map(comment => {
                    return <CommentsCard key={comment.id} comment={comment} />
                })}

            </div>
        </>
    )
}

export default CommentsPage