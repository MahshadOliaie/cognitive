import { useState } from "react"
import FilterBox from "../FilterBox/FilterBox"

function TableHeaderItem({header , filterList ,columnFilters ,setColumnFilters}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <>
            <th className="py-10 relative" width={header.getSize()} key={header.id} >
                {header.column.columnDef.header}
                {(isFilterOpen) && <FilterBox filterList={filterList} header={header} setIsFilterOpen={setIsFilterOpen} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />}
                <svg className="w-3 inline mr-2 mb-1 hover:scale-125 duration-150 cursor-pointer" onClick={() => setIsFilterOpen((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
            </th>
        </>
    )
}

export default TableHeaderItem