
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import useFetch from "../../../hooks/useFetch"
import BookModal from "../../Modals/BookModal"
import Filter from "../../Filter/Filter"

function AddBookPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [filteredList, setFilteredList] = useState({
        "name": [],
        "public": [],
        "publish": [],
        "title":[],
        "fullName":[],
        "publicationYear": [],
    })

    const books = useFetch('https://cogcenter.ir/library/api/v1/manager/0/books?page=0&size=10')

    useEffect(() => {
        setData(books.content)

        return () => {

        }

    }, [books])


    function openModal() {
        setIsModalOpen(true)
    }


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 40,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "coverImage",
            header: "عکس",
            cell: (props) => <img src={props.getValue()} alt="" className="w-11 m-auto hover:scale-150 duration-500 cursor-pointer" />
        },
        {
            accessorKey: "name",
            header: "نام کتاب",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "authors",
            header: "نویسنده ها",
            cell: (props) => <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {props.getValue().map(author => {
                    return <p key={author.id}>{author.firstName + " " + author.lastName}</p>
                })}
            </div>
        },
        {
            accessorKey: "publish",
            header: "انتشار",
            cell: (props) => (props.getValue()) ?
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#77bb41" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                :
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e32400" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        },
        {
            accessorKey: "publisher.name",
            header: "ناشر",
            cell: (props) => <p>{props.getValue()}</p>
        },
        
        {
            accessorKey: "publicationYear",
            header: "سال",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "pageNumber",
            header: "صفحات",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "category",
            header: "ژانر",
            cell: (props) => <p>{props.getValue().title}</p>
        },
        {
            accessorKey: "feedbackStats.commentCount",
            header: "کامنت‌ها",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "downloadCount",
            header: "دانلود",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "feedbackStats.rating.average",
            header: "امتیاز",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "public",
            header: "دسترسی",
            cell: (props) => <p>{(props.getValue()) ? "عمومی" : "خصوصی"}</p>
        },
        {
            accessorKey: "createdAt",
            header: "ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue())? date : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue())? date : "-"}</p>
            }
        },

        {
            accessorKey: "feedbackStats.reaction",
            header: "",
            cell: (props) => <div className="flex gap-4 flex-col">
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#96d35f" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(props.getValue().LIKE)?(props.getValue().LIKE.count) : 0}</p>
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e32400" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(props.getValue().DISLIKE)?(props.getValue().DISLIKE.count) : 0}</p>
            </div>
        }
    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: filtering,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setFiltering,
        getPaginationRowModel: getPaginationRowModel(),

    })

    let authorsFullName = []
    data?.map(book => {
        book.authors.map(author => {
            authorsFullName.push({ "fullName": author.firstName + " " + author.lastName })
        })
    })

    let genres = data?.map(book => {
        return book.category
    })

    return (
        <>
            {(isModalOpen) && <BookModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex justify-between px-4">
                <div className="flex items-center gap-4 flex-wrap max-w-5xl">
                    <Filter title={"نام کتاب"} totalData={data} filterTitle={"name"} filteredList={filteredList} setFilteredList={setFilteredList} />
                    <Filter title={"نام نویسنده"} totalData={authorsFullName} filterTitle={"fullName"} filteredList={filteredList} setFilteredList={setFilteredList} />
                    <Filter title={"ژانر"} totalData={genres} filterTitle={"title"} filteredList={filteredList} setFilteredList={setFilteredList} />
                    <Filter title={"سال انتشار"} totalData={data} filterTitle={"publicationYear"} filteredList={filteredList} setFilteredList={setFilteredList} />
                    <Filter title={"وضعیت انتشار"} totalData={data} filterTitle={"publish"} filteredList={filteredList} setFilteredList={setFilteredList} />
                    <Filter title={"سطح دسترسی"} totalData={data} filterTitle={"public"} filteredList={filteredList} setFilteredList={setFilteredList} />

                </div>
                <AddBtn onClick={openModal} />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 10px" }}>

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        return <TableHeaderItem header={header} key={header.id} />
                    })}
                </TableHeader>

                <tbody style={{ fontSize: "14px" }}>
                    {table.getRowModel().rows.map(row => <TableRow key={row.id} modalData={row} setEditModal={setEditModal} openModal={openModal} >
                        {row.getVisibleCells().map((cell, index) =>
                            <td className="py-2" key={index} width={cell.column.getSize()}>
                                {
                                    flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )
                                }
                            </td>
                        )}
                    </TableRow>)}
                </tbody>
            </table>
            <Pagination table={table} />
        </>
    )
}

export default AddBookPage