function CategoryPagination({ table }) {
    
    const pageCount = table.getPageCount()
    let arr = []


    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }


    function handleClick() {
        const page = event.target.textContent
        table.setPageIndex(page - 1)


    }

    return (
        <div className="flex items-center justify-center flex-row-reverse gap-2 py-10">
            <div className="flex items-center justify-center bg-sandals w-8 h-8 rounded-md shadow-lg cursor-pointer hover:scale-105 duration-100" onClick={() => { table.previousPage() }} style={(table.getCanPreviousPage()) ? {} : { pointerEvents: "none", opacity: "0.7" }}><svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></div>
            {arr.map(item => {
                return <div key={item} className="flex items-center justify-center bg-sand w-8 h-8 rounded-md shadow-lg cursor-pointer hover:bg-ocean" onClick={handleClick} style={(table.getState().pagination.pageIndex + 1 == item) ? { backgroundColor: "#A1CED6" } : {}}>{item}</div>
            })}
            <div className="flex items-center justify-center bg-sandals w-8 h-8 rounded-md shadow-lg cursor-pointer hover:scale-105 duration-100" onClick={() => { table.nextPage() }} style={(table.getCanNextPage()) ? {} : { pointerEvents: "none", opacity: "0.7" }}><svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg></div>

        </div>
    )
}

export default CategoryPagination