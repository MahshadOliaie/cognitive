import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"



function AuthorPage() {

    const [data, setData] = useState([])
    const authors = useFetch('/authors.json')


    useEffect(() => {
        setData(authors)

        return () => {

        }

    }, [authors])


    const columns = [
        {
            accessorKey: "id",
            header: "شماره",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
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

export default AuthorPage