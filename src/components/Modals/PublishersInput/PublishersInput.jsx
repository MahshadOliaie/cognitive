import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'




function PublishersInput({ modalData, setPublisherValue, publisherValue, floatAlways  }) {

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


    const style = {
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: "40px",
            overflow: "scroll !important"
        }),
    }



    return (
        <>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                    }
                    {(publisherValue?.length > 0) &&
                        <p className="ml-2 text-sm bg-dark text-white w-4 h-4 flex items-center justify-center p-2.5 rounded-full ">{categoryValue.length}</p>
                    }
                </div>

                <Select options={options} styles={style} onChange={handleChange} placeholder={(floatAlways) ? "" : "ناشر"} defaultInputValue={(modalData.original) ? modalData.original.publisher.name : ""}  />
            </div>
        </>
    )
}

export default PublishersInput