import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'



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
        setAuthorValue(selectedOption.value)
        console.log(selectedOption)
    }

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="authors" className="opacity-70 text-sm mb-1">نویسندگان</label>
                <Select options={options} onChange={handleChange} placeholder="انتخاب کنید" isMulti />
            </div>

        </>
    )
}

export default AuthorsInput