

function FilterItems({ title, filterTitle}) {

    let obj = {
        "public": {
            true: "عمومی",
            false: "خصوصی"
        },
        "publish": {
            true: "منتشر شده",
            false: "لغو انتشار"
        },
        "enable": {
            true: "فعال",
            false: "غیر فعال"
        }
    }

    return (
        <>
            <div className='flex gap-2 items-center cursor-pointer'>
                <div className='w-4 h-4 rounded-md' style={{ border: "1px solid gray" }}></div>
                <p style={{ fontSize: "15px" }}>{(filterTitle === "public" || filterTitle === "publish" || filterTitle === "enable") ? obj[filterTitle][title] : title}</p>
            </div>
        </>
    )
}

export default FilterItems