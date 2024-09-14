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
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {(floatAlways || isFloat) &&
                        <label htmlFor="translators" className="opacity-70 text-sm mb-1">مترجمان</label>
                    }
                    {(translatorValue?.length > 0) &&
                        <p className="ml-2 text-sm">{translatorValue.length} مورد</p>
                    }
                </div>
                <Select styles={style} options={options} onChange={handleChange} placeholder={(floatAlways) ? "" : "مترجمان"} isMulti defaultValue={modalData.original?.translators.map(translator => { return { label: `${translator.firstName + " " + translator.lastName}`, value: translator.id } })} />
            </div>

        </>
    )
}
export default TranslatorsInput