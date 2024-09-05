

function SelectedCounter({ selectedItems, isBook, putData }) {

    function handleClick(state) {
        selectedItems.map(item => {
            putData(item, state)
        })
    }


    return (
        <>
            <div className="flex items-center justify-between -mb-8 mt-5 bg-sand p-2 rounded-lg shadow-sm">
                <p>{selectedItems.length} ردیف انتخاب شده</p>
                <div className="flex items-center gap-3">
                    <p className="rounded-lg shadow-sm p-2 cursor-pointer" style={{ backgroundColor: "#C9ECC7", color: "green" }} onClick={() => handleClick(true)}>{(isBook) ? "منتشر کردن" : "فعال کردن"}</p>
                    <p className="rounded-lg shadow-sm p-2 cursor-pointer" style={{ backgroundColor: "#F4CECE", color: "red" }} onClick={() => handleClick(false)}>{(isBook) ? "لغو انتشار" : "غیرفعال کردن"}</p>
                </div>
            </div>
        </>
    )
}

export default SelectedCounter