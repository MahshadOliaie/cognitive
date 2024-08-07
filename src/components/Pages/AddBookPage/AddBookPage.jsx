
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import DATA from "../../../../public/object"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"

function AddBookPage() {
    const [data, setData] = useState(DATA)

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
            size: 90,
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
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 20px" }}>

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        return <th className="py-10" width={header.getSize()} key={header.id}>{header.column.columnDef.header}</th>
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map(row => <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell =>
                            <td className="py-9" key={cell.id} width={cell.column.getSize()}>
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