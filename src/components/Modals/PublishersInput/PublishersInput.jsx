import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []




function PublishersInput({ modalData, setPublisherValue, publisherValue, floatAlways , multi  }) {

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
        if (multi) {
            arr = []
            selectedOption.map(item => {
                arr.push(item.value)
            })
            setPublisherValue(arr)
        }
        else {
            setPublisherValue(selectedOption.value)
        }

        if (selectedOption.length > 0) {
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
                        <p className="ml-2 text-sm">{translatorValue.length} مورد</p>                    }
                </div>

                <Select options={options} styles={style} onChange={handleChange} placeholder={(floatAlways) ? "" : "ناشر"} isMulti={multi} defaultInputValue={(modalData.original) ? modalData.original.publisher.name : ""}  />
            </div>
        </>
    )
}

export default PublishersInput