import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'




function PublishersInput({ modalData, setPublisherValue , floatAlways }) {

    const publishers = useFetch('https://cogcenter.ir/library/api/v1/publishers?page=0')
    const [isFloat, setIsFloat] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        (publishers.content)?.map(publisher => {
            setOptions((prev) => [...prev, { value: publisher.id, label: publisher.name }])
        })

        return () => {

        }

    }, [publishers])


    function handleChange(selectedOption) {
        setPublisherValue(selectedOption.value)

        if (selectedOption) {
            setIsFloat(true)
        }
        else
            setIsFloat(false)

    }

    return (
        <>
            <div className="flex flex-col flex-1">
                {(floatAlways || isFloat) &&
                    <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                }
                <Select options={options} onChange={handleChange} placeholder={(floatAlways)? "" :"ناشر"} defaultInputValue={(modalData.original) ? modalData.original.publisher.name : ""} />
            </div>
        </>
    )
}

export default PublishersInput