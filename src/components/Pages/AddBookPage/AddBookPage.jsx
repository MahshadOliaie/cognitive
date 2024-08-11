
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import SearchBar from "../../SearchBar/SearchBar"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import useFetch from "../../../hooks/useFetch"

function AddBookPage() {
    const [data, setData] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [filtering, setFiltering] = useState("")

    const books = useFetch('/books.json')

    useEffect(() => {
        setData(books)
    }, [books])


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "name",
            header: "نام کتاب",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "authors",
            header: "نام نویسنده",
            cell: (props) => <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {props.getValue().map(author => {
                    return <p>{author.firstName + author.lastName}</p>
                })}
            </div>
        },
        {
            accessorKey: "publisher",
            header: "ناشر",
            cell: (props) => <p>{props.getValue().name}</p>
        },
        {
            accessorKey: "publicationYear",
            header: "سال انتشار",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "pageNumber",
            header: "صفحات",
            size: 100,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "category",
            header: "ژانر",
            cell: (props) => <p>{props.getValue().title}</p>
        },
        {
            accessorKey: "feedbackStats",
            header: "",
            size: 100,
            cell: (props) => <div className="flex gap-4 flex-col">
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-6 opacity-80 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#96d35f" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {props.getValue().reaction.LIKE.count}</p>
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-6 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e32400" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {props.getValue().reaction.DISLIKE.count}</p>
            </div>
        }
    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter: filtering,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setFiltering,
        getPaginationRowModel: getPaginationRowModel(),

    })



    return (
        <>
            <div className="flex items-center justify-between px-4">
                <SearchBar filtering={filtering} setFiltering={setFiltering} />
                <AddBtn />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 20px" }}>

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        let filterList = data.map(obj => {
                            return obj[header.id]
                        })
                        return <TableHeaderItem header={header} filterList={filterList} key={header.id} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
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
            <Pagination table={table} />
        </>
    )
}

export default AddBookPage