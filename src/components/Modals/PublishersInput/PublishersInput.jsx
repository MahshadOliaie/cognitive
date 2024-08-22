import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'




function PublishersInput({ modalData, setPublisherValue }) {

    const publishers = useFetch('https://cogcenter.ir/library/api/v1/publishers?page=0')
    const [options , setOptions] = useState([])

    useEffect(() => {
        (publishers.content)?.map(publisher => {
            setOptions((prev) => [...prev , {value: publisher.id , label:publisher.name}])
        })

        return () => {

        }

    }, [publishers])


    function handleChange(selectedOption) {
        setPublisherValue(selectedOption.value)
        console.log(selectedOption)
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                <Select options={options} onChange={handleChange} placeholder="انتخاب کنید" />
            </div>
        </>
    )
}

export default PublishersInput