import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import TableHeaderItem from "../../TableHeaderItem/TableHeaderItem"
import TableHeader from "../../TableHeader/TableHeader"
import CommentTextTd from "./CommentTextTd"
import { useEffect, useRef } from "react"


function RepliesModal({ props, setShow }) {
    const ref = useRef()
    const containerRef = useRef()


    useEffect(() => {

        function clickHandler() {
            if (!ref.current.contains(event.target) && event.target == containerRef.current) {
                setShow(false)
            }
        }

        document.addEventListener("click", clickHandler)

        return () => {
            document.removeEventListener("click", clickHandler)
        }
    }, [])

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            size: 50,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorFn: (row) => `${row.userImage}?key=${row.fileKey}`,
            header: "عکس",
            size: 70,
            cell: (props) =>
                <div className="rounded-full flex-shrink-0 w-12 h-12 overflow-hidden flex justify-center bg-sandals m-auto">
                    {(props.row.original.userImage) ?
                        <img src={`http://cogcenter.ir/api/fs/v1/files/download/${props.getValue()}`} alt="" />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3/4 mt-3" viewBox="0 0 448 512" fill="white" opacity={0.4}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                    }
                </div>
        },
        {
            accessorKey: "userName",
            header: "نام کاربری",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "text",
            header: "متن کامنت",
            cell: (props) => <CommentTextTd props={props} />
        },
        {
            accessorKey: "createdAt",
            header: "تاریخ ثبت",
            cell: (props) => {
                let date = new Date(props.getValue()).toLocaleDateString()
                return <p>{(props.getValue()) ? date : "-"}</p>
            }
        },
        {
            accessorKey: "feedbackStats.reaction",
            header: "بازخورد‌ها",
            size: 100,
            cell: (props) => <div className="flex gap-4 justify-center">
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" /></svg>
                    {(props.getValue()?.LIKE) ? (props.getValue()?.LIKE.count) : 0}</p>
                <p className="flex flex-col items-center gap-2 text-xs">
                    <svg className="w-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="red" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" /></svg>
                    {(props.getValue()?.DISLIKE) ? (props.getValue()?.DISLIKE.count) : 0}</p>
            </div>
        },
    ]

    const table = useReactTable({
        data: props.row.original.replies,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })
    return (
        <div className="flex items-center justify-center top-0 right-0 px-48 fixed w-screen h-screen z-50" style={{ backgroundColor: "rgba(0 ,0 ,0 , 0.2)", backdropFilter: "blur(3px)" }} ref={containerRef}>
            <table className="w-full relative border-collapse mt-10 z-50 shadow-lg" ref={ref}>
                <TableHeader>
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                        return <TableHeaderItem header={header} key={index} />
                    })}
                </TableHeader>

                <tbody>
                    {table.getRowModel().rows.map((row, index) =>
                        <tr className="bg-sand text-center" key={index}>
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
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default RepliesModal