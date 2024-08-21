import { useEffect, useRef, useState } from 'react'
import arrowDown from '/arrowUp.svg'
import FilterItems from './FilterItems'

function Filter({ title, totalData, filterTitle ,filteredList , setFilteredList }) {
    const [filteredData, setFilteredData] = useState()
    const [isListOpen, setIsListOpen] = useState(false)

    const ref = useRef()


    let itemsArray = []
    useEffect(() => {
        document.addEventListener("click", () => {
            if (!ref.current?.contains(event.target)) {
                handleClose()
            }
        })

        return () => {
        }
    }, [])

    useEffect(() => {
      console.log(filteredList)

        return () => {
        }
    }, [filteredList])

    function handleOpen() {
        setIsListOpen(true)
    }

    function handleClose() {
        setIsListOpen(false)
    }

    function handleChange() {
        let value = event.target.value
        let newFilter = totalData?.filter(item => item[filterTitle].startsWith(value))
        setFilteredData(newFilter)
        itemsArray = []
    }


    return (
        <div className='relative' ref={ref} onClick={handleOpen}>
            <div className='flex justify-between py-1.5 px-4 pl-2 shadow-sm rounded-xl bg-sand items-center cursor-pointer' style={{ border: "0.8px solid gray" }}>
                <input type="text" name='filter' placeholder={title} className='focus-visible:outline-none  focus-visible:border-0 cursor-pointer w-32' onChange={handleChange} />
                <img src={arrowDown} alt="" className='w-3' />
            </div>

            <div className='p-5 pr-3 bg-sand rounded-md shadow-md flex flex-col gap-3 absolute z-10 left-0 min-w-full max-h-52 overflow-scroll' style={(!isListOpen) ? { display: "none" } : {}}>
                {((filteredData) ? filteredData : totalData)?.map((item, index) => {
                    if (!itemsArray.includes(item[filterTitle])) {
                        itemsArray.push(item[filterTitle])
                        return <FilterItems key={index} title={item[filterTitle]} filterTitle={filterTitle} filteredList={filteredList} setFilteredList={setFilteredList} />
                    }
                })}
            </div>
        </div>
    )
}

export default Filter