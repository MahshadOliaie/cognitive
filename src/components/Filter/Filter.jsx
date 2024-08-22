import { useEffect, useState } from 'react'
import Select from 'react-select'


function Filter({ title, totalData, filterTitle, filteredList, setFilteredList, multiple }) {

    console.log(totalData)
    const [options, setOptions] = useState([])
    let arr = []

    useEffect(() => {

        if (filterTitle === "public") {
            setOptions([{ value: true, label: "عمومی" }, { value: "false", label: "خصوصی" }])
        } else
            if (filterTitle === "publish") {
                setOptions([{ value: true, label: "منتشر شده" }, { value: false, label: "لغو انتشار" }])
            } else
                if (filterTitle === "enable") {
                    setOptions([{ value: true, label: "فعال" }, { value: false, label: "غیرفعال" }])
                }
                else {
                    totalData?.map(item => {
                        if (!arr.includes(item[filterTitle])) {
                            arr.push(item[filterTitle])
                        }
                    })

                    arr.map(item => {
                        setOptions((prev) => [...prev, { value: item, label: item }])

                    })
                }

        return () => {

        }

    }, [totalData])


    function handleChange(selectedOption) {
        console.log(selectedOption)
    }

    return (
        <>
            <div className="flex flex-col">
                <Select options={options} onChange={handleChange} placeholder={title} isMulti={multiple} />
            </div>
        </>
    )
}

export default Filter