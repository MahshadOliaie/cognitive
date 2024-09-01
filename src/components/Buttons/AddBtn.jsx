import { useState } from 'react'
import plus from '/plus.svg'


function AddBtn({ onClick }) {
    const [hover, setHover] = useState(false)
    return (
        <div className='relative'>
            <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:scale-105 duration-150 bg-dark" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img src={plus} alt="" />
            </div>
            {(hover) &&
                <div className='absolute bg-dark text-white p-2 left-full top-4 ml-2 w-max rounded-lg opacity-80'>افزودن کتاب</div>
            }
        </div>
    )
}

export default AddBtn