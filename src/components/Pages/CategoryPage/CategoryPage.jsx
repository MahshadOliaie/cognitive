import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import AddBtn from "../../Buttons/AddBtn"
import CategoryModal from "../../Modals/CategoryModal"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableRow from "../../TableRow/TableRow"
import TableHeader from "../../TableHeader/TableHeader"
import Filter from "../../Filter/Filter"
import CategoryPagination from "./CategoryPagination"


function CategoryPage() {
    const [data, setData] = useState([])
    const [filtering, setFiltering] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [properties, setProperties] = useState('')
    const [filteredList, setFilteredList] = useState({
        "enable": ""
    })


    const categoryData = useFetch('https://cogcenter.ir/library/api/v1/categories')


    useEffect(() => {

        setData(categoryData)

        return () => {

        }
    }, [categoryData])

    useEffect(() => {
        fetch(`https://cogcenter.ir/library/api/v1/categories${properties}`, {
            headers: {
                'accept': '*/*',
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6NywiZmlyc3ROYW1lIjoiYWxpIiwibGFzdE5hbWUiOiJlc21haWxpIiwidXNlckltYWdlIjoiMzg1NjZiNTMtMzY0MS00YzkzLWI4OWEtMTRkY2Y0NDRmNmIxIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiIsIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXSwiYXV0aG9yaXRpZXMiOnsiMCI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdLCIxIjpbIk9QX0FERF9VUERBVEVfQ0FURUdPUlkiLCJPUF9BRERfVVBEQVRFX1RPUElDIiwiT1BfUkVBRCIsIk9QX0NPTU1FTlRfUkVQT1JUIiwiT1BfQVVUSE9SU19SRVBPUlQiLCJPUF9UT1BJQ19NRVNTQUdFX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUk9MRSIsIk9QX1BVQkxJU0hfVU5QVUJMSVNIX05FV1MiLCJPUF9BRERfVVBEQVRFX0FVVEhPUiIsIk9QX1RPUElDX01FU1NBR0VfUFVCTElTSCIsIk9QX1RPUElDX1JFUE9SVCIsIk9QX0FERF9ST0xFX1RPX1VTRVIiLCJPUF9BRERfVVBEQVRFX0JPT0siLCJPUF9BRERfVVBEQVRFX05FV1MiLCJPUF9CT09LX1JFUE9SVCIsIk9QX1VTRVJfUkVQT1JUIiwiT1BfUFVCTElTSEVSX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUFVCTElTSEVSIiwiT1BfQUREX1RBRyIsIk9QX0JMT0NLX1VOQkxPQ0tfVVNFUiIsIk9QX05FV1NfUkVQT1JUIl0sIjIiOlsiT1BfQUREX1VQREFURV9DQVRFR09SWSIsIk9QX0FERF9VUERBVEVfVE9QSUMiLCJPUF9SRUFEIiwiT1BfQ09NTUVOVF9SRVBPUlQiLCJPUF9BVVRIT1JTX1JFUE9SVCIsIk9QX1RPUElDX01FU1NBR0VfUkVQT1JUIiwiT1BfQUREX1VQREFURV9ST0xFIiwiT1BfUFVCTElTSF9VTlBVQkxJU0hfTkVXUyIsIk9QX0FERF9VUERBVEVfQVVUSE9SIiwiT1BfVE9QSUNfTUVTU0FHRV9QVUJMSVNIIiwiT1BfVE9QSUNfUkVQT1JUIiwiT1BfQUREX1JPTEVfVE9fVVNFUiIsIk9QX0FERF9VUERBVEVfQk9PSyIsIk9QX0FERF9VUERBVEVfTkVXUyIsIk9QX0JPT0tfUkVQT1JUIiwiT1BfVVNFUl9SRVBPUlQiLCJPUF9QVUJMSVNIRVJfUkVQT1JUIiwiT1BfQUREX1VQREFURV9QVUJMSVNIRVIiLCJPUF9BRERfVEFHIiwiT1BfQkxPQ0tfVU5CTE9DS19VU0VSIiwiT1BfTkVXU19SRVBPUlQiXSwiMyI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdfSwiaWF0IjoxNzI0MzYwMzk5LCJleHAiOjE3MjQ0NDY3OTl9.pkrFofqzsFoGLnjHiiuZinJXu9ZQ-EiWtF_vbVxc4uDmr8D4QCz7eLm2fDSqOHh-vOsVh9J-vpJVMjwcdePyzg",
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
        console.log(filteredList)
        setProperties(`?isEnable=${filteredList.enable}`)
    }, [filteredList])



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
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "آخرین ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
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
            {(isModalOpen) && <CategoryModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Filter title={"وضعیت"} totalData={data} filterTitle={"enable"} filteredList={filteredList} setFilteredList={setFilteredList} multiple={true}  />
                </div>
                <AddBtn onClick={openModal} />
            </div>
            <table className="w-full relative border-separate" style={{ borderSpacing: "0 10px" }}>
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        return <TableHeaderItem header={header} key={header.id} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map(row =>
                        <TableRow key={row.id} modalData={row} setEditModal={setEditModal} openModal={openModal}>
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
            <CategoryPagination table={table} />
        </>
    )
}

export default CategoryPage