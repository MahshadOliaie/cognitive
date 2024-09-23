import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []




function PublishersInput({ modalData, setPublisherValue, publisherValue, floatAlways, multi }) {

    const publishers = useFetch('https://cogcenter.ir/library/api/v1/publishers?page=0')
    const [isFloat, setIsFloat] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        (publishers.content)?.map(publisher => {
            let optionsIds = options.map(item => item.value)
            if (!optionsIds.includes(publisher.id))
                setOptions((prev) => [...prev, { value: publisher.id, label: publisher.name }])
        })

        console.log(publishers)
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

            orderOptions(selectedOption)
        }
        else {
            setPublisherValue(selectedOption.value)
            orderOptions([selectedOption])
        }

        if (selectedOption.length > 0) {
            setIsFloat(true)
        }
        else
            setIsFloat(false)

    }


    function orderOptions(selectedOption) {
        const selectedValues = selectedOption.map(option => option.value);
        let selected = options.filter(item => selectedValues.includes(item.value))
        let unSelected = options.filter(item => !selectedValues.includes(item.value))
        setOptions([...selected, ...unSelected])
    }

    const style = {
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: "40px",
            overflow: "scroll !important"
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black',
            backgroundColor: state.isSelected ? '#D1BAA7' : 'white',
            '&:hover': {
                backgroundColor: state.isSelected ? '#b79c85' : '#e3d6ca',
            },

        })
    }



    return (
        <>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="publisher" className="opacity-70 text-sm mb-1">ناشر</label>
                    }
                    {(publisherValue?.length > 0) &&
                        <p className="ml-2 text-sm">{publisherValue.length} مورد</p>}
                </div>

                <Select hideSelectedOptions={false} options={options} styles={style} onChange={handleChange} placeholder={(floatAlways) ? "" : "ناشر"} isMulti={multi} defaultInputValue={(modalData.original) ? modalData.original.publisher.name : ""} />
            </div>
        </>
    )
}

export default PublishersInput
