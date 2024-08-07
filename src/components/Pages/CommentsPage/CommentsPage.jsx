import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentsCard from "../../CommentsCard/CommentsCard"


function CommentsPage() {
    const [data, setData] = useState([])

    const comments = useFetch('https://jsonplaceholder.typicode.com/comments')

    useEffect(() => {
        setData(comments)

        return () => {

        }

    }, [comments])

    return (
        <div className="flex flex-col gap-6">

            {data.map(comment => {
                return <CommentsCard key={comment.id} comment={comment} />
            })}

        </div>
    )
}

export default CommentsPage