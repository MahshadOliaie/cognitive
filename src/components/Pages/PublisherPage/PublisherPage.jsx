import { useEffect, useState } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import PublisherModal from "../../Modals/PublisherModal"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import TOKEN from "../../../../public/token"
import EditBtn from "../../Buttons/EditBtn"
import SelectBtn from "../../Buttons/SelectBtn"
import SelectedCounter from "../../SelectedCounter/SelectedCounter"
import jalaliMoment from 'jalali-moment';
import Select from 'react-select'
import CategoryTitleTd from "../CategoryPage/CategoryTitleTd"



function PublisherPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [sort, setSort] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const { register, handleSubmit , setValue } = useForm()
    const [isEnableFloat, setIsEnableFloat] = useState(false)
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10&sort=${sort}`)
    const [filteredList, setFilteredList] = useState({
        "name": "",
        "enable": "",
    })


    async function putData(data, enableState) {
        const { id, name, coverImage } = data

        let newData = { coverImage, id, name, enable: enableState }

        fetch(`https://cogcenter.ir/library/api/v1/manager/0/publishers/${data.id}`, {
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
        fetch(`https://cogcenter.ir/library/api/v1/publishers${properties}`, {
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
            .then(result => { setData(result.content); setPages(result.totalPages) })

    }, [properties])



    useEffect(() => {
        setProperties(`?name=${filteredList.name}&enable=${(filteredList.enable === undefined)? "" : filteredList.enable}&page=${currentPage}&size=10&sort=${sort}`)
    }, [filteredList, currentPage , sort])



    const columns = [
        {
            accessorKey: "id",
            header: "",
            size: 10,
            enableSorting: false,
            cell: (props) => <SelectBtn setSelectedItems={setSelectedItems} selectedItems={selectedItems} bookData={props.row.original} />
        },
        {
            accessorKey: "id",
            header: "ID",
            size: 30,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 50,
            enableSorting: false,
            cell: (props) => <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" className="m-auto cursor-pointer" style={{ maxHeight: "32px" }} />
        },
        {
            accessorKey: "name",
            header: "نام",
            size: 300,
            cell: (props) => <CategoryTitleTd props={props}/>
        },
        {
            accessorKey: "createdAt",
            header: "تاریخ ثبت",
            size: 80,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            size: 80,
            enableSorting: false,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                const persianDate = jalaliMoment(date, 'MM/DD/YYYY').format('jYYYY/jMM/jDD')
                return <p>{(props.getValue()) ? persianDate : "-"}</p>
            }
        },
        {
            accessorKey: "enable",
            header: "وضعیت",
            size: 50,
            cell: (props) => <p>{(props.getValue()) ? "فعال" : "غیرفعال"}</p>
        },
        {
            accessorKey: "",
            header: "ویرایش",
            size: 40,
            enableSorting: false,
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
        setCurrentPage(0)
        setFilteredList(data)
    }

    register("enable")

    function handleEnableChange(selectedOption) {
        setValue("enable", selectedOption.value)

        if (selectedOption) {
            setIsEnableFloat(true)
        }
        else
            setIsEnableFloat(false)
    }

    return (
        <>
            {(isModalOpen) && <PublisherModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <form className="flex items-end gap-4">
                    <div className="form-group w-44">
                        <input type="text" id="name" placeholder="ناشر" className="searchInput" {...register("name")} />
                        <label htmlFor="name" className="searchLabel">ناشر</label>
                    </div>
                    <div>
                        <div className="flex flex-col flex-1 w-44">
                            {(isEnableFloat) &&
                                <label htmlFor="enable" className="opacity-70 text-sm mb-1">وضعیت</label>
                            }
                            <Select options={[{ value: "", label: "همه" }, { value: true, label: "فعال" }, { value: false, label: "غیرفعال" }]} onChange={handleEnableChange} placeholder="وضعیت" />
                        </div>
                    </div>
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
                        return <TableHeaderItem header={header} setSort={setSort} key={index} />
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
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default PublisherPage