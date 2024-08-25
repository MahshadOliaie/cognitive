import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentsCard from "../../CommentsCard/CommentsCard"
import CommentEditModal from "./CommentEditModal"
import Pagination from "../../Pagination/Pagination"
import CommentsReplyModal from "./CommentsReplyModal"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import TOKEN from "../../../../public/token"



function CommentsPage() {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const { register, handleSubmit } = useForm()
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10`)
    const [filteredList, setFilteredList] = useState({
        "publish": "",
        "id": "",
        "page": currentPage
    })
    

    const comments = useFetch(`https://cogcenter.ir/feedback/api/v1/manager/0/comments${properties}`)

    useEffect(() => {
        setData(comments.content)

        return () => {

        }
    }, [comments])

    useEffect(() => {
        fetch(`https://cogcenter.ir/feedback/api/v1/manager/0/comments${properties}`, {
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            }

        })
            .then(res => res.json())
            .then(result => { setData(result.content); setPages(result.totalPages) })

    }, [properties])



    useEffect(() => {
        console.log(filteredList)
        setProperties(`?modelTypeId=${filteredList.id}&page=${currentPage}&size=10`)
    }, [filteredList, currentPage])


    function openModal(comment) {
        setIsModalOpen(true)
        setEditModal(comment)
    }

    function openReply(comment) {
        setIsReplyOpen(true)
        setEditModal(comment)
    }

    function submit(data) {
        setCurrentPage(0)
        setFilteredList(data)
    }


    return (
        <>
            {(isModalOpen) && <CommentEditModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} currentPage={currentPage} />}
            {(isReplyOpen) && <CommentsReplyModal setIsReplyOpen={setIsReplyOpen} modalData={editModal} setEditModal={setEditModal} />}

            <div className="flex justify-between px-4">
                <form className="flex items-end gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="postId" className="opacity-70 text-sm mb-1">شماره پست</label>
                        <input type="text" id="postId" className="p-1.5 px-5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("id")} />
                    </div>
                    <select name="publish" id="enable" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("publish")}>
                        <option value="">وضعیت انتشار</option>
                        <option value="true">منتشر شده</option>
                        <option value="false">لغو انتشار</option>
                    </select>
                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
            </div>
            <div className="flex flex-col gap-3 pt-11">

                {data?.map(comment => {
                    return <CommentsCard key={comment.id} comment={comment} onClick={() => openModal(comment)} reply={() => openReply(comment)} />
                })}

            </div>

            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        </>
    )
}

export default CommentsPage