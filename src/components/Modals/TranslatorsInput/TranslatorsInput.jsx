import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Select from 'react-select'
let arr = []


function TranslatorsInput({ modalData, setTranslatorValue, floatAlways, translatorValue }) {
    const authors = useFetch('https://cogcenter.ir/library/api/v1/authors?page=0')
    const [options, setOptions] = useState([])
    const [isFloat, setIsFloat] = useState(false)



    useEffect(() => {
        (authors.content)?.map(author => {
            let optionsIds = options.map(item => item.value)
            if (!optionsIds.includes(author.id))
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
        setTranslatorValue(arr)
        if (selectedOption.length > 0) {
            setIsFloat(true)
        }
        else
            setIsFloat(false)
        orderOptions(selectedOption)
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
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="translators" className="opacity-70 text-sm mb-1">مترجمان</label>
                    }
                    {(translatorValue?.length > 0) &&
                        <p className="ml-2 text-sm">{translatorValue.length} مورد</p>
                    }
                </div>
                <Select hideSelectedOptions={false} styles={style} options={options} onChange={handleChange} placeholder={(floatAlways) ? "" : "مترجمان"} isMulti defaultValue={modalData.original?.translators.map(translator => { return { label: `${translator.firstName + " " + translator.lastName}`, value: translator.id } })} />
            </div>

        </>
    )
}
export default TranslatorsInput