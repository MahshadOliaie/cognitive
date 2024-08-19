import { useState } from 'react'
import arrowDown from '/arrowUp.svg'
import FilterItems from './FilterItems'

function Filter({ title, totalData, filterTitle }) {
    const [isListOpen, setIsListOpen] = useState(false)

    let itemsArray = []

    function handleOpen() {
        setIsListOpen(true)
    }

    function handleClose() {
        setIsListOpen(false)
    }

    return (
        <div className='relative'>
            <div className='flex justify-between py-1.5 px-4 pl-2 shadow-sm rounded-xl bg-sand items-center cursor-pointer' style={{ border: "0.8px solid gray" }} onFocus={handleOpen} onBlur={handleClose} >
                <input type="text" name='filter' placeholder={title} className='focus-visible:outline-none  focus-visible:border-0 cursor-pointer w-32' />
                <img src={arrowDown} alt="" className='w-3' />
            </div>

            <div className='p-5 pr-3 bg-sand rounded-md shadow-md flex flex-col gap-3 absolute z-10 left-0 min-w-full max-h-52 overflow-scroll' style={(!isListOpen) ? { display: "none" } : {}}>
                {totalData.map((item, index) => {
                    if (!itemsArray.includes(item[filterTitle])) {
                        itemsArray.push(item[filterTitle])
                        return <FilterItems key={index} title={item[filterTitle]} filterTitle={filterTitle} />
                    }
                })}
            </div>
        </div>
    )
}

export default Filter