
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import DATA from "../../../../public/object"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import SearchBar from "../../SearchBar/SearchBar"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"

function AddBookPage() {
    const [data, setData] = useState(DATA)
    const [columnFilters, setColumnFilters] = useState([])



    const columns = [
        {
            accessorKey: "id",
            header: "شماره",
            size: 70,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "title",
            header: "نام کتاب",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "author",
            header: "نام نویسنده",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "published_date",
            header: "تاریخ انتشار",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "language",
            header: "زبان",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "genre",
            header: "ژانر",
            cell: (props) => <p>{props.getValue()}</p>
        }
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
                <SearchBar columnFilters={columnFilters} setColumnFilters={setColumnFilters} title="title" />
                <AddBtn />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 20px" }}>

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        let filterList = table.getRowModel().rows.map(row => {
                            return row.original[header.id]
                        })
                        return <TableHeaderItem header={header} filterList={filterList} key={header.id} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map(row => <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell =>
                            <td className="py-6" key={cell.id} width={cell.column.getSize()}>
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
        </>
    )
}

export default AddBookPage