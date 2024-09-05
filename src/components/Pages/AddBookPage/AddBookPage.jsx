
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
import CategoryInput from "../../Modals/CategoryInput/CategoryInput"
import PublishersInput from "../../Modals/PublishersInput/PublishersInput"
import AuthorsInput from "../../Modals/AuthorsInput/AuthorsInput"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import TOKEN from "../../../../public/token"
import EditBtn from "../../Buttons/EditBtn"
import SelectBtn from "../../Buttons/SelectBtn"
import SelectedCounter from "../../SelectedCounter/SelectedCounter"
import BookNameTd from "./BookNameTd"
import AuthorsNameTd from "./AuthorsNameTd"
import PublisherTd from "./PublisherTd"
import TranslatorTd from "./TranslatorTd"

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
    const [fromDateFloat, setFromDateFloat] = useState(false)
    const [toDateFloat, setToDateFloat] = useState(false)
    const [properties, setProperties] = useState(`?page=${currentPage}&size=10`)
    const [selectedItems, setSelectedItems] = useState([])
    const [filteredList, setFilteredList] = useState({
        "name": "",
        "isPublic": "",
        "publish": "",
        "categoryIds": "",
        "publisherIds": "",
        "authorIds": "",
        "from": "",
        "to": "",
    })



    const books = useFetch(`https://cogcenter.ir/library/api/v1/manager/0/books${properties}`)


    async function putData(data, publishState) {
        const { authors, category, coverImage, description, file, id, name, pageNumber, publicationYear, publisher, scopeId, translators
        } = data

        let authorIds = []
        let translatorIds = []

        authors.map(author => {
            authorIds.push(author.id)
        })
        translators.map(translator => {
            translatorIds.push(translator.id)
        })

        const formData = new FormData()
        formData.append("authorIds", authorIds)
        formData.append("categoryId", category.id)
        formData.append("coverImage", coverImage)
        formData.append("description", description)
        formData.append("file", file)
        formData.append("id", id)
        formData.append("name", name)
        formData.append("pageNumber", pageNumber)
        formData.append("publicationYear", publicationYear)
        formData.append("publish", publishState)
        formData.append("isPublic", data.isPublic)
        formData.append("publisherId", publisher.id)
        formData.append("scopeId", 0)
        formData.append("translatorIds", translatorIds)

        fetch(`https://cogcenter.ir/library/api/v1/manager/0/books/${data.id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': TOKEN,
                'scope': [
                    "SUPER_ADMIN"
                ],
                "expiresIn": 1724266116069,
                "refreshToken": "3eb183b8-340f-4452-af97-55015dd105b8",
            },
            body: formData
        });
        await setSelectedItems([])
    }

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
        setProperties(`?categoryIds=${filteredList.categoryIds || []}&publish=${filteredList.publish || ""}&name=${filteredList.name || ""}&authorIds=${filteredList.authorIds || []}&publisherIds=${filteredList.publisherIds || []}&isPublic=${filteredList.isPublic || ""}&from=${filteredList.from || ""}&to=${filteredList.to || ""}&page=${currentPage}&size=10`)
    }, [filteredList, currentPage])



    function openModal() {
        setIsModalOpen(true)
    }


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
            size: 40,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.coverImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 90,
            cell: (props) => <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" className="m-auto cursor-pointer" style={{ maxHeight: "32px" }} />
        },
        {
            accessorKey: "name",
            header: "نام کتاب",
            cell: (props) => <BookNameTd props={props} />
        },
        {
            accessorKey: "authors",
            header: "نویسنده ها",
            cell: (props) => <AuthorsNameTd props={props} />
        },
        {
            accessorKey: "translators",
            header: "مترجم",
            cell: (props) => (props.getValue()) && <TranslatorTd props={props} />
        },
        {
            accessorKey: "publish",
            header: "انتشار",
            size: 50,
            cell: (props) => (props.getValue()) ?
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#77bb41" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                :
                <svg className="w-5 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e32400" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        },
        {
            accessorKey: "publisher.name",
            header: "ناشر",
            cell: (props) => <PublisherTd props={props} />
        },

        {
            accessorKey: "publicationYear",
            header: "سال",
            size: 60,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "pageNumber",
            header: "صفحات",
            size: 70,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "category",
            header: "ژانر",
            size: 100,
            cell: (props) => <p>{props.getValue().title}</p>
        },
        {
            accessorKey: "public",
            header: "دسترسی",
            size: 100,
            cell: (props) => <p>{(props.getValue()) ? "عمومی" : "خصوصی"}</p>
        },
        {
            accessorKey: "createdAt",
            header: "ثبت",
            size: 100,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        }, {
            accessorKey: "publishedAt",
            header: "تاریخ انتشار",
            size: 100,
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        },

        {
            accessorKey: "feedbackStats",
            header: "بازخورد‌ها",
            cell: (props) => <div className="flex gap-4 justify-center">
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 11 13" fill="none">
                        <path d="M5.49762 0C5.29146 0.000212427 5.09381 0.0822035 4.94803 0.227981C4.80225 0.373759 4.72026 0.571415 4.72005 0.777575V6.56245L3.68368 5.52608C3.32378 5.17621 2.86117 5.26528 2.59275 5.5341C2.32393 5.80293 2.23446 6.26393 2.58673 6.62744L4.94554 8.98665C5.08597 9.13149 5.27855 9.21254 5.48719 9.21455H5.49401C5.70265 9.21455 5.90407 9.1323 6.0473 8.98866L8.41052 6.62544C8.75999 6.26353 8.67092 5.80252 8.4025 5.5337C8.13408 5.26488 7.67307 5.17661 7.30916 5.52809L6.2748 6.56245V0.777174C6.27448 0.571152 6.1925 0.37366 6.04682 0.227981C5.90114 0.0823011 5.70365 0.000318345 5.49762 0Z" fill="black" />
                        <path d="M0.777575 7.6618C0.571484 7.66202 0.373889 7.74395 0.228123 7.88964C0.0823565 8.03533 0.000318589 8.23289 0 8.43898V9.29921C0 11.0301 1.4079 12.438 3.13879 12.438H7.86121C9.5921 12.438 11 11.0297 11 9.29921V8.43898C10.9997 8.23296 10.9177 8.03546 10.772 7.88978C10.6263 7.74411 10.4288 7.66212 10.2228 7.6618C10.0167 7.66202 9.81914 7.74395 9.67337 7.88964C9.52761 8.03533 9.44557 8.23289 9.44525 8.43898V9.29921C9.44483 9.71919 9.2778 10.1218 8.98083 10.4188C8.68385 10.7158 8.2812 10.8828 7.86121 10.8832H3.13879C2.7188 10.8828 2.31615 10.7158 2.01917 10.4188C1.7222 10.1218 1.55517 9.71919 1.55475 9.29921V8.43898C1.55443 8.23289 1.47239 8.03533 1.32663 7.88964C1.18086 7.74395 0.983666 7.66202 0.777575 7.6618Z" fill="black" />
                    </svg>
                    {(props.row.original.downloadCount) ? (props.row.original.downloadCount) : 0}
                </p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 14 12" fill="none" className="mb-0.5">
                        <path d="M2.22163 9.63514C1.87957 10.4942 1.39696 11.2929 0.79275 12C2.19187 12 3.99175 11.82 5.37862 10.9869C5.91277 11.0894 6.4557 11.1416 7 11.1429C10.8658 11.1429 14 8.64857 14 5.57143C14 2.49429 10.8658 0 7 0C3.13425 0 0 2.49429 0 5.57143C0 7.176 0.8575 8.61857 2.22163 9.63514Z" fill="black" />
                        <circle cx="3.94922" cy="5.75" r="0.75" fill="#D9D9D9" />
                        <circle cx="6.94922" cy="5.75" r="0.75" fill="#D9D9D9" />
                        <circle cx="9.94922" cy="5.75" r="0.75" fill="#D9D9D9" />
                    </svg>
                    {(props.getValue()?.commentCount) ? (props.getValue()?.commentCount) : 0}
                </p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 14 13" fill="none" className="mb-0.5">
                        <path d="M11.2552 12.963C10.7572 13.3089 7.5613 11.1163 6.94922 11.1115C6.33713 11.1067 3.10529 13.2488 2.61303 12.8952C2.12077 12.5415 3.27805 8.9091 3.09363 8.34171C2.9092 7.77432 -0.185093 5.44806 0.00873508 4.88363C0.202606 4.31919 4.11371 4.26676 4.61178 3.92088C5.10986 3.57503 6.42935 -0.00477262 7.04147 4.77737e-06C7.65351 0.00482372 8.91339 3.60486 9.40566 3.95851C9.89792 4.31213 13.8077 4.42595 13.9922 4.99334C14.1766 5.56073 11.0441 7.83813 10.8503 8.40257C10.6564 8.96701 11.7533 12.6171 11.2552 12.963Z" fill="#F8B84E" />
                    </svg>
                    {(props.getValue()?.rating.average) ? (props.getValue()?.rating.average) : 0}
                </p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(props.getValue()?.reaction.LIKE) ? (props.getValue()?.reaction.LIKE.count) : 0}</p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(props.getValue()?.reaction.DISLIKE) ? (props.getValue()?.reaction.DISLIKE.count) : 0}</p>

            </div>
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
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    })

    function submit(data) {
        setCurrentPage(0)
        setIsFilter(true)
        setFilteredList(data)
    }


    setValue("categoryIds", categories)
    setValue("publisherIds", publisher)
    setValue("authorIds", authors)
    register("from")
    register("to")

    function formatDateToISO(date) {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        }
    }

    function getFrom(date) {
        setValue("to", formatDateToISO(date))
        if (date) {
            setFromDateFloat(true)
        }
        else
            setFromDateFloat(false)
    }

    function getTo(date) {
        setValue("from", formatDateToISO(date))
        if (date) {
            setToDateFloat(true)
        }
        else
            setToDateFloat(false)
    }



    return (
        <>
            {(isModalOpen) && <BookModal setIsModalOpen={setIsModalOpen} modalData={editModal} setEditModal={setEditModal} />}
            <div className="flex justify-between px-4">
                <form className="flex items-end gap-4 flex-wrap max-w-5xl">
                    <div className="form-group">
                        <input type="text" id="name" className="searchInput" placeholder="نام کتاب" {...register("name")} />
                        <label htmlFor="name" className="searchLabel">نام کتاب</label>
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

                    <select name="enable" id="enable" className="p-2 py-1.5 rounded-md focus-visible:outline-dark" style={{ border: "1px solid lightgray" }} {...register("isPublic")}>
                        <option value="">سطح دسترسی</option>
                        <option value="true">عمومی</option>
                        <option value="false">خصوصی</option>
                    </select>

                    <div className="flex flex-col">
                        {(toDateFloat) &&
                            <label htmlFor="" className="opacity-70 text-sm mb-1">از تاریخ:</label>
                        }
                        <DatePicker placeholder="از تاریخ" editable={false} onChange={getTo} />
                    </div>
                    <div className="flex flex-col">
                        {(fromDateFloat) &&
                            <label htmlFor="" className="opacity-70 text-sm mb-1">تا تاریخ:</label>
                        }
                        <DatePicker placeholder="تا تاریخ" editable={false} onChange={getFrom} />
                    </div>


                    <SubmitSearch onClick={handleSubmit(submit)} />
                </form>
                <AddBtn onClick={openModal} />
            </div>


            {(selectedItems.length > 0) &&
                <SelectedCounter selectedItems={selectedItems} isBook={true} putData={putData} />
            }


            <table className="w-full relative border-collapse mt-10">

                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                        return <TableHeaderItem header={header} key={index} />
                    })}
                </TableHeader>

                <tbody style={{ fontSize: "14px" }}>
                    {table.getRowModel().rows.map((row, index) => <TableRow key={index} selected={(selectedItems.includes(row.original))}>
                        {row.getVisibleCells().map((cell, index) =>
                            <td key={index} width={cell.column.getSize()}>
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