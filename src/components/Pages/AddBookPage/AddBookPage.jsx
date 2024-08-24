
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import TableHeader from "../../TableHeader/TableHeader"
import TableRow from "../../TableRow/TableRow"
import AddBtn from "../../Buttons/AddBtn"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import Pagination from "../../Pagination/Pagination"
import useFetch from "../../../hooks/useFetch"
import BookModal from "../../Modals/BookModal"
import SubmitSearch from "../../Buttons/SubmitSearch"
import { useForm } from "react-hook-form"
import DeleteFilter from "../../Buttons/DeleteFilter"
import CategoryInput from "../../Modals/CategoryInput/CategoryInput"
import PublishersInput from "../../Modals/PublishersInput/PublishersInput"
import AuthorsInput from "../../Modals/AuthorsInput/AuthorsInput"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';

function AddBookPage() {
    const [data, setData] = useState([])
    const [isFilter, setIsFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({})
    const [pages, setPages] = useState(0)
    const [categories, setCategories] = useState([])
    const [publisher, setPublisher] = useState([])
    const [authors, setAuthors] = useState([])
    const { register, handleSubmit, setValue } = useForm()
    const [currentPage, setCurrentPage] = useState(0)
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10`)
    const [filteredList, setFilteredList] = useState({
        "name": "",
        "public": "",
        "publish": "",
        "categoryIds": "",
        "publisherIds": "",
        "authorIds": "",
        "from": "",
        "to": "",
    })

    const books = useFetch(`https://cogcenter.ir/library/api/v1/manager/0/books${properties}`)

    useEffect(() => {
        setData(books.content)
        setPages(books.totalPages)

        return () => {

        }

    }, [books])


    useEffect(() => {
        fetch(`https://cogcenter.ir/library/api/v1/manager/0/books${properties}`, {
            headers: {
                'accept': '*/*',
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6NywiZmlyc3ROYW1lIjoiYWxpIiwibGFzdE5hbWUiOiJlc21haWxpIiwidXNlckltYWdlIjoiMzg1NjZiNTMtMzY0MS00YzkzLWI4OWEtMTRkY2Y0NDRmNmIxIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiIsIlNVUEVSX0FETUlOIiwiU1VQRVJfQURNSU4iXSwiYXV0aG9yaXRpZXMiOnsiMCI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdLCIxIjpbIk9QX0FERF9VUERBVEVfQ0FURUdPUlkiLCJPUF9BRERfVVBEQVRFX1RPUElDIiwiT1BfUkVBRCIsIk9QX0NPTU1FTlRfUkVQT1JUIiwiT1BfQVVUSE9SU19SRVBPUlQiLCJPUF9UT1BJQ19NRVNTQUdFX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUk9MRSIsIk9QX1BVQkxJU0hfVU5QVUJMSVNIX05FV1MiLCJPUF9BRERfVVBEQVRFX0FVVEhPUiIsIk9QX1RPUElDX01FU1NBR0VfUFVCTElTSCIsIk9QX1RPUElDX1JFUE9SVCIsIk9QX0FERF9ST0xFX1RPX1VTRVIiLCJPUF9BRERfVVBEQVRFX0JPT0siLCJPUF9BRERfVVBEQVRFX05FV1MiLCJPUF9CT09LX1JFUE9SVCIsIk9QX1VTRVJfUkVQT1JUIiwiT1BfUFVCTElTSEVSX1JFUE9SVCIsIk9QX0FERF9VUERBVEVfUFVCTElTSEVSIiwiT1BfQUREX1RBRyIsIk9QX0JMT0NLX1VOQkxPQ0tfVVNFUiIsIk9QX05FV1NfUkVQT1JUIl0sIjIiOlsiT1BfQUREX1VQREFURV9DQVRFR09SWSIsIk9QX0FERF9VUERBVEVfVE9QSUMiLCJPUF9SRUFEIiwiT1BfQ09NTUVOVF9SRVBPUlQiLCJPUF9BVVRIT1JTX1JFUE9SVCIsIk9QX1RPUElDX01FU1NBR0VfUkVQT1JUIiwiT1BfQUREX1VQREFURV9ST0xFIiwiT1BfUFVCTElTSF9VTlBVQkxJU0hfTkVXUyIsIk9QX0FERF9VUERBVEVfQVVUSE9SIiwiT1BfVE9QSUNfTUVTU0FHRV9QVUJMSVNIIiwiT1BfVE9QSUNfUkVQT1JUIiwiT1BfQUREX1JPTEVfVE9fVVNFUiIsIk9QX0FERF9VUERBVEVfQk9PSyIsIk9QX0FERF9VUERBVEVfTkVXUyIsIk9QX0JPT0tfUkVQT1JUIiwiT1BfVVNFUl9SRVBPUlQiLCJPUF9QVUJMSVNIRVJfUkVQT1JUIiwiT1BfQUREX1VQREFURV9QVUJMSVNIRVIiLCJPUF9BRERfVEFHIiwiT1BfQkxPQ0tfVU5CTE9DS19VU0VSIiwiT1BfTkVXU19SRVBPUlQiXSwiMyI6WyJPUF9BRERfVVBEQVRFX0NBVEVHT1JZIiwiT1BfQUREX1VQREFURV9UT1BJQyIsIk9QX1JFQUQiLCJPUF9DT01NRU5UX1JFUE9SVCIsIk9QX0FVVEhPUlNfUkVQT1JUIiwiT1BfVE9QSUNfTUVTU0FHRV9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1JPTEUiLCJPUF9QVUJMSVNIX1VOUFVCTElTSF9ORVdTIiwiT1BfQUREX1VQREFURV9BVVRIT1IiLCJPUF9UT1BJQ19NRVNTQUdFX1BVQkxJU0giLCJPUF9UT1BJQ19SRVBPUlQiLCJPUF9BRERfUk9MRV9UT19VU0VSIiwiT1BfQUREX1VQREFURV9CT09LIiwiT1BfQUREX1VQREFURV9ORVdTIiwiT1BfQk9PS19SRVBPUlQiLCJPUF9VU0VSX1JFUE9SVCIsIk9QX1BVQkxJU0hFUl9SRVBPUlQiLCJPUF9BRERfVVBEQVRFX1BVQkxJU0hFUiIsIk9QX0FERF9UQUciLCJPUF9CTE9DS19VTkJMT0NLX1VTRVIiLCJPUF9ORVdTX1JFUE9SVCJdfSwiaWF0IjoxNzI0NDQ4MjUyLCJleHAiOjE3MjQ1MzQ2NTJ9.i3aFU-S7P-kiWQEcs9AGoYZpqEymeeMUs-8sqCQX9PFTrqdKy6vaCd3waR6mhP-cxZk7MezBUwrGpZNbwtDMqw",
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
        console.log(filteredList)
        setProperties(`?categoryIds=${filteredList.categoryIds}&publish=${filteredList.publish}&name=${filteredList.name}&authorIds=${filteredList.authorIds}&publisherIds=${filteredList.publisherIds}&isPublic=${filteredList.public}&from=${filteredList.from}&to=${filteredList.to}&page=${currentPage}&size=10`)
    }, [filteredList, currentPage])



    function openModal() {
        setIsModalOpen(true)
    }


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 40,
            cell: (props) => <p>{props.getValue()}</p>
        },
        // {
        //     accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
        //     header: "عکس",
        //     cell: (props) => <img src={`https://cogcenter.ir/file-manager/api/v1/files/download/${props.getValue()}`} alt="" className="w-11 m-auto hover:scale-150 duration-500 cursor-pointer" />
        // },
        {
            accessorKey: "name",
            header: "نام کتاب",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "authors",
            header: "نویسنده ها",
            cell: (props) => <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {props.getValue().map(author => {
                    return <p key={author.id}>{author.firstName + " " + author.lastName}</p>
                })}
            </div>
        },
        {
            accessorKey: "publish",
            header: "انتشار",
            cell: (props) => (props.getValue()) ?
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#77bb41" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                :
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e32400" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        },
        {
            accessorKey: "publisher.name",
            header: "ناشر",
            cell: (props) => <p>{props.getValue()}</p>
        },

        {
            accessorKey: "publicationYear",
            header: "سال",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "pageNumber",
            header: "صفحات",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "category",
            header: "ژانر",
            cell: (props) => <p>{props.getValue().title}</p>
        },
        {
            accessorKey: "translators",
            header: "مترجم",
            cell: (props) => (props.getValue()) && <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {props.getValue().map((translator, index) => {
                    return <p key={index}>{translator}</p>
                })}
            </div>
        },

        {
            accessorKey: "feedbackStats.commentCount",
            header: "کامنت‌ها",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "downloadCount",
            header: "دانلود",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "feedbackStats.rating.average",
            header: "امتیاز",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "public",
            header: "دسترسی",
            cell: (props) => <p>{(props.getValue()) ? "عمومی" : "خصوصی"}</p>
        },
        {
            accessorKey: "createdAt",
            header: "ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        }, {
            accessorKey: "updatedAt",
            header: "ویرایش",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        },

        {
            accessorKey: "feedbackStats.reaction",
            header: "",
            cell: (props) => <div className="flex gap-4 flex-col">
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#96d35f" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(props.getValue().LIKE) ? (props.getValue().LIKE.count) : 0}</p>
                <p className="flex items-center gap-2 text-sm">
                    <svg className="w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e32400" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(props.getValue().DISLIKE) ? (props.getValue().DISLIKE.count) : 0}</p>
            </div>
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    })

    function submit(data) {
        console.log(data)
        setCurrentPage(0)
        setIsFilter(true)
        setFilteredList(data)
    }


    function deleteFilter() {
        setFilteredList({
            "name": "",
            "public": "",
            "publish": "",
            "categoryIds": "",
            "publisherIds": "",
            "authorIds": "",
            "from": "",
            "to": "",
        })
        setIsFilter(false)
    }

    setValue("categoryIds", categories)
    setValue("publisherIds", publisher)
    setValue("authorIds", authors)
    register("from")
    register("to")

    function formatDateToISO(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function getFrom(date) {
        setValue("from", formatDateToISO(date))
    }

    function getTo(date) {
        setValue("to", formatDateToISO(date))
    }

    return (
        <>
            {(isModalOpen) && <BookModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex justify-between px-4">
                <form className="flex items-end gap-4 flex-wrap max-w-5xl">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="opacity-70 text-sm mb-1">نام کتاب</label>
                        <input type="text" id="name" className="p-2 py-1.5 px-5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("name")} />
                    </div>
                    <div>
                        <AuthorsInput modalData={{}} setAuthorValue={setAuthors} {...register("authorIds")} />
                    </div>
                    <div>
                        <PublishersInput modalData={{}} setPublisherValue={setPublisher} {...register("publisherIds")} />
                    </div>
                    <div>
                        <CategoryInput modalData={{}} setCategoryValue={setCategories} {...register("categoryIds")} multi={true} />
                    </div>
                    <select name="publish" id="publish" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("publish")}>
                        <option value="">وضعیت انتشار</option>
                        <option value="true">منتشر شده</option>
                        <option value="false">لغو انتشار</option>
                    </select>

                    <select name="publish" id="enable" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("public")}>
                        <option value="">سطح دسترسی</option>
                        <option value="true">عمومی</option>
                        <option value="false">خصوصی</option>
                    </select>
                    <div className="flex flex-col">
                        <label htmlFor="" className="opacity-70 text-sm mb-1">از تاریخ:</label>
                        <DatePicker placeholder="انتخاب کنید" editable={false} onChange={getTo} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="opacity-70 text-sm mb-1">تا تاریخ:</label>
                        <DatePicker placeholder="انتخاب کنید" editable={false} onChange={getFrom} />
                    </div>


                    <SubmitSearch onClick={handleSubmit(submit)} />
                    {(isFilter) && <DeleteFilter onClick={deleteFilter} />}
                </form>
                <AddBtn onClick={openModal} />
            </div>

            <table className="w-full relative border-separate" style={{ borderSpacing: "0 10px" }}>

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map(header => {
                        return <TableHeaderItem header={header} key={header.id} />
                    })}
                </TableHeader>

                <tbody style={{ fontSize: "14px" }}>
                    {table.getRowModel().rows.map(row => <TableRow key={row.id} modalData={row} setEditModal={setEditModal} openModal={openModal} >
                        {row.getVisibleCells().map((cell, index) =>
                            <td className="py-2" key={index} width={cell.column.getSize()}>
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
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default AddBookPage