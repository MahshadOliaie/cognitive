import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import CommentEditModal from "./CommentEditModal"
import Pagination from "../../Pagination/Pagination"
import CommentsReplyModal from "./CommentsReplyModal"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import TOKEN from "../../../../public/token"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableHeader from "../../TableHeader/TableHeader"
import SettingBtn from "../../Buttons/SettingBtn"
import ReplyBtn from "../../Buttons/ReplyBtn"
import CommentTextTd from "./CommentTextTd"
import jalaliMoment from 'jalali-moment';
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from 'react-select'
import ShowRepliesBtn from "../../Buttons/ShowRepliesBtn"
import { useNavigate } from "react-router-dom"





function CommentsPage() {
    const nav = useNavigate()
    const [data, setData] = useState([])
    const [toVal, setToVal] = useState("")
    const [fromVal, setFromVal] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const { register, handleSubmit, setValue } = useForm()
    const [pages, setPages] = useState(0)
    const [sort, setSort] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [fromDateFloat, setFromDateFloat] = useState(false)
    const [toDateFloat, setToDateFloat] = useState(false)
    const [isPublishFloat, setIsPublishFloat] = useState(false)
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10&sort=${sort}`)
    const [filteredList, setFilteredList] = useState({
        "publish": "",
        "id": "",
        "from": "",
        "to": "",
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
        setProperties(`?modelTypeId=${filteredList.id}&publish=${(filteredList.publish !== undefined) ? filteredList.publish : ""}&from=${filteredList.from || ""}&to=${filteredList.to || ""}&page=${currentPage}&size=10&sort=${sort}`)
    }, [filteredList, currentPage, sort])



    function goToBookData(id) {

        fetch(`https://cogcenter.ir/library/api/v1/scope/0/books/${id}`)
            .then(res => res.json())
            .then(data => nav("/bookForm", { state: data }))

    }

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.userImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 70,
            enableSorting: false,
            cell: (props) =>
                <div className="rounded-full flex-shrink-0 w-12 h-12 overflow-hidden flex justify-center bg-sandals m-auto">
                    {(props.row.original.userImage) ?
                        <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                    }
                </div>
        },
        {
            accessorKey: "userName",
            header: "نام کاربری",
            size: 100,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "text",
            header: "متن کامنت",
            enableSorting: false,
            cell: (props) => <CommentTextTd props={props} />
        },
        {
            accessorKey: "modelType.id",
            header: "آیدی کتاب",
            size: 60,
            enableSorting: false,
            cell: (props) => <p className="hover:underline cursor-pointer" onClick={() => { goToBookData(props.getValue()) }}>{props.getValue()}</p>
        },
        {
            accessorKey: "createdAt",
            header: "تاریخ ثبت",
            size: 100,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        },
        {
            accessorKey: "publishAt",
            header: "تاریخ انتشار",
            size: 100,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        },
        {
            accessorKey: "publish",
            header: "انتشار",
            size: 55,
            cell: (props) => (props.getValue()) ?
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#77bb41" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                :
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e32400" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        },
        {
            accessorKey: "unPublishReason",
            header: "علت عدم انتشار",
            enableSorting: false,
            cell: (props) => (props.getValue() && !props.row.original.publish) && <CommentTextTd props={props} />
        },
        {
            accessorKey: "feedbackStats.reaction",
            header: "بازخورد‌ها",
            size: 70,
            enableSorting: false,
            cell: (props) => <div className="flex gap-4 justify-center">
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(props.getValue()?.LIKE) ? (props.getValue()?.LIKE.count) : 0}</p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(props.getValue()?.DISLIKE) ? (props.getValue()?.DISLIKE.count) : 0}</p>
            </div>
        },
        {
            accessorKey: "",
            header: "فعالیت‌ها",
            size: 100,
            enableSorting: false,
            cell: (props) => {
                return <div className="flex gap-3 justify-center">
                    <SettingBtn onClick={() => openModal(props.row.original)} />
                    <ReplyBtn onClick={() => openReply(props.row.original)} />
                    <ShowRepliesBtn props={props} />

                </div>
            }
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })


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

    register("from")
    register("to")
    register("publish")

    function getFrom(date) {
        if (date) {
            let persianD = jalaliMoment(date._i, 'YYYY-MM-DD---').format('YYYY-MM-DD')
            setValue("to", persianD)
            setFromDateFloat(true)
        }
        else {
            setValue("to", "")
            setFromDateFloat(false)
        }
        setFromVal(date)
    }

    function getTo(date) {
        if (date) {
            let persianD = jalaliMoment(date._i, 'YYYY-MM-DD---').format('YYYY-MM-DD')
            setValue("from", persianD)
            setToDateFloat(true)
        }
        else {
            setValue("from", "")
            setToDateFloat(false)
        }
        setToVal(date)

    }


    function handlePublishChange(selectedOption) {
        setValue("publish", selectedOption.value)

        if (selectedOption) {
            setIsPublishFloat(true)
        }
        else
            setIsPublishFloat(false)
    }





    return (
        <>
            {(isModalOpen) && <CommentEditModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} currentPage={currentPage} />}
            {(isReplyOpen) && <CommentsReplyModal setIsReplyOpen={setIsReplyOpen} modalData={editModal} setEditModal={setEditModal} />}

            <div className="flex justify-between px-4">
                <form className="flex items-end gap-4">
                    <div className="form-group w-44">
                        <input type="text" id="postId" className="searchInput" placeholder="آیدی کتاب" {...register("id")} />
                        <label htmlFor="postId" className="searchLabel"> آیدی کتاب</label>
                    </div>

                    <div className="flex flex-col relative">
                        {(toDateFloat) &&
                            <>
                                <label htmlFor="" className="opacity-70 text-sm mb-1">از تاریخ:</label>
                            </>

                        }
                        <div className="flex items-center justify-start overflow-hidden">
                            <InputDatePicker value={toVal} onChange={getTo} />
                            {(!toDateFloat) && <p className="absolute opacity-50 pr-3 pointer-events-none">از تاریخ</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        {(fromDateFloat) &&
                            <>
                                <label htmlFor="" className="opacity-70 text-sm mb-1">تا تاریخ:</label>
                            </>
                        }
                        <div className="flex items-center justify-start overflow-hidden">
                            <InputDatePicker value={fromVal} onChange={getFrom} />
                            {(!fromDateFloat) &&
                                <p className="absolute opacity-50 pr-3 pointer-events-none">تا تاریخ</p>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col flex-1 w-44">
                            {(isPublishFloat) &&
                                <label htmlFor="publish" className="opacity-70 text-sm mb-1">وضعیت انتشار</label>
                            }
                            <Select options={[{ value: "", label: "همه" }, { value: true, label: "منتشر شده" }, { value: false, label: "لغو انتشار" }]} onChange={handlePublishChange} placeholder="وضعیت انتشار" />
                        </div>
                    </div>
                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
            </div>

            <table className="w-full relative border-collapse mt-10">
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                        return <TableHeaderItem header={header} setSort={setSort} key={index} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map((row, index) =>
                        <tr className="bg-sand text-center" key={index}>
                            {
                                row.getVisibleCells().map((cell, index) =>
                                    <td key={index} width={cell.column.getSize()}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </td>
                                )
                            }
                        </tr>
                    )}
                </tbody>

            </table>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        </>
    )
}

export default CommentsPage