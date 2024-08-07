


function TableHeader({children}){
    return(
        <>
        <thead className="">
            <tr className="text-center">
                {children}
            </tr>
        </thead>
        </>
    )
}

export default TableHeader