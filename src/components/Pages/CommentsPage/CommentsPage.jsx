import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentsCard from "../../CommentsCard/CommentsCard"
import CustomSearchBar from "../../CustomSearchBar/CustomSearchBar"
import CommentEditModal from "./CommentEditModal"



function CommentsPage() {
    const [filteredData, setFilteredData] = useState([])
    const [posts, setPosts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})

    const comments = useFetch('/comments.json')

    useEffect(() => {
        setFilteredData(comments)
        getPostNumbers(comments)

        return () => {

        }

    }, [comments])

    function openModal(comment) {
        setIsModalOpen(true)
        setEditModal(comment)
    }


    function getPostNumbers(comments) {
        let postsArray = []

        comments.map(comment => {
            if (!postsArray.includes(comment.postId))
                postsArray.push(comment.postId)
        })

        setPosts(postsArray)

    }





    return (
        <>
            {(isModalOpen) && <CommentEditModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <CustomSearchBar data={comments} setFilteredData={setFilteredData} page="comments" />

            </div>
            <div className="flex flex-col gap-3 pt-11">

                {comments.map(comment => {
                    return <CommentsCard key={comment.id} comment={comment} onClick={() => openModal(comment)}/>
                })}

            </div>
        </>
    )
}

export default CommentsPage