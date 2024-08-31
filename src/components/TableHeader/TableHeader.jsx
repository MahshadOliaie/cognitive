


function TableHeader({children}){
    return(
        <>
        <thead >
            <tr className="text-center text-sm font-bold">
                {children}
            </tr>
        </thead>
        </>
    )
}

export default TableHeader