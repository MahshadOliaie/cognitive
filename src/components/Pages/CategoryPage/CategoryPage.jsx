import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import CategoryModal from "../../Modals/CategoryModal"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableRow from "../../TableRow/TableRow"
import TableHeader from "../../TableHeader/TableHeader"
import CategoryPagination from "./CategoryPagination"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import TOKEN from "../../../../public/token"
import EditBtn from "../../Buttons/EditBtn"
import SelectBtn from "../../Buttons/SelectBtn"
import SelectedCounter from "../../SelectedCounter/SelectedCounter"
import jalaliMoment from 'jalali-moment';



function CategoryPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const [editModal, setEditModal] = useState({})
    const [properties, setProperties] = useState('')
    const [selectedItems, setSelectedItems] = useState([])
    const [filteredList, setFilteredList] = useState({
        "enable": "",
    })


    const categoryData = useFetch('https://cogcenter.ir/library/api/v1/categories')


    async function putData(data, enableState) {
        const { coverImage, scopeId, id, title } = data

        let newData = {coverImage , enable: enableState , scopeId , id , title}

        fetch(`https://cogcenter.ir/library/api/v1/manager/0/categories/${data.id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'content-type': "application/json",
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: JSON.stringify(newData)
        });
        await setSelectedItems([])
        setTimeout(() => { window.location.reload() }, 300)

    }

    useEffect(() => {

        setData(categoryData)

        return () => {

        }
    }, [categoryData])

    useEffect(() => {
        fetch(`https://cogcenter.ir/library/api/v1/categories${properties}`, {
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
            .then(result => setData(result.content))

    }, [properties])



    useEffect(() => {
        setProperties(`?enable=${filteredList.enable}`)
    }, [filteredList])



    const columns = [
        {
            accessorKey: "id",
            header: "",
            size: 10,
            cell: (props) => <SelectBtn setSelectedItems={setSelectedItems} selectedItems={selectedItems} bookData={props.row.original} />
        },
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 80,
            cell: (props) => <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" className="m-auto cursor-pointer" style={{ maxHeight: "32px" }} />
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
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
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
        setFilteredList(data)
    }

    return (
        <>
            {(isModalOpen) && <CategoryModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <form className="flex items-center gap-4">
                    <select name="enable" id="enable" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("enable")}>
                        <option value="">وضعیت</option>
                        <option value="true">فعال</option>
                        <option value="false">غیرفعال</option>
                    </select>
                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
                <AddBtn onClick={openModal} />
            </div>

            {(selectedItems.length > 0) &&
                <SelectedCounter selectedItems={selectedItems} putData={putData} />
            }

            <table className="w-full relative border-collapse mt-10">
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                        return <TableHeaderItem header={header} key={index} />
                    })}
                </TableHeader>



                <tbody>
                    {table.getRowModel().rows.map((row, index) =>
                        <TableRow key={index} selected={(selectedItems.includes(row.original))}>
                            {
                                row.getVisibleCells().map((cell, index) =>
                                    <td key={index} width={cell.column.getSize()}>
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
            <CategoryPagination table={table} />
        </>
    )
}

export default CategoryPage