import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentsCard from "../../CommentsCard/CommentsCard"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"
import Pagination from "../../Pagination/Pagination"


function CommentsPage() {
    const [filteredData, setFilteredData] = useState([])
    const [posts, setPosts] = useState([])

    const comments = useFetch('https://jsonplaceholder.typicode.com/comments')

    useEffect(() => {
        setFilteredData(comments)
        getPostNumbers(comments)

        return () => {

        }

    }, [comments])


    function getPostNumbers(comments) {
        let postsArray = []

        comments.map(comment => {
            if (!postsArray.includes(comment.postId))
                postsArray.push(comment.postId)
        })

        setPosts(postsArray)

    }




    function handleFilter() {
        let filteredPosts = comments.filter(comment => comment.postId == event.target.value)
        setFilteredData(filteredPosts)

        if (event.target.value == "default")
            setFilteredData(comments)
    }

    return (
        <>
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar data={comments} setFilteredData={setFilteredData} page="comments" />
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none" className="absolute w-4 opacity-30 top-3 right-5 ">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <select className="bg-sand px-8 py-3 pr-10 rounded-full w-30 focus-visible:outline-sandals" onChange={handleFilter}>
                        <option value="default">فیلتر</option>
                        {posts?.map(post => {
                            return <option value={post} key={post}>پست {post}</option>
                        })}
                    </select>
                </div>
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