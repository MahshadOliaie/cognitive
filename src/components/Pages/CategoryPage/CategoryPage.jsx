import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import CategoryModal from "../../Modals/CategoryModal"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import SearchBar from "../../SearchBar/SearchBar"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableRow from "../../TableRow/TableRow"
import Pagination from "../../Pagination/Pagination"
import TableHeader from "../../TableHeader/TableHeader"


function CategoryPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const categoryData = useFetch('/category.json')

    useEffect(() => {

        setData(categoryData)

        return () => {

        }
    }, [categoryData])


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "coverImage",
            header: "عکس",
            cell: (props) => <img src={props.getValue()} alt="" className="w-11 m-auto hover:scale-150 duration-500 cursor-pointer" />
        },
        {
            accessorKey: "title",
            header: "عنوان",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "createdAt",
            header: "تاریخ ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{date}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{date}</p>
            }
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

    return (
        <>
            {(isModalOpen) && <CategoryModal setIsModalOpen={setIsModalOpen} />}
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

export default CategoryPage