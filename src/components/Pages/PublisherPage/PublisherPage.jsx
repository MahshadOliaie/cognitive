import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import SearchBar from "../../SearchBar/SearchBar"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import PublisherModal from "../../Modals/PublisherModal"


function PublisherPage() {
    const [data, setData] = useState([])
    const publishers = useFetch('/publishers.json')
    const [columnFilters, setColumnFilters] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        setData(publishers)
    }, [publishers])


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "name",
            header: "نام",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "createAt",
            header: "تاریخ ثبت",
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

    ]


    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
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


    return (
        <>
            {(isModalOpen) && <PublisherModal setIsModalOpen={setIsModalOpen} />}
            <div className="flex items-center justify-between px-4">
                <SearchBar filtering={filtering} setFiltering={setFiltering} />
                <AddBtn onClick={openModal} />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 10px" }}>
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        let filterList = data.map(obj => {
                            return obj[header.id]
                        })
                        return <TableHeaderItem header={header} key={header.id} filterList={filterList} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map(row =>
                        <TableRow key={row.id}>
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

export default PublisherPage