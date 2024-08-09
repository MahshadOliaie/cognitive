import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import SearchBar from "../../SearchBar/SearchBar"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"


function PublisherPage() {
    const [data, setData] = useState([])
    const publishers = useFetch('/publishers.json')
    const [columnFilters, setColumnFilters] = useState([])

    useEffect(() => {
        setData(publishers)
    }, [publishers])


    const columns = [
        {
            accessorKey: "id",
            header: "شماره",
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
            columnFilters
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <>
            <div className="flex items-center justify-between px-4">
                <SearchBar columnFilters={columnFilters} setColumnFilters={setColumnFilters} title="name" />
                <AddBtn />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 20px" }}>
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                         let filterList = table.getRowModel().rows.map(row => {
                            return row.original[header.id]
                        })
                        return <TableHeaderItem header={header} filterList={filterList} />
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
        </>
    )
}

export default PublisherPage