import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import PublisherModal from "../../Modals/PublisherModal"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import TOKEN from "../../../../public/token"
import EditBtn from "../../Buttons/EditBtn"


function PublisherPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)
    const { register, handleSubmit } = useForm()
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10`)
    const [filteredList, setFilteredList] = useState({
        "name": "",
        "enable": "",
    })


    const publishers = useFetch(`https://cogcenter.ir/library/api/v1/publishers${properties}`)

    useEffect(() => {
        setData(publishers.content)
        setPages(publishers.totalPages)

    }, [publishers])



    useEffect(() => {
        fetch(`https://cogcenter.ir/library/api/v1/publishers${properties}`, {
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
        setProperties(`?name=${filteredList.name}&enable=${filteredList.enable}&page=${currentPage}&size=10`)
    }, [filteredList, currentPage])



    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
            header: "عکس",
            cell: (props) => <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" className="m-auto cursor-pointer" style={{ maxHeight: "32px" }} />
        },
        {
            accessorKey: "name",
            header: "نام",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "createdAt",
            header: "تاریخ ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        },
        {
            accessorKey: "enable",
            header: "وضعیت",
            cell: (props) => <p>{(props.getValue()) ? "فعال" : "غیرفعال"}</p>
        },
        {
            accessorKey: "",
            header: "ویرایش",
            size: 60,
            cell: (props) => {
                return <EditBtn setEditModal={setEditModal} modalData={props.row} openModal={openModal} />
            }
        },

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
        getPaginationRowModel: getPaginationRowModel()
    })


    function openModal() {
        setIsModalOpen(true)
    }


    function submit(data) {
        setCurrentPage(0)
        setFilteredList(data)
    }


    return (
        <>
            {(isModalOpen) && <PublisherModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <form className="flex items-end gap-4">
                    <div className="form-group">
                        <input type="text" id="name" placeholder="ناشر" className="searchInput" {...register("name")} />
                        <label htmlFor="name" className="searchLabel">ناشر</label>
                    </div>
                    <select name="enable" id="enable" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("enable")}>
                        <option value="">وضعیت</option>
                        <option value="true">فعال</option>
                        <option value="false">غیرفعال</option>
                    </select>
                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
                <AddBtn onClick={openModal} />
            </div>
            <table className="w-full relative border-collapse mt-10">
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        return <TableHeaderItem header={header} key={header.id} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map(row =>
                        <TableRow key={row.id} modalData={row} setEditModal={setEditModal} openModal={openModal}>
                            {
                                row.getVisibleCells().map(cell =>
                                    <td key={cell.id} width={cell.column.getSize()}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </td>
                                )
                            }
                        </TableRow>
                    )}
                </tbody>

            </table>
            <Pagination pages={publishers.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default PublisherPage