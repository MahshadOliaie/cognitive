

function FilterItems({title}) {
    return (
        <>
            <div className='flex gap-2 items-center'>
                <div className='w-4 h-4 rounded-md' style={{ border: "1px solid gray" }}></div>
                <p style={{ fontSize: "15px" }}>{title}</p>
            </div>
        </>
    )
}

export default FilterItems