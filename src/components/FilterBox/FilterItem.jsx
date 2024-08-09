import { useState } from "react"


function FilterItem({ item, id, columnFilters, setColumnFilters, isActive }) {


    function handleClick() {
        setColumnFilters((prev) => {
                const items = prev.find(f => f.id === id)?.value;
                if (!items) {
                    return prev.concat({
                        id: id,
                        value: item,
                    });
                }

                return prev.map(f => {
                    f.id === id ?
                        {
                            ...f,
                            value: isActive
                                ?
                                items.filter(s => s !== item)
                                :
                                item.concat(item),
                        }
                        :
                        f
                })
            }
        )
    }

    return (
        <>
            <p className="text-base font-normal hover:bg-linen p-6 py-2 cursor-pointer" style={(isActive) ? { backgroundColor: "#D1BAA7" } : {}} onClick={handleClick}>{item}</p>
        </>
    )
}

export default FilterItem