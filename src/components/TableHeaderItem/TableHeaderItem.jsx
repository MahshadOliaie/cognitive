import { useState } from "react"


function TableHeaderItem({ header, setSort, tanStackHandle }) {
    const [counter, setCounter] = useState(0)

    function handleClick() {
        if (counter == 0) {
            setSort([`${header.column.id}`])
            setCounter(1)
            console.log("once")
        }
        if (counter == 1) {
            setSort([`${header.column.id},desc`])
            setCounter(2)
            console.log("twice")
        }
        if (counter == 2) {
            setSort([])
            setCounter(0)
            console.log("done")
        }
    }

    return (
        <>
            <th className="py-4 mt-5 relative" width={header.getSize()} key={header.id} >
                <div className="flex items-center justify-center gap-1">
                    {header.column.columnDef.header}
                    {header.column.getCanSort() &&
                        <>
                            {(tanStackHandle) ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none" onClick={header.column.getToggleSortingHandler()} className="w-4 cursor-pointer"><path d="M7.364 24.586V0H5.364V24.586L1.414 20.636L0 22.05L5.657 27.707C5.84453 27.8945 6.09884 27.9998 6.364 27.9998C6.62916 27.9998 6.88347 27.8945 7.071 27.707L12.728 22.05L11.314 20.636L7.364 24.586ZM26.728 5.95L21.071 0.293C20.8835 0.105529 20.6292 0.000213623 20.364 0.000213623C20.0988 0.000213623 19.8445 0.105529 19.657 0.293L14 5.95L15.414 7.364L19.364 3.414V28H21.364V3.414L25.314 7.364L26.728 5.95Z" fill="black" /></svg>

                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none" onClick={handleClick} className="w-4 cursor-pointer"><path d="M7.364 24.586V0H5.364V24.586L1.414 20.636L0 22.05L5.657 27.707C5.84453 27.8945 6.09884 27.9998 6.364 27.9998C6.62916 27.9998 6.88347 27.8945 7.071 27.707L12.728 22.05L11.314 20.636L7.364 24.586ZM26.728 5.95L21.071 0.293C20.8835 0.105529 20.6292 0.000213623 20.364 0.000213623C20.0988 0.000213623 19.8445 0.105529 19.657 0.293L14 5.95L15.414 7.364L19.364 3.414V28H21.364V3.414L25.314 7.364L26.728 5.95Z" fill="black" /></svg>
                            }
                        </>
                    }
                </div>
            </th>
        </>
    )
}

export default TableHeaderItem