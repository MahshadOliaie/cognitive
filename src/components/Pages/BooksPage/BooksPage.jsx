import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import DATA from "../../../../public/object"

function BooksPage() {

    const [data, setData] = useState(DATA)

    const columns = [
        {
            accessorKey: "id",
            header: "شماره کتاب",
            size: 50,
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
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <table width={table.getTotalSize()}>
                <thead>
                    <tr>
                        {table.getHeaderGroups()[0].headers.map(header => {
                            return <th width={header.getSize()} key={header.id}>{header.column.columnDef.header}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => <tr key={row.id}>
                        {row.getVisibleCells().map(cell =>
                            <td key={cell.id} width={cell.column.getSize()}>
                                {
                                    flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )
                                }
                            </td>
                        )}
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default BooksPage