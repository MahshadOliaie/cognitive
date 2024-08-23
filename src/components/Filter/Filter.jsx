import { useEffect, useState } from 'react'
import Select from 'react-select'


function Filter({ title, totalData, filterTitle, filteredList, setFilteredList, multiple, getId, setCurrentPage }) {


    const [options, setOptions] = useState([])
    let arr = []

    useEffect(() => {

        if (filterTitle === "public") {
            setOptions([{ value: true, label: "عمومی" }, { value: false, label: "خصوصی" }])
        } else
            if (filterTitle === "publish") {
                setOptions([{ value: true, label: "منتشر شده" }, { value: false, label: "لغو انتشار" }])
            } else
                if (filterTitle === "enable") {
                    setOptions([{ value: true, label: "فعال" }, { value: false, label: "غیرفعال" }])
                }
                else {
                    totalData?.map(item => {
                        if (getId) {
                            if (!arr.includes(item)) {
                                arr.push(item)
                            }
                        }
                        else
                            if (!arr.includes(item[filterTitle])) {
                                arr.push(item[filterTitle])
                            }
                    })

                    arr.map(item => {
                        if (getId)
                            setOptions((prev) => [...prev, { value: item.id, label: item[filterTitle] }])
                        else
                            setOptions((prev) => [...prev, { value: item, label: item }])

                    })
                }

        return () => {

        }

    }, [totalData])


    function handleChange(selectedOption) {
        if (getId)
            setFilteredList({ ...filteredList, [getId]: (selectedOption[0]) ? selectedOption[0].value : "" })

        else
            setFilteredList({ ...filteredList, [filterTitle]: (selectedOption[0]) ? selectedOption[0].value : "" })
        console.log(selectedOption)
        if (setCurrentPage)
            setCurrentPage(0)
    }

    return (
        <>
            <div className="flex flex-col">
                <Select options={options} onChange={handleChange} placeholder={title}  isClearable />
            </div>
        </>
    )
}

export default Filter