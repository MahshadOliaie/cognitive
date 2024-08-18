import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import SearchBar from "../../SearchBar/SearchBar"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import AuthorModal from "../../Modals/AuthorModal"
import Filter from "../../Filter/Filter"



function AuthorPage() {

    const [data, setData] = useState([])
    const authors = useFetch('/authors.json')
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})



    useEffect(() => {
        setData(authors)

        return () => {

        }

    }, [authors])


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
            accessorKey: "firstName",
            header: "نام",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "lastName",
            header: "نام خانوادگی",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "createAt",
            header: "ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{date}</p>
            }
        }, {
            accessorKey: "updateAt",
            header: "آخرین ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{date}</p>
            }
        },
        {
            accessorKey: "type",
            header: "نوع",
            cell: (props) => <p>{(props.getValue())}</p>
        },
        {
            accessorKey: "enable",
            header: "وضعیت",
            cell: (props) => <p>{(props.getValue()) ? "فعال" : "غیرفعال"}</p>
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

    let authorsFullName = data.map(author => {
        return { "fullName" : author.firstName + " " + author.lastName}
    })


    return (
        <>
            {(isModalOpen) && <AuthorModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Filter title={"نام نویسنده"} totalData={authorsFullName} filterTitle={"fullName"} />
                    <Filter title={"نوع نویسنده"} totalData={data} filterTitle={"type"} />
                    <Filter title={"وضعیت"} totalData={data} filterTitle={"enable"} />
                </div>
                <AddBtn onClick={openModal} />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 10px" }}>

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
                                    <td className="py-6" key={cell.id} width={cell.column.getSize()}>
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
            <Pagination table={table} />
        </>
    )
}

export default AuthorPage