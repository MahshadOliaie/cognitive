import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []


function AuthorsInput({ modalData, setAuthorValue }) {

    const authors = useFetch('https://cogcenter.ir/library/api/v1/authors?page=0')
    const [options, setOptions] = useState([])


    useEffect(() => {
        (authors.content)?.map(author => {
            setOptions((prev) => [...prev, { value: author.id, label: `${author.firstName + " " + author.lastName}` }])
        })

        return () => {

        }

    }, [authors])


    function handleChange(selectedOption) {
        arr = []
        selectedOption.map(item => {
            arr.push(item.value)
        })
        setAuthorValue(arr)
    }

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="authors" className="opacity-70 text-sm mb-1">نویسندگان</label>
                <Select options={options} onChange={handleChange} placeholder="انتخاب کنید" isMulti defaultValue={modalData.original?.authors.map(author => { return { label: `${author.firstName + " " + author.lastName}`, value: author.id } })} />
            </div>

        </>
    )
}

export default AuthorsInput