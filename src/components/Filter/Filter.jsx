import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'


function Filter({ title, totalData, filterTitle ,filteredList , setFilteredList , multiple }) {

    console.log(totalData)
    const [options , setOptions] = useState([])

    useEffect(() => {
        (totalData)?.map(item => {
            setOptions((prev) => [...prev , {value: item[filterTitle] , label:item[filterTitle]}])
        })

        return () => {

        }

    }, [])


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