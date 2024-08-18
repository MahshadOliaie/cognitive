import { useState } from "react"

function TableHeaderItem({header}) {

    return (
        <>
            <th className="py-10 relative" width={header.getSize()} key={header.id} >
                {header.column.columnDef.header}
            </th>
        </>
    )
}

export default TableHeaderItem